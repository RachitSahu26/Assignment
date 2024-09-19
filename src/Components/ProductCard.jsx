import React from 'react';
import "../Styles/Home.css"
import { Link } from 'react-router-dom';
const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.code}`}>
      <div className="product-card border-2 border-red-500">
        <img
          src={product.image_url || 'https://via.placeholder.com/150'}
          alt={product.product_name}
          style={{ width: '150px', height: '150px' }}
        />
        <h3>{product.product_name}</h3>


        <p>
          <span className='text-red-500'>Category:</span>   {product.categories.slice(0, 30)}${product.categories.length > 30 ? '...' : ''}

        </p>






        <p> <span className='text-red-500'>Nutrition Grade:</span> {product.nutrition_grades || 'N/A'}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
