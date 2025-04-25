// Example data for the mutual followers problem
export const mutualFollowersData = [
  { id: 1, name: "Alice", follows: [2, 3] },
  { id: 2, name: "Bob", follows: [1] },
  { id: 3, name: "Charlie", follows: [4] },
  { id: 4, name: "David", follows: [3] }
];

// Example data for the nth level followers problem
export const nthLevelFollowersData = [
  { id: 1, name: "Alice", follows: [2, 3] },
  { id: 2, name: "Bob", follows: [4] },
  { id: 3, name: "Charlie", follows: [4, 5] },
  { id: 4, name: "David", follows: [6] },
  { id: 5, name: "Eva", follows: [6] },
  { id: 6, name: "Frank", follows: [] }
];