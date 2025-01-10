package org.example.server.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class LoginRequest {
    private String email;
    private String password;
    private String username;
}