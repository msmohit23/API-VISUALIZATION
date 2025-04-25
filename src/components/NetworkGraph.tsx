import React, { useEffect, useState } from 'react';
import type { User, ProblemType } from '../types';

interface NetworkGraphProps {
  data: any;
  problemType: ProblemType;
  solution: number[][] | number[] | null;
}

interface Node {
  id: number;
  name: string;
  x: number;
  y: number;
  level?: number;
  highlighted?: boolean;
}

interface Edge {
  source: number;
  target: number;
  mutual?: boolean;
  highlighted?: boolean;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({ data, problemType, solution }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  
  useEffect(() => {
    if (problemType === 'mutual') {
      // Handle mutual followers problem
      const users = data.users as User[];
      
      // Create nodes in a circle layout
      const nodeCount = users.length;
      const radius = 150;
      const centerX = 250;
      const centerY = 200;
      
      const graphNodes = users.map((user, idx) => {
        const angle = (idx / nodeCount) * 2 * Math.PI;
        return {
          id: user.id,
          name: user.name,
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
          highlighted: false
        };
      });
      
      // Create edges
      const graphEdges: Edge[] = [];
      users.forEach(user => {
        user.follows.forEach(followId => {
          // Check if this is a mutual follow
          const mutual = users.find(u => u.id === followId)?.follows.includes(user.id) || false;
          
          graphEdges.push({
            source: user.id,
            target: followId,
            mutual: mutual,
            highlighted: false
          });
        });
      });
      
      setNodes(graphNodes);
      setEdges(graphEdges);
      
    } else if (problemType === 'nthLevel') {
      // Handle nth level followers problem
      const { n, findId, users } = data.users as { n: number, findId: number, users: User[] };
      
      // Create a mapping to track levels from the start node
      const levelMap = new Map<number, number>();
      const visited = new Set<number>();
      
      // BFS to determine levels
      const queue: [number, number][] = [[findId, 0]]; // [userId, level]
      visited.add(findId);
      levelMap.set(findId, 0);
      
      while (queue.length > 0) {
        const [userId, level] = queue.shift()!;
        
        const user = users.find(u => u.id === userId);
        if (!user) continue;
        
        for (const followId of user.follows) {
          if (!visited.has(followId)) {
            visited.add(followId);
            levelMap.set(followId, level + 1);
            queue.push([followId, level + 1]);
          }
        }
      }
      
      // Create nodes with level-based layout
      const graphNodes: Node[] = [];
      const levelGroups = new Map<number, number[]>();
      
      // Group nodes by level
      users.forEach(user => {
        const level = levelMap.get(user.id) ?? -1;
        if (!levelGroups.has(level)) {
          levelGroups.set(level, []);
        }
        levelGroups.get(level)?.push(user.id);
      });
      
      // Position nodes by level
      const levelHeight = 100;
      const maxNodePerLevel = Math.max(...Array.from(levelGroups.values()).map(g => g.length));
      const levelWidth = 500;
      
      levelGroups.forEach((userIds, level) => {
        const nodeCount = userIds.length;
        userIds.forEach((userId, idx) => {
          const user = users.find(u => u.id === userId)!;
          const x = 50 + (levelWidth * idx) / Math.max(1, nodeCount - 1);
          const y = 50 + level * levelHeight;
          
          graphNodes.push({
            id: user.id,
            name: user.name,
            x: x,
            y: y,
            level: level,
            highlighted: level === n // Highlight nodes at the nth level
          });
        });
      });
      
      // Create edges
      const graphEdges: Edge[] = [];
      users.forEach(user => {
        user.follows.forEach(followId => {
          // Check if this edge crosses from level L to level L+1
          const sourceLevel = levelMap.get(user.id) ?? -1;
          const targetLevel = levelMap.get(followId) ?? -1;
          
          graphEdges.push({
            source: user.id,
            target: followId,
            highlighted: sourceLevel !== -1 && targetLevel !== -1 && targetLevel === sourceLevel + 1
          });
        });
      });
      
      setNodes(graphNodes);
      setEdges(graphEdges);
    }
  }, [data, problemType]);
  
  // Update highlighting based on solution
  useEffect(() => {
    if (!solution) return;
    
    if (problemType === 'mutual') {
      // Highlight mutual follow pairs
      const mutualPairs = solution as number[][];
      const pairSet = new Set(mutualPairs.map(pair => `${pair[0]}-${pair[1]}`));
      
      setEdges(prev => prev.map(edge => {
        const minId = Math.min(edge.source, edge.target);
        const maxId = Math.max(edge.source, edge.target);
        const isPairHighlighted = pairSet.has(`${minId}-${maxId}`);
        
        return {
          ...edge,
          highlighted: isPairHighlighted && edge.mutual
        };
      }));
      
    } else if (problemType === 'nthLevel') {
      // Highlight nth level nodes
      const nthLevelIds = solution as number[];
      const idSet = new Set(nthLevelIds);
      
      setNodes(prev => prev.map(node => ({
        ...node,
        highlighted: idSet.has(node.id)
      })));
    }
  }, [solution, problemType]);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Network Visualization</h2>
      
      <div className="border rounded-lg overflow-hidden">
        <svg width="100%" height="400" viewBox="0 0 500 400">
          {/* Edges */}
          {edges.map((edge, idx) => {
            const source = nodes.find(node => node.id === edge.source);
            const target = nodes.find(node => node.id === edge.target);
            
            if (!source || !target) return null;
            
            return (
              <g key={`edge-${idx}`}>
                <line
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={edge.highlighted ? '#3b82f6' : '#e5e7eb'}
                  strokeWidth={edge.highlighted ? 2 : 1}
                  markerEnd="url(#arrowhead)"
                  className={`transition-all duration-500 ${
                    edge.highlighted ? 'opacity-100' : 'opacity-70'
                  }`}
                />
                {/* Add direction marker */}
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill={edge.highlighted ? '#3b82f6' : '#9ca3af'}
                  />
                </marker>
              </g>
            );
          })}
          
          {/* Nodes */}
          {nodes.map(node => (
            <g
              key={`node-${node.id}`}
              transform={`translate(${node.x}, ${node.y})`}
              className="transition-all duration-500"
            >
              <circle
                r={node.highlighted ? 24 : 20}
                fill={node.highlighted ? '#3b82f6' : '#f3f4f6'}
                stroke={node.highlighted ? '#2563eb' : '#d1d5db'}
                strokeWidth="2"
                className="transition-all duration-300"
              />
              <text
                textAnchor="middle"
                dy=".3em"
                fontSize="12"
                fontWeight={node.highlighted ? 'bold' : 'normal'}
                fill={node.highlighted ? 'white' : '#374151'}
                className="transition-all duration-300"
              >
                {node.id}
              </text>
              <text
                textAnchor="middle"
                dy="2em"
                fontSize="10"
                fill="#6b7280"
              >
                {node.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        {problemType === 'mutual' ? (
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-200 border border-gray-300 mr-2"></div>
              <span>User Node</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-0.5 bg-gray-200 mr-2"></div>
              <span>Follows</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-0.5 bg-blue-500 mr-2"></div>
              <span>Mutual Follow</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-200 border border-gray-300 mr-2"></div>
              <span>User Node</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 border border-blue-600 mr-2"></div>
              <span>Nth Level Node</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-0.5 bg-blue-500 mr-2"></div>
              <span>Path to Nth Level</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};