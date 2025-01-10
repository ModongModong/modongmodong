package org.example.server.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.server.dto.AddUserRequest;
import org.example.server.dto.AddUserResponse;
import org.example.server.dto.LoginRequest;
import org.example.server.dto.LoginResponse;
import org.example.server.entities.User;
import org.example.server.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

// url 프리픽스 추가
@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class UserApiController {
    private final UserService userService;

    @PostMapping("/users")
    public ResponseEntity<?> signup(@RequestBody AddUserRequest request) {
        try {
            userService.save(request);

            return ResponseEntity.ok(
                    AddUserResponse.builder()
                            .code(1)
                            .message("가입 성공")
                            .build()
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    AddUserResponse.builder()
                            .code(0)
                            .message(e.getMessage()) // 에러 메시지 반환
                            .build()
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request,HttpServletRequest httpRequest) {
        try {
            // 사용자 검증
            User user = userService.login(request.getEmail(), request.getPassword());

            // 세션에 사용자 정보 저장
            httpRequest.getSession().setAttribute("user", user);

            return ResponseEntity.ok(
                    LoginResponse.builder()
                            .code(1)
                            .message("로그인 성공")
                            .build()
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    LoginResponse.builder()
                            .code(0)
                            .message(e.getMessage())
                            .build()
            );
        }
    }

    // 로그인한 유저 정보 조회
    @GetMapping("/myinfo")
    public ResponseEntity<?> getMyInfo(HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).body("로그인되지 않았습니다.");
        }

        // 유저 정보 반환
        return ResponseEntity.ok(user);
    }


    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response,
                SecurityContextHolder.getContext().getAuthentication());
        return "redirect:/login";
    }
}
