package com.example.apichallenge.service;

import com.example.apichallenge.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import javax.annotation.PostConstruct;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ApiService {
    private final RestTemplate restTemplate;
    private final ProblemSolver problemSolver;
    private final ObjectMapper objectMapper;

    private static final String API_URL = "https://bfhldevapigw.healthrx.co.in/hiring/generateWebhook";

    @PostConstruct
    public void init() {
        processApiChallenge();
    }

    public void processApiChallenge() {
        try {
            log.info("Starting API challenge processing");
            
            // Step 1: Make initial API request
            ApiResponse apiResponse = makeInitialRequest();
            log.info("Received API response. Webhook URL: {}", apiResponse.getWebhook());

            // Step 2: Solve the problem
            Object solution = solveChallenge(apiResponse);
            log.info("Successfully generated solution: {}", solution);

            // Step 3: Submit to webhook
            submitToWebhook(apiResponse, solution);
        } catch (Exception e) {
            log.error("Critical error during API challenge processing", e);
            throw new RuntimeException("Failed to process API challenge", e);
        }
    }

    private ApiResponse makeInitialRequest() {
        try {
            log.debug("Preparing initial API request");
            ApiRequest request = new ApiRequest();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<ApiRequest> entity = new HttpEntity<>(request, headers);
            ResponseEntity<ApiResponse> response = restTemplate.exchange(
                API_URL,
                HttpMethod.POST,
                entity,
                ApiResponse.class
            );

            if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                throw new RuntimeException("Failed to get valid response from initial API request");
            }

            return response.getBody();
        } catch (Exception e) {
            log.error("Error making initial API request", e);
            throw new RuntimeException("Failed to make initial API request", e);
        }
    }

    private Object solveChallenge(ApiResponse apiResponse) throws Exception {
        try {
            if (apiResponse.getData() == null || apiResponse.getData().getUsers() == null) {
                throw new RuntimeException("Invalid API response data");
            }

            if (apiResponse.getData().getUsers() instanceof List) {
                log.info("Processing Mutual Followers problem");
                List<User> users = objectMapper.convertValue(
                    apiResponse.getData().getUsers(),
                    objectMapper.getTypeFactory().constructCollectionType(List.class, User.class)
                );
                return problemSolver.solveMutualFollowers(users);
            } else {
                log.info("Processing Nth Level Followers problem");
                ApiResponse.NthLevelData nthLevelData = objectMapper.convertValue(
                    apiResponse.getData().getUsers(),
                    ApiResponse.NthLevelData.class
                );
                return problemSolver.solveNthLevelFollowers(
                    nthLevelData.getUsers(),
                    nthLevelData.getFindId(),
                    nthLevelData.getN()
                );
            }
        } catch (Exception e) {
            log.error("Error solving challenge", e);
            throw new RuntimeException("Failed to solve challenge", e);
        }
    }

    @Retryable(
        value = {RuntimeException.class},
        maxAttempts = 4,
        backoff = @Backoff(delay = 1000)
    )
    private void submitToWebhook(ApiResponse apiResponse, Object solution) {
        try {
            log.info("Attempting webhook submission (Attempt {})", getRetryCount());
            
            WebhookRequest webhookRequest = new WebhookRequest("REG12347", solution);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", apiResponse.getAccessToken());

            HttpEntity<WebhookRequest> entity = new HttpEntity<>(webhookRequest, headers);
            ResponseEntity<String> response = restTemplate.exchange(
                apiResponse.getWebhook(),
                HttpMethod.POST,
                entity,
                String.class
            );

            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Webhook submission failed with status: " + response.getStatusCode());
            }

            log.info("Successfully submitted solution to webhook");
        } catch (Exception e) {
            log.error("Error submitting to webhook", e);
            throw new RuntimeException("Webhook submission failed", e);
        }
    }

    @Recover
    public void recover(RuntimeException e, ApiResponse apiResponse, Object solution) {
        log.error("All webhook submission attempts failed", e);
        // You could implement additional recovery logic here if needed
    }

    private int retryCount = 0;
    
    private int getRetryCount() {
        return ++retryCount;
    }
}