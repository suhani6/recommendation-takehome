import React from 'react';

const BrowsingHistory = ({ history, products, onClearHistory }) => {
  const viewedProducts = products.filter(p => history.includes(p.id));

  return (
    <div>
      <h3>Your Browsing History</h3>
      {viewedProducts.length === 0 ? (
        <p>No products viewed yet.</p>
      ) : (
        <>
          <ul>
            {viewedProducts.map(p => (
              <li key={p.id}>{p.name} (${p.price})</li>
            ))}
          </ul>
          <button onClick={onClearHistory}>Clear History</button>
        </>
      )}
    </div>
  );
};

export default BrowsingHistory;