document.querySelector("#login-button").addEventListener("click", async () => {
    const uid = document.getElementById("userID").value;
    const upw = document.getElementById("password").value;

    // 입력값 검증
    if (!uid || !upw) {
        alert("아이디와 비밀번호를 입력해주세요.");
        return;
    }

    try {
        // 서버로 로그인 요청
        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: uid,
                password: upw,
            }),
        });

        const result = await response.json();

        // 응답 처리
        if (response.ok) {
            alert("로그인 성공!");
            window.location.href = "/main";
        } else {
            alert(result.message || "아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    } catch (error) {
        console.error("로그인 요청 중 오류 발생:", error);
        alert("로그인 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
});
