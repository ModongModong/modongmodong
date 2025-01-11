import Goback_icon from "../../assets/icons/goback_icon.jsx";
import styles from "./Add_post.module.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function AddPost(){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const goBack = () => {
        navigate(-1);
    };
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/myinfo", {
                    method: "GET",
                    credentials: "include", // 세션 정보와 쿠키를 포함하여 요청
                });

                if (!response.ok) {
                    alert("로그인되지 않았습니다.");
                    window.location.href = "/login";
                    return;
                }

                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error("유저 정보 로딩 중 오류 발생:", error);
            }
        };

        fetchUserData();
    }, []);
    const handleSubmit = async () => {
      if(!title||!content){
          alert("제목과 내용을 모두 입력해주세요");
          return;
      }

      try{
          const res = await axios.post("/api/posts",{
              title,
              content,
          })
          if(res.status === 200) {
              alert("게시글이 성공적으로 등록되었습니다")
              navigate("/");
          }
      } catch(err) {
        setError("오류가 발생했어요ㅠ");
        console.log(err);
      }
    };

    return (
        <div className={styles.post_add_area}>
            <div className={styles.top_area}>
                <div onClick={goBack}>
                    <Goback_icon/>
                </div>
                <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className={styles.content}>
                <textarea
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className={styles.btn_area}>
                <button className={styles.add_btn} onClick={handleSubmit}>
                    등록하기
                </button>
            </div>
        </div>
    )
}

export default AddPost;