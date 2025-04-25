import React, { ReactNode } from 'react';
import { GraduationCap } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <GraduationCap size={28} className="text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">API Challenge Visualizer</h1>
            </div>
            <div className="text-sm text-gray-500">
              A visualization tool for API problem-solving
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-center text-gray-500">
            From - Mohit Saxena
          </p>
        </div>
      </footer>
    </div>
  );
};