import React, { useState } from 'react';
import { ApiRequest } from './ApiRequest';
import { ProblemSolver } from './ProblemSolver';
import { WebhookSubmission } from './WebhookSubmission';
import { NetworkGraph } from './NetworkGraph';
import { TabNavigation } from './TabNavigation';
import { mutualFollowersData, nthLevelFollowersData } from '../data/exampleData';
import type { User, ApiResponse, ProblemType } from '../types';

export const ApiChallenge: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mutual' | 'nthLevel'>('mutual');
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [solution, setSolution] = useState<number[][] | number[] | null>(null);
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [retryCount, setRetryCount] = useState(0);

  // Simulate API request
  const handleApiRequest = (name: string, regNo: string, email: string) => {
    // Simulate loading
    setTimeout(() => {
      const isMutualFollowers = regNo.endsWith('7') || regNo.endsWith('9') || 
                               regNo.endsWith('1') || regNo.endsWith('3') || regNo.endsWith('5');
      
      const responseData: ApiResponse = {
        webhook: "https://bfhldevapigw.healthrx.co.in/hiring/testWebhook",
        accessToken: "asjdh89d7897asd89asdaskjdlasd8sa",
        data: isMutualFollowers 
          ? { users: mutualFollowersData } 
          : { 
              users: {
                n: 2,
                findId: 1,
                users: nthLevelFollowersData
              }
            },
        problemType: isMutualFollowers ? 'mutual' : 'nthLevel'
      };
      
      setApiResponse(responseData);
      setActiveTab(isMutualFollowers ? 'mutual' : 'nthLevel');
      setSolution(null);
      setWebhookStatus('idle');
      setRetryCount(0);
    }, 1000);
  };

  // Handle problem solving
  const handleSolveProblem = () => {
    if (!apiResponse) return;
    
    let result;
    if (apiResponse.problemType === 'mutual') {
      const users = apiResponse.data.users as User[];
      result = findMutualFollowers(users);
    } else {
      const { n, findId, users } = apiResponse.data.users as { n: number, findId: number, users: User[] };
      result = findNthLevelFollowers(users, findId, n);
    }
    
    setSolution(result);
  };

  // Handle webhook submission
  const handleSubmitWebhook = () => {
    if (!apiResponse || !solution) return;
    
    setWebhookStatus('sending');
    setRetryCount(prev => prev + 1);
    
    // Simulate webhook submission with potential failures for first 3 attempts
    setTimeout(() => {
      if (retryCount < 3) {
        setWebhookStatus('error');
      } else {
        setWebhookStatus('success');
      }
    }, 1500);
  };

  // Find mutual followers
  const findMutualFollowers = (users: User[]): number[][] => {
    const result: number[][] = [];
    const mutualPairs = new Set<string>();

    for (const user of users) {
      for (const followId of user.follows) {
        const otherUser = users.find(u => u.id === followId);
        if (otherUser && otherUser.follows.includes(user.id)) {
          const minId = Math.min(user.id, otherUser.id);
          const maxId = Math.max(user.id, otherUser.id);
          const pairKey = `${minId}-${maxId}`;
          
          if (!mutualPairs.has(pairKey)) {
            result.push([minId, maxId]);
            mutualPairs.add(pairKey);
          }
        }
      }
    }

    return result.sort((a, b) => a[0] - b[0]);
  };

  // Find nth level followers
  const findNthLevelFollowers = (users: User[], startId: number, level: number): number[] => {
    // Map of user IDs to their follows
    const followsMap = new Map<number, number[]>();
    users.forEach(user => followsMap.set(user.id, user.follows));
    
    // Track visited nodes to avoid cycles
    const visited = new Set<number>([startId]);
    
    // Current level's user IDs
    let currentLevel = [startId];
    
    // Loop through each level
    for (let i = 0; i < level; i++) {
      const nextLevel: number[] = [];
      
      // For each user in the current level
      for (const userId of currentLevel) {
        // Get their follows
        const follows = followsMap.get(userId) || [];
        
        // Add non-visited follows to the next level
        for (const followId of follows) {
          if (!visited.has(followId)) {
            nextLevel.push(followId);
            visited.add(followId);
          }
        }
      }
      
      // Update current level for next iteration
      currentLevel = nextLevel;
    }
    
    // Return sorted nth level follows
    return currentLevel.sort((a, b) => a - b);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ApiRequest onSubmit={handleApiRequest} />
          
          {apiResponse && (
            <>
              <ProblemSolver 
                apiResponse={apiResponse} 
                onSolve={handleSolveProblem}
                solution={solution}
              />
              
              {solution && (
                <WebhookSubmission 
                  apiResponse={apiResponse}
                  solution={solution}
                  status={webhookStatus}
                  retryCount={retryCount}
                  onSubmit={handleSubmitWebhook}
                />
              )}
            </>
          )}
        </div>
        
        <div className="lg:col-span-2">
          {apiResponse && (
            <>
              <TabNavigation 
                activeTab={activeTab} 
                onTabChange={(tab) => setActiveTab(tab as 'mutual' | 'nthLevel')} 
              />
              
              <NetworkGraph 
                data={apiResponse.data}
                problemType={apiResponse.problemType as ProblemType}
                solution={solution}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};