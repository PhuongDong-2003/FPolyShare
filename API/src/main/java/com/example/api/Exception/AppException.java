package com.example.api.Exception;

import lombok.Builder;
import lombok.Data;

public class AppException extends RuntimeException {

    public AppException(String message) {
        super(message);
    }
}
