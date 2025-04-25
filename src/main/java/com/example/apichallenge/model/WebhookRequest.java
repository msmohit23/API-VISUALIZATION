package com.example.apichallenge.model;

import lombok.Data;

@Data
public class WebhookRequest {
    private String regNo;
    private Object outcome;

    public WebhookRequest(String regNo, Object outcome) {
        this.regNo = regNo;
        this.outcome = outcome;
    }
}