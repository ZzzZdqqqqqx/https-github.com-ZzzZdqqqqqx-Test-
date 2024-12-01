import React from 'react';

function Statistics({ ontology }) {
  const stats = {
    totalClasses: ontology.nodes.filter(n => n.group === 'class').length,
    totalProperties: ontology.nodes.filter(n => n.group === 'property').length,
    totalIndividuals: ontology.nodes.filter(n => n.group === 'individual').length,
    totalRelationships: ontology.edges.length
  };

  return (
    <div className="stats-container">
      <h2>Ontology Statistics</h2>
      
      <div className="stats-card">
        <h3>Classes</h3>
        <p>Total Classes: {stats.totalClasses}</p>
      </div>

      <div className="stats-card">
        <h3>Properties</h3>
        <p>Total Properties: {stats.totalProperties}</p>
      </div>

      <div className="stats-card">
        <h3>Individuals</h3>
        <p>Total Individuals: {stats.totalIndividuals}</p>
      </div>

      <div className="stats-card">
        <h3>Relationships</h3>
        <p>Total Relationships: {stats.totalRelationships}</p>
      </div>
    </div>
  );
}

export default Statistics;
