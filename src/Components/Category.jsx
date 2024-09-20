// src/Components/CategoryFilter.js
import React from 'react';
import "../Styles/Category.css"
const Category = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="filter-container w-full    flex   items-center p-1 rounded-md">
    {/* Label for Category Filter */}
    <label htmlFor="category-filter" className="category-filter-label text-[1rem] text-black font-semibold mb-2 block">
      Filter by Category:
    </label>
  
    {/* Select Dropdown for Category Filter */}
    <select
      id="category-filter"
      className="category-filter-select text-[1rem] w-full p-2 border border-red-300 rounded-md"
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      {/* Default Option for All Categories */}
      <option value="">All Categories</option>
  
      {/* Dynamically Rendered Category Options */}
      {categories.map((category, index) => (
        <option className="p-2" key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>
  
  );
};

export default Category;
