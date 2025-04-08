import React from 'react';

const Recommendations = ({ recommendations, isLoading }) => {
  if (isLoading) return <p>Loading recommendations...</p>;

  if (!recommendations || recommendations.length === 0) {
    return <p>No recommendations yet. Set preferences and browse some products!</p>;
  }

  return (
    <div>
      <ul>
        {recommendations.map((rec, i) => (
          <li key={i}>
            <strong>{rec.product.name}</strong> (${rec.product.price}) — {rec.product.brand}
            <p>{rec.explanation}</p>
            <small>Confidence: {rec.confidence_score}/10</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;