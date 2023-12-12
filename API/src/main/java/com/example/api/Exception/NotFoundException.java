package com.example.api.Exception;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotFoundException extends Exception {

    private String message;

    public NotFoundException(String message) {
        this.message = message;
    }
}
