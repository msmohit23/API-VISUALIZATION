package com.example.apichallenge.service;

import com.example.apichallenge.model.User;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ProblemSolver {
    
    public List<List<Integer>> solveMutualFollowers(List<User> users) {
        List<List<Integer>> result = new ArrayList<>();
        Set<String> mutualPairs = new HashSet<>();

        for (User user : users) {
            for (Integer followId : user.getFollows()) {
                User otherUser = users.stream()
                    .filter(u -> u.getId() == followId)
                    .findFirst()
                    .orElse(null);

                if (otherUser != null && otherUser.getFollows().contains(user.getId())) {
                    int minId = Math.min(user.getId(), otherUser.getId());
                    int maxId = Math.max(user.getId(), otherUser.getId());
                    String pairKey = minId + "-" + maxId;

                    if (!mutualPairs.contains(pairKey)) {
                        result.add(Arrays.asList(minId, maxId));
                        mutualPairs.add(pairKey);
                    }
                }
            }
        }

        result.sort((a, b) -> a.get(0).compareTo(b.get(0)));
        return result;
    }

    public List<Integer> solveNthLevelFollowers(List<User> users, int startId, int n) {
        Map<Integer, List<Integer>> followsMap = new HashMap<>();
        users.forEach(user -> followsMap.put(user.getId(), user.getFollows()));

        Set<Integer> visited = new HashSet<>();
        visited.add(startId);

        List<Integer> currentLevel = new ArrayList<>();
        currentLevel.add(startId);

        for (int i = 0; i < n; i++) {
            List<Integer> nextLevel = new ArrayList<>();

            for (Integer userId : currentLevel) {
                List<Integer> follows = followsMap.getOrDefault(userId, new ArrayList<>());

                for (Integer followId : follows) {
                    if (!visited.contains(followId)) {
                        nextLevel.add(followId);
                        visited.add(followId);
                    }
                }
            }

            currentLevel = nextLevel;
        }

        Collections.sort(currentLevel);
        return currentLevel;
    }
}