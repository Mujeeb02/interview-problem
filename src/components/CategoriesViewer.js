import React, { useState } from 'react';
import data from './categories.json'; // Ensure the JSON file is in the src folder
import ExpandableList from './ExpandableList';
import { RenderProductsGrid } from './renderProductsGrid';
import SubcategoryList from './subCategoriesList';
import SearchResults from './SearchResults';

const CategoriesViewer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [clickedCategory, setClickedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setClickedCategory(null); // Reset clicked category when search term changes
  };

  const handleMouseEnter = (category) => {
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const handleClick = (category) => {
    setClickedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const searchInCategory = (category, term) => {
    if (category.name.toLowerCase().includes(term.toLowerCase())) {
      return true;
    }
    if (category.subcategories) {
      return category.subcategories.some(subcategory =>
        typeof subcategory === 'object'
          ? searchInCategory(subcategory, term)
          : subcategory.toLowerCase().includes(term.toLowerCase())
      );
    }
    return false;
  };

  const filteredCategories = data.filter(category => searchInCategory(category, searchTerm));

  const extractProducts = (category) => {
    let products = [];
    if (category.image) {
      products.push({ name: category.name, image: category.image, categoryType: category.name });
    }
    if (category.subcategories) {
      category.subcategories.forEach(subcategory => {
        products = products.concat(extractProducts(subcategory));
      });
    }
    return products;
  };

  const extractAllProducts = (categories) => {
    let allProducts = [];
    categories.forEach(category => {
      allProducts = allProducts.concat(extractProducts(category));
    });
    return allProducts;
  };

  const allProducts = extractAllProducts(data);
  const displayedProducts = clickedCategory && !clickedCategory.subcategories ? extractProducts(clickedCategory) : allProducts;
  const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);
  const paginatedProducts = displayedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderPagination = () => {
    return (
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 rounded-full ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (searchTerm) {
      return <SearchResults categories={filteredCategories} onCategoryClick={handleClick} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} hoveredCategory={hoveredCategory} />;
    }
    if (clickedCategory) {
      if (clickedCategory.subcategories && clickedCategory.subcategories.length > 0) {
        return (
          <div className='flex flex-col gap-y-4'>
            <h1 className='mt-4 ml-[45%] text-3xl font-bold text-black'>{clickedCategory.name}</h1>
            <SubcategoryList category={clickedCategory} onCategoryClick={handleClick} />
          </div>
        );
      } else {
        return (
          <>
            <h2 className="text-2xl font-bold mt-8 mb-4 ml-[45%]">{clickedCategory.name} Products</h2>
            {RenderProductsGrid(paginatedProducts)}
            {renderPagination()}
          </>
        );
      }
    } else {
      return (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4 ml-[45%]">All Products</h2>
          {RenderProductsGrid(paginatedProducts)}
          {renderPagination()}
        </>
      );
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 border border-gray-300 rounded-full mb-4"
      />
      <div className="flex gap-2">
        {!searchTerm && data.map((category, index) => (
          <div
            key={index}
            className="category-card border rounded-lg p-4 cursor-pointer hover:bg-gray-100"
            onMouseEnter={() => handleMouseEnter(category)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(category)}
          >
            <h2 className="text-xl font-bold mb-2">{category.name}</h2>
            <img src={category.image} alt={category.name} className="w-full h-48 object-cover mb-2 rounded" />
            {hoveredCategory === category && (
              <div className="subcategories-popup">
                {category.subcategories && category.subcategories.map((subcategory, subIndex) =>
                  typeof subcategory === 'object' ? (
                    <ExpandableList key={subIndex} category={subcategory} onCategoryClick={handleClick} />
                  ) : (
                    <div key={subIndex} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleClick({ name: subcategory, subcategories: [] })}>
                      <h3 className="font-medium">{subcategory}</h3>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default CategoriesViewer;
