package com.example.apichallenge.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;

@Data
public class ApiResponse {
    private String webhook;
    private String accessToken;
    private ResponseData data;

    @Data
    public static class ResponseData {
        @JsonProperty("users")
        private Object users; // Can be List<User> or NthLevelData
    }

    @Data
    public static class NthLevelData {
        private int n;
        private int findId;
        private List<User> users;
    }
}