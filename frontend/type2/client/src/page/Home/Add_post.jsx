import Goback_icon from "../../assets/icons/goback_icon.jsx";
import styles from "./Add_post.module.css"
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function AddPost(){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const handleSubmit = async () => {
      if(!title||!content){
          alert("제목과 내용을 모두 입력해주세요");
          return;
      }

      try{
          const res = await axios.post("/api/posts",{
              userId:99,
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