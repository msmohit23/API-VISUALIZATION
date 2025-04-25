import React from 'react';
import { Calculator, Check } from 'lucide-react';
import type { ApiResponse } from '../types';

interface ProblemSolverProps {
  apiResponse: ApiResponse;
  solution: number[][] | number[] | null;
  onSolve: () => void;
}

export const ProblemSolver: React.FC<ProblemSolverProps> = ({ 
  apiResponse, 
  solution,
  onSolve 
}) => {
  const isMutualFollowers = apiResponse.problemType === 'mutual';
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        {isMutualFollowers ? 'Question 1: Mutual Followers' : 'Question 2: Nth-Level Followers'}
      </h2>
      
      <div className="mb-4 text-sm text-gray-600">
        {isMutualFollowers ? (
          <p>
            Identify mutual follow pairs where both users follow each other. 
            Output only direct 2-node cycles as [min, max] once.
          </p>
        ) : (
          <p>
            Given a start ID (findId) and nth level, return user IDs that are 
            exactly n levels away in the "follows" list.
          </p>
        )}
      </div>
      
      <div className="bg-gray-50 rounded-md p-4 mb-4 overflow-x-auto">
        <pre className="text-xs text-gray-800">
          {JSON.stringify(apiResponse.data, null, 2)}
        </pre>
      </div>
      
      {solution ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
          <div className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-800">Solution</h3>
              <pre className="mt-2 text-sm text-green-700 overflow-x-auto">
                {JSON.stringify(solution, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={onSolve}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Calculator size={18} className="mr-2" />
          Solve Problem
        </button>
      )}
    </div>
  );
};