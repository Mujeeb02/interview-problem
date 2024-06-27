import React from 'react';
import ExpandableList from './ExpandableList';

const SearchResults = ({ categories, onCategoryClick, handleMouseEnter, handleMouseLeave, hoveredCategory }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {categories.map((category, index) => (
        <div
          key={index}
          className="category-card border rounded-lg p-4 cursor-pointer hover:bg-gray-100"
          onMouseEnter={() => handleMouseEnter(category)}
          onMouseLeave={handleMouseLeave}
          onClick={() => onCategoryClick(category)}
        >
          <h2 className="text-xl font-bold mb-2">{category.name}</h2>
          
          <img src={category.image} alt={category.name} className="w-full h-48 object-cover mb-2 rounded" />
          {hoveredCategory === category && (
            <div className="subcategories-popup">
              {category.subcategories && category.subcategories.map((subcategory, subIndex) =>
                typeof subcategory === 'object' ? (
                  <ExpandableList key={subIndex} category={subcategory} onCategoryClick={onCategoryClick} />
                ) : (
                  <div key={subIndex} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => onCategoryClick({ name: subcategory, subcategories: [] })}>
                    <h3 className="font-medium">{subcategory}</h3>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
