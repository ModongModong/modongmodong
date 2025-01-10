package org.example.server.dto;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
public class LoginResponse {
    private int code;
    private String message;
}