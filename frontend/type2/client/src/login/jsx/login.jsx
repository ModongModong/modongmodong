// import React, {useEffect, useState} from "react";
import {useState} from "react";
import styles from "../css/login.module.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    // 로그인 버튼 클릭 핸들러
    const handleLogin = async () => {
        if (!email || !password) {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        try {
            // 서버로 로그인 요청
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

            // 응답 처리
            if (response.ok) {
                const result = await response.json();
                console.log(result);

                alert("로그인 성공.");
                window.location.href = "/mypage"; // 마이페이지로 이동
            } else {
                const errorResult = await response.json();
                alert(errorResult.message || "로그인 실패..");
                console.log(errorResult);
            }
        } catch (error) {
            console.error("로그인 요청 중 오류 발생:", error);
            alert("로그인 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };


    return (
        <div className={styles.login_wrapper}>
            <div className={styles.login_container}>
                <h1>모동모동</h1>

                <div className={styles.input_group}>
                    <label htmlFor="userID">아이디</label>
                    <input
                        type="text"
                        id="userID"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // 상태 업데이트
                        placeholder="아이디를 입력하세요"
                    />
                </div>

                <div className={styles.input_group}>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // 상태 업데이트
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>

                <button className={styles.login_button} onClick={handleLogin}>
                    로그인
                </button>

                <div className={styles.social_login}>
                    <button className={styles.naver_login}>N 네이버 로그인</button>
                    <button className={styles.kakao_login}>💬 카카오 로그인</button>
                </div>

                <div className={styles.signup_link}>
                    <a href="/signup">회원가입</a>
                </div>
            </div>
        </div>

    );
}

export default Login;
