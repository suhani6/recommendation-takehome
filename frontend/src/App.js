import React, { useState, useEffect, useContext } from 'react';
import './styles/App.css';
import Catalog from './components/Catalog';
import UserPreferences from './components/UserPreferences';
import Recommendations from './components/Recommendations';
import BrowsingHistory from './components/BrowsingHistory';
import { fetchProducts, getRecommendations } from './services/api';
import { AuthContext } from './context/authcontext';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const { token } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [userPreferences, setUserPreferences] = useState({
    priceRange: 'all',
    categories: [],
    brands: []
  });
  const [browsingHistory, setBrowsingHistory] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProductLoading, setIsProductLoading] = useState(true);


  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        console.log('Fetched products:', data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsProductLoading(false);
      }
    };

    loadProducts();
  }, []);

  const [showRegister, setShowRegister] = useState(false);

  if (!token) {
    return (
      <>
        {showRegister ? <Register /> : <Login />}
        <p style={{ textAlign: 'center' }}>
          {showRegister ? (
            <>
              Already have an account?{" "}
              <button onClick={() => setShowRegister(false)}>Login here</button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button onClick={() => setShowRegister(true)}>Register</button>
            </>
          )}
        </p>
      </>
    );
  }

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
            isDisabled={isProductLoading}
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