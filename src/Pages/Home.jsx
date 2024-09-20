// src/Pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../Components/ProductCard';
import "../Styles/Category.css";
import "../Styles/Home.css";
import Category from '../Components/Category';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode, faSearch } from '@fortawesome/free-solid-svg-icons';

const sampleCategory = 'beverages'; // Sample category to fetch category list

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [barcode, setBarcode] = useState('');  // New state for barcode search
  const [barcodeProduct, setBarcodeProduct] = useState(null); // State for barcode product

  // Fetch products from sample category and categories
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get(`https://world.openfoodfacts.org/category/${sampleCategory}.json`);
        setProducts(productResponse.data.products);
        setFilteredProducts(productResponse.data.products);

        // Extract unique categories from sample category
        const categoryList = Array.from(new Set(productResponse.data.products.flatMap(product => product.categories || [])));
        setCategories(categoryList);

        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle filter by category and search by name
  useEffect(() => {
    let results = products;

    // Filter by category
    if (selectedCategory) {
      results = results.filter(product =>
        product.categories && product.categories.includes(selectedCategory)
      );
    }

    // Search by name
    if (searchQuery) {
      results = results.filter(product =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(results);
  }, [selectedCategory, searchQuery, products]);

  // Function to handle barcode search
  const handleBarcodeSearch = async () => {
    if (barcode) {
      setLoading(true);  // Show loading indicator
      setError(null);    // Reset error state
      try {
        const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
        if (response.data.status === 1) {  // Check if product is found
          setBarcodeProduct(response.data.product);
        } else {
          setError('Product not found');
          setBarcodeProduct(null);  // Clear previous barcode product if not found
        }
      } catch (error) {
        setError('Failed to fetch product');
        setBarcodeProduct(null);  // Clear barcode product on error
      } finally {
        setLoading(false);  // Stop loading once done
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='home-continer'>
      <h1>Food Products</h1>

      {/* Filter and Search Section */}
      <div className="filter-section w-full h-16 items-center flex  gap-4 mx-auto p-10 text-xl">
  
  {/* 1. Category Filter */}
  <div className=" w-60  ">
    <Category
      categories={categories}
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
    />
  </div>

  {/* 2. Search by Name */}
  <div className="w-full items-center flex">
    <div className="relative w-full">
      <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-500" />
      <input
        type="text"
        className="w-full placeholder-gray-400 text-gray-900 p-4 pl-10 border-2 rounded-lg"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    <button className="bg-white p-1 ml-2 border-2 rounded-lg">🔍</button>
  </div>

  {/* 3. Search by Barcode */}
  <div className="w-full flex">
    <div className="relative w-full">
      <FontAwesomeIcon icon={faBarcode} className="absolute left-3 top-3 text-gray-500" />
      <input
        type="text"
        className="w-full placeholder-gray-400 text-gray-900 p-4 pl-10 border-2 rounded-lg"
        placeholder="Search by Barcode"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
    </div>
    <button className="bg-white p-4 ml-2 border-2 rounded-lg">Search</button>
  </div>

</div>

      {/* Display Barcode Product if Available */}
      {barcodeProduct ? (
        <div className="barcode-product">
          <h2>Product by Barcode: {barcodeProduct.product_name}</h2>
          <img src={barcodeProduct.image_url} alt={barcodeProduct.product_name} />
          <p>Category: {barcodeProduct.categories}</p>
          <p>Ingredients: {barcodeProduct.ingredients_text || 'N/A'}</p>
          <p>Nutrition Grade: {barcodeProduct.nutrition_grades}</p>
        </div>
      ) : (
        /* Display Filtered Products if No Barcode Search */
        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
