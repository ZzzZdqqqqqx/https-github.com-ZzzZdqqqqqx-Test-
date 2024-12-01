import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';

function GraphView({ ontology }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const nodes = new vis.DataSet(ontology.nodes);
    const edges = new vis.DataSet(ontology.edges);

    const options = {
      nodes: {
        shape: 'box',
        font: {
          size: 12,
        },
        borderWidth: 2,
        shadow: true
      },
      edges: {
        arrows: 'to',
        smooth: {
          type: 'cubicBezier'
        }
      },
      physics: {
        stabilization: true,
        barnesHut: {
          gravitationalConstant: -80000,
          springConstant: 0.001,
          springLength: 200
        }
      }
    };

    const network = new Network(containerRef.current, { nodes, edges }, options);

    return () => {
      network.destroy();
    };
  }, [ontology]);

  return <div ref={containerRef} className="network-container" />;
}

export default GraphView;
