import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ApiRequestProps {
  onSubmit: (name: string, regNo: string, email: string) => void;
}

export const ApiRequest: React.FC<ApiRequestProps> = ({ onSubmit }) => {
  const [name, setName] = useState('John Doe');
  const [regNo, setRegNo] = useState('REG12347');
  const [email, setEmail] = useState('john@example.com');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      onSubmit(name, regNo, email);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">API Request</h2>
      
      <div className="mb-4 text-sm text-gray-600">
        <p>This form simulates a POST request to the generateWebhook endpoint.</p>
        <p className="mt-1">The registration number determines the problem type:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>Odd last digit: Mutual Followers (Question 1)</li>
          <li>Even last digit: Nth-Level Followers (Question 2)</li>
        </ul>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
            required
          />
        </div>
        
        <div>
          <label htmlFor="regNo" className="block text-sm font-medium text-gray-700">
            Registration Number
          </label>
          <input
            type="text"
            id="regNo"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          <Send size={18} className="mr-2" />
          {isLoading ? 'Sending...' : 'Send Request'}
        </button>
      </form>
    </div>
  );
};