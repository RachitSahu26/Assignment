import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../Styles/ProductDetail.css";
const ProductDetailPage = () => {
    const { id } = useParams(); // Get product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${id}.json`);
                setProduct(response.data.product);
                console.log(response.data.product);// Set the product data
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch product details.');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (<>

        <h1 className='bg-black text-white text-5xl text-center p-2'>Product Deatil</h1>
        <div className='product-detail-container'>
            <h1>{product.product_name}</h1>
            <img src={product.image_url} alt={product.product_name} style={{ width: '200px' }} />
            <h2>Ingredients:</h2>
            <p>{product.ingredients_text || 'No ingredients available'}</p>

            <h3>Nutritional Information:</h3>
            <ul>
                <li><span className='text-red-400'>Energy:</span> {product.nutriments.energy} kJ</li>
                <li><span className='text-red-400'>Fat:</span> {product.nutriments.fat} g</li>
                <li><span className='text-red-400'>Carbs:</span> {product.nutriments.carbohydrates} g</li>
                <li><span className='text-red-400'> Proteins:</span> {product.nutriments.proteins} g</li>
            </ul>

            <h3 className='text-green-300'>Labels:</h3>
            <p className='text-yellow-300'>{product.labels || 'No labels available'}</p>

            <button onClick={() => window.history.back()}>Go Back</button>
        </div>
    </>
    );
};

export default ProductDetailPage;
