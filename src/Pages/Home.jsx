import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Use axios for API calls
import ProductCard from '../Components/ProductCard';
import "../Styles/Home.css";

const Home = () => {
    const [products, setProducts] = useState([]);  // State to store the fetched products
    const [filteredProducts, setFilteredProducts] = useState([]); // State to store the filtered products
    const [searchQuery, setSearchQuery] = useState('');  // State to store the search query
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);      // Error state for handling any issues

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://world.openfoodfacts.org/category/beverages.json'); // Sample category
                setProducts(response.data.products); // Set the product data
                setFilteredProducts(response.data.products); // Initialize filtered products
                setLoading(false); // Disable loading once data is fetched
            } catch (error) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };
        fetchProducts();  // Call the fetch function
    }, []);  // Empty dependency array to ensure it runs only once

    // Filter products based on search query
    useEffect(() => {
        if (searchQuery === '') {
            setFilteredProducts(products);
        } else {
            const results = products.filter(product =>
                product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(results);
        }
    }, [searchQuery, products]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    if (loading) return <div>Loading...</div>;  // Loading state
    if (error) return <div>{error}</div>;       // Error state

    return (
        <div>
            <h1>Food Products</h1>
            <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />
            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
};

export default Home;
