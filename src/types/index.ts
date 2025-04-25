export interface User {
  id: number;
  name: string;
  follows: number[];
}

export type ProblemType = 'mutual' | 'nthLevel';

export interface ApiResponse {
  webhook: string;
  accessToken: string;
  data: {
    users: User[] | {
      n: number;
      findId: number;
      users: User[];
    };
  };
  problemType?: ProblemType;
}