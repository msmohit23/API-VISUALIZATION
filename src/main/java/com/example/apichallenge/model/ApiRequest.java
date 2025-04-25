package com.example.apichallenge.model;

import lombok.Data;

@Data
public class ApiRequest {
    private String name;
    private String regNo;
    private String email;

    public ApiRequest() {
        this.name = "John Doe";
        this.regNo = "REG12347";
        this.email = "john@example.com";
    }
}