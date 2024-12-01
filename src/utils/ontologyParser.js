import { Parser } from 'n3';

export function parseOntology(ttlContent) {
  const parser = new Parser();
  const nodes = new Set();
  const edges = [];
  const nodeMap = new Map();

  let nodeId = 1;

  parser.parse(ttlContent, (error, quad, prefixes) => {
    if (error) {
      console.error(error);
      return;
    }
    
    if (!quad) return;

    const subject = quad.subject.value;
    const predicate = quad.predicate.value;
    const object = quad.object.value;

    // Add nodes
    if (!nodeMap.has(subject)) {
      nodeMap.set(subject, nodeId++);
      nodes.add({
        id: nodeMap.get(subject),
        label: subject.split('#').pop(),
        group: getNodeGroup(predicate)
      });
    }

    if (!nodeMap.has(object) && !quad.object.termType === 'Literal') {
      nodeMap.set(object, nodeId++);
      nodes.add({
        id: nodeMap.get(object),
        label: object.split('#').pop(),
        group: getNodeGroup(predicate)
      });
    }

    // Add edges
    if (quad.object.termType !== 'Literal') {
      edges.push({
        from: nodeMap.get(subject),
        to: nodeMap.get(object),
        label: predicate.split('#').pop()
      });
    }
  });

  return {
    nodes: Array.from(nodes),
    edges
  };
}

function getNodeGroup(predicate) {
  if (predicate.includes('type')) return 'class';
  if (predicate.includes('Property')) return 'property';
  return 'individual';
}
