import React from 'react';

const Catalog = ({ products, onProductClick, browsingHistory }) => {
  if (!products.length) return <p>No products available.</p>;

  return (
    <div className="catalog-grid">
      {products.map(product => (
        <div
          key={product.id}
          className={`product-card ${browsingHistory.includes(product.id) ? 'viewed' : ''}`}
          onClick={() => onProductClick(product.id)}
        >
          <h4>{product.name}</h4>
          <p>{product.brand}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Catalog;