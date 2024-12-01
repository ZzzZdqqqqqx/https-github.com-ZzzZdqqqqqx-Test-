import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GraphView from './components/GraphView';
import Statistics from './components/Statistics';
import { parseOntology } from './utils/ontologyParser';
import ontologyData from './data/ontology';

function App() {
  const ontology = parseOntology(ontologyData);

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Graph View</Link>
          <Link to="/stats">Statistics</Link>
        </nav>

        <Routes>
          <Route path="/" element={<GraphView ontology={ontology} />} />
          <Route path="/stats" element={<Statistics ontology={ontology} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
