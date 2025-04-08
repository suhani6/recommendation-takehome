import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Catalog from './components/Catalog';
import UserPreferences from './components/UserPreferences';
import Recommendations from './components/Recommendations';
import BrowsingHistory from './components/BrowsingHistory';
import { fetchProducts, getRecommendations } from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [userPreferences, setUserPreferences] = useState({
    priceRange: 'all',
    categories: [],
    brands: []
  });
  const [browsingHistory, setBrowsingHistory] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProductLoading, setIsProductLoading] = useState(true); // new

  // Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        console.log('Fetched products:', data); // debug line
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsProductLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleProductClick = (productId) => {
    if (!browsingHistory.includes(productId)) {
      setBrowsingHistory([...browsingHistory, productId]);
    }
  };

  const handlePreferencesChange = (newPreferences) => {
    setUserPreferences(prevPreferences => ({
      ...prevPreferences,
      ...newPreferences
    }));
  };

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    try {
      const data = await getRecommendations(userPreferences, browsingHistory);
      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setBrowsingHistory([]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI-Powered Product Recommendation Engine</h1>
      </header>

      <main className="app-content">
        <div className="user-section">
          <UserPreferences
            preferences={userPreferences}
            products={products}
            onPreferencesChange={handlePreferencesChange}
            isDisabled={isProductLoading} // optional
          />

          <BrowsingHistory
            history={browsingHistory}
            products={products}
            onClearHistory={handleClearHistory}
          />

          <button
            className="get-recommendations-btn"
            onClick={handleGetRecommendations}
            disabled={isLoading || isProductLoading}
          >
            {isLoading ? 'Getting Recommendations...' : 'Get Personalized Recommendations'}
          </button>
        </div>

        <div className="catalog-section">
          <h2>Product Catalog</h2>
          <Catalog
            products={products}
            onProductClick={handleProductClick}
            browsingHistory={browsingHistory}
          />
        </div>

        <div className="recommendations-section">
          <h2>Your Recommendations</h2>
          <Recommendations
            recommendations={recommendations}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;