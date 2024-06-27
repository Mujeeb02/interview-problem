import React from 'react';

export const RenderProductsGrid = (products) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product, index) => (
        <div key={index} className="product-card border rounded-lg p-4">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2 rounded" />
          <h3 className="text-lg font-medium">{product.name}</h3>
        </div>
      ))}
    </div>
  );
};
