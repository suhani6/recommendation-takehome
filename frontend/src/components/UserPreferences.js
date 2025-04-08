import React, { useState, useEffect } from 'react';

const UserPreferences = ({ preferences, products, onPreferencesChange }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

useEffect(() => {
  if (products.length > 0) {
    const cats = [...new Set(products.map((p) => p.category))];
    const brs = [...new Set(products.map((p) => p.brand))];
    setCategories(cats);
    setBrands(brs);
  }
}, [products]);


  const handleChange = (key, value) => {
    onPreferencesChange({ [key]: value });
  };

  return (
    <div className="preferences-form">
      <label className="form-label">
        Price Range:
        <input
          type="text"
          value={preferences.priceRange}
          onChange={(e) => handleChange('priceRange', e.target.value)}
          className="form-input"
          placeholder="e.g. 50-150"
        />
      </label>

      <label className="form-label">
        Categories:
        <select
          multiple
          value={preferences.categories}
          onChange={(e) =>
            handleChange(
              'categories',
              Array.from(e.target.selectedOptions).map((o) => o.value)
            )
          }
          className="form-select"
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <label className="form-label">
        Brands:
        <select
          multiple
          value={preferences.brands}
          onChange={(e) =>
            handleChange(
              'brands',
              Array.from(e.target.selectedOptions).map((o) => o.value)
            )
          }
          className="form-select"
        >
          {brands.map((brand, i) => (
            <option key={i} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default UserPreferences;