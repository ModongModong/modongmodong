import {useState} from "react";
import styles from "../css/signup.module.css";
import {IoClose} from "react-icons/io5";
import ErrorPopup  from "./ErrorPopup.jsx";


function Signup() {
    // 상태 관리
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [address, setAddress] = useState("");
    const [errorPopup, setErrorPopup] = useState(null);
    const [onCloseAction, setOnCloseAction] = useState(null);

    // 회원가입 버튼 클릭 핸들러
    const handleSignup = async () => {
        // 입력값 검증
        if (!email) {
            // alert("이메일을 입력해주세요.");
            setErrorPopup("이메일을 입력해주세요.");
            return;
        }
        if (!password) {
            // alert("비밀번호를 입력해주세요.");
            setErrorPopup("비밀번호를 입력해주세요.");
            return;
        }
        if (!address) {
            // alert("주소를 입력해주세요.");
            setErrorPopup("주소를 입력해주세요.");
            return;
        }

        if (!confirmPassword) {
            // alert("비밀번호 확인을 입력해주세요.");
            setErrorPopup("비밀번호 확인을 입력해주세요.");
            return;
        }

        if (password !== confirmPassword) {
            // alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            setErrorPopup("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }
        if (!nickname) {
            // alert("닉네임을 입력해주세요.");
            setErrorPopup("닉네임을 입력해주세요.");
            return;
        }

        try {
            // 서버로 회원가입 요청
            const response = await fetch(`http://localhost:8080/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                    confirmPassword,
                    nickname,
                    address,
                }),
            });

            // 이메일 형식 검사
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                // alert("유효하지 않은 이메일 형식입니다. 다시 입력해주세요.");
                setErrorPopup("유효하지 않은 이메일 형식입니다. 다시 입력해주세요.");
                return;
            }

            // 이메일, 닉네임 중복 응답 처리
            if (!response.ok) {
                const errorResult = await response.json();
                // alert(errorResult.message || "회원가입 실패.."); // 에러 메시지 팝업창에 표시
                setErrorPopup(errorResult.message || "회원가입 실패..");
                console.log(errorResult)
                return;
            }

            // console.log(response);
            const result = await response.json();
            console.log(result);

            // 응답 처리
            if (result.code == 1) {
                // alert("회원가입 성공! 로그인 페이지로 이동합니다.");
                setErrorPopup("회원가입 성공! 로그인 페이지로 이동합니다.");
                // window.location.href = "/login"; // 로그인 페이지로 이동
                setOnCloseAction(() => () => {
                    window.location.href = "/login";
                });
            } else {
                setErrorPopup(result.message || "회원가입 실패. 다시 시도해주세요.");
                // alert(result.message || "회원가입 실패. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("회원가입 요청 중 오류 발생:", error);
            setErrorPopup("회원가입 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
            // alert("회원가입 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className={styles.signup_wrapper}>
            {errorPopup && (<ErrorPopup message={errorPopup} onClose={() => {setErrorPopup(null);if (onCloseAction) onCloseAction();}}/>)}
            <div className={styles.signup_container}>
                <button className={styles.closeIcon} onClick={() => window.history.back()}>
                    <IoClose size={28}/>
                </button>
                <h1>회원가입</h1>
                <div className={styles.input_group}>
                    <label>이메일</label>
                    <input
                        type="email"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.input_group}>
                    <label>비밀번호</label>
                    <input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={styles.input_group}>
                    <label>비밀번호 확인</label>
                    <input
                        type="password"
                        placeholder="비밀번호를 다시 입력하세요"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className={styles.input_group}>
                    <label>닉네임</label>
                    <input
                        type="text"
                        id="nickname"
                        placeholder="닉네임을 입력하세요"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <div className={styles.input_group}>
                    <label>주소</label>
                    <input
                        type="text"
                        placeholder="주소를 입력하세요"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <button className={styles.signup_button} onClick={handleSignup}>
                    회원가입
                </button>
            </div>
        </div>
    );
}

export default Signup;