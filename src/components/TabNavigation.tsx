import React from 'react';
import { Users, GitBranch } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <div className="mb-6">
      <div className="sm:hidden">
        <select
          value={activeTab}
          onChange={(e) => onTabChange(e.target.value)}
          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="mutual">Question 1: Mutual Followers</option>
          <option value="nthLevel">Question 2: Nth-Level Followers</option>
        </select>
      </div>
      
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => onTabChange('mutual')}
              className={`
                ${activeTab === 'mutual'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
              `}
            >
              <Users size={18} className="mr-2" />
              Mutual Followers
            </button>
            
            <button
              onClick={() => onTabChange('nthLevel')}
              className={`
                ${activeTab === 'nthLevel'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
              `}
            >
              <GitBranch size={18} className="mr-2" />
              Nth-Level Followers
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};