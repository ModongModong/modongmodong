import React, {useEffect, useState} from "react";
import "../css/login.css";

function Login() {
    // 상태 관리
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 환경변수에서 API URL 가져오기
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        console.log(API_BASE_URL); // 환경 변수 확인
    }, []);

    // 로그인 버튼 클릭 핸들러
    const handleLogin = async () => {
        // 입력값 검증
        if (!email || !password) {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        try {
            // 서버로 로그인 요청
            // ** URL 주소 다시 확인하기 **
            const response = await fetch(`http://localhost:8080/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const errorResult = await response.json();
                alert(errorResult.messgae || "로그인 실패.."); // 에러 메시지 팝업창에 표시
                console.log(errorResult)
                return;
            }

            console.log( response );
            const result = await response.json();
            console.log( result );

            // 응답 처리
            if (result.code == 1) {
                alert("로그인 성공!");
                window.location.href = "/main";
            } else {
                alert(result.message || "아이디 또는 비밀번호가 올바르지 않습니다.");
            }
        } catch (error) {
            console.error("로그인 요청 중 오류 발생:", error);
            alert("로그인 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div id="login-container">
            <h1>모동모동</h1>

            <div className="input-group">
                <label htmlFor="userID">아이디</label>
                <input
                    type="text"
                    id="userID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // 상태 업데이트
                    placeholder="아이디를 입력하세요"
                />
            </div>

            <div className="input-group">
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // 상태 업데이트
                    placeholder="비밀번호를 입력하세요"
                />
            </div>

            <button id="login-button" onClick={handleLogin}>
                로그인
            </button>

            <div className="social-login">
                <button id="naver-login">N 네이버 로그인</button>
                <button id="kakao-login">카카오 로그인</button>
            </div>

            <div id="signup-link">
                <a href="/signup">회원가입</a>
            </div>
        </div>
    );
}

export default Login;
