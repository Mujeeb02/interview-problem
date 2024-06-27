import React from 'react';

const SubcategoryList = ({ category, onCategoryClick }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {category.subcategories && category.subcategories.map((subcategory, index) =>
        typeof subcategory === 'object' ? (
          <div
            key={index}
            className="subcategory-card border rounded-lg p-4 cursor-pointer hover:bg-gray-100"
            onClick={() => onCategoryClick(subcategory)}
          >
            <img src={subcategory.image} alt={subcategory.name} className="w-full h-40 object-cover mb-2 rounded" />
            <h3 className="text-lg font-medium">{subcategory.name}</h3>
          </div>
        ) : (
          <div key={index} className="subcategory-card border rounded-lg p-4">
            <h3 className="font-medium">{subcategory}</h3>
          </div>
        )
      )}
    </div>
  );
};

export default SubcategoryList;
