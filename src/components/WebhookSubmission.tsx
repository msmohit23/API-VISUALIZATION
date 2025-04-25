import React from 'react';
import { Send, AlertCircle, CheckCircle, RotateCw } from 'lucide-react';
import type { ApiResponse } from '../types';

interface WebhookSubmissionProps {
  apiResponse: ApiResponse;
  solution: number[][] | number[];
  status: 'idle' | 'sending' | 'success' | 'error';
  retryCount: number;
  onSubmit: () => void;
}

export const WebhookSubmission: React.FC<WebhookSubmissionProps> = ({ 
  apiResponse, 
  solution, 
  status,
  retryCount,
  onSubmit 
}) => {
  const isMutualFollowers = apiResponse.problemType === 'mutual';
  
  const payload = {
    regNo: "REG12347",
    outcome: solution
  };
  
  const statusMessages = {
    idle: {
      title: "Ready to submit to webhook",
      description: "Send the solution to the provided webhook URL.",
      icon: <Send className="h-5 w-5 text-blue-500" />,
      color: "blue"
    },
    sending: {
      title: "Sending to webhook...",
      description: "Submitting your solution to the webhook.",
      icon: <RotateCw className="h-5 w-5 text-yellow-500 animate-spin" />,
      color: "yellow"
    },
    error: {
      title: `Webhook submission failed (Attempt ${retryCount}/4)`,
      description: "The server returned an error. Retry the submission.",
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      color: "red"
    },
    success: {
      title: "Webhook submission successful!",
      description: "Your solution was accepted by the server.",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      color: "green"
    }
  };
  
  const currentStatus = statusMessages[status];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Webhook Submission</h2>
      
      <div className="mb-4 text-sm text-gray-600">
        <p>Submit the solution to the webhook URL with JWT authentication.</p>
        <p className="mt-1">Target URL: {apiResponse.webhook}</p>
      </div>
      
      <div className="bg-gray-50 rounded-md p-4 mb-4 overflow-x-auto">
        <p className="text-xs text-gray-500 mb-2">Request Payload:</p>
        <pre className="text-xs text-gray-800">
          {JSON.stringify(payload, null, 2)}
        </pre>
      </div>
      
      <div className={`rounded-md p-4 mb-4 bg-${currentStatus.color}-50 border border-${currentStatus.color}-200`}>
        <div className="flex">
          <div className="flex-shrink-0">{currentStatus.icon}</div>
          <div className="ml-3">
            <h3 className={`text-sm font-medium text-${currentStatus.color}-800`}>
              {currentStatus.title}
            </h3>
            <div className={`mt-2 text-sm text-${currentStatus.color}-700`}>
              <p>{currentStatus.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      {(status === 'idle' || status === 'error') && (
        <button
          onClick={onSubmit}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            status === 'error' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {status === 'error' ? (
            <>
              <RotateCw size={18} className="mr-2" />
              Retry Submission
            </>
          ) : (
            <>
              <Send size={18} className="mr-2" />
              Submit Solution
            </>
          )}
        </button>
      )}
    </div>
  );
};