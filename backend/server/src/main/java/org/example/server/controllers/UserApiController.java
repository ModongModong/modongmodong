//package org.example.server.controllers;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.example.server.dto.AddUserRequest;
//import org.example.server.dto.AddUserResponse;
//import org.example.server.dto.LoginRequest;
//import org.example.server.dto.LoginResponse;
//import org.example.server.service.UserService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
//import org.springframework.web.bind.annotation.*;
//
//// url 프리픽스 추가
//@RequestMapping("/api")
//@RequiredArgsConstructor
//@RestController
//public class UserApiController {
//    private final UserService userService;
//
//    @PostMapping("/users")
//    public ResponseEntity<?> signup(@RequestBody AddUserRequest request) {
//        try {
//            userService.save(request);
//
//            return ResponseEntity.ok(
//                    AddUserResponse.builder()
//                            .code(1)
//                            .messgae("가입 성공")
//                            .build()
//            );
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(
//                    AddUserResponse.builder()
//                            .code(0)
//                            .messgae(e.getMessage()) // 에러 메시지 반환
//                            .build()
//            );
//        }
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
//        try {
//            userService.login(request.getEmail(), request.getPassword());
//
//            return ResponseEntity.ok(
//                    LoginResponse.builder()
//                            .code(1)
//                            .messgae("로그인 성공")
//                            .build()
//            );
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(
//                    LoginResponse.builder()
//                            .code(0)
//                            .messgae(e.getMessage())
//                            .build()
//            );
//        }
//    }
//
//
//
//    @GetMapping("/logout")
//    public String logout(HttpServletRequest request, HttpServletResponse response) {
//        new SecurityContextLogoutHandler().logout(request, response,
//                SecurityContextHolder.getContext().getAuthentication());
//        return "redirect:/login";
//    }
//}
