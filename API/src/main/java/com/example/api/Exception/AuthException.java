package com.example.api.Exception;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class AuthException extends Exception {
    private Map<String, String> mapError;

    public AuthException(Map<String, String> mapError) {
        this.mapError = mapError;
    }
}
