package login;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("/api")
public class LoginController {

    // 간단한 사용자 검증용 (예: 테스트 데이터)
    private static final String TEST_USERNAME = "test";
    private static final String TEST_PASSWORD = "1234";

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // ID와 비밀번호 확인
        if (TEST_USERNAME.equals(loginRequest.getUsername()) &&
                TEST_PASSWORD.equals(loginRequest.getPassword())) {
            return ResponseEntity.ok().body("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Invalid username or password"));
        }
    }

    // 응답용 클래스 (단순 에러 메시지 전송)
    private static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }

    // 로그인 요청용 클래스
    private static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
