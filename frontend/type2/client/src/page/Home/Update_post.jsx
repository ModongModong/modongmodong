import Goback_icon from "../../assets/icons/goback_icon.jsx";
//포스트등록(Add_post페이지와 같은 css 사용)
import styles from "./Add_post.module.css"
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function UpdatePost(){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const [originPost, setOriginPost] = useState({});
    const navigate = useNavigate();
    const {postId} =useParams()

    const goBack = () => {
        navigate(-1);
    };

    //게시글 데이터 가져오기
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`/api/posts/${postId}`);
                setOriginPost(res.data);
                setTitle(res.data.title);
                setContent(res.data.content);
            } catch (err) {
                setError("게시글을 불러오는 데 실패했습니다.");
                console.error(err);
            }
        };

        fetchPost();
    }, [postId]);

    const handleUpdate = async () => {
        const updatedPost = {
            "title": title || originPost.title, // 제목이 변경되지 않았으면 기존 값 유지
            "content": content || originPost.content, // 내용이 변경되지 않았으면 기존 값 유지
        };

      try{
          const res = await axios.put(`/api/posts/${postId}`, updatedPost)
          if(res.status === 200) {

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
                    placeholder={originPost.title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className={styles.content}>
                <textarea
                    placeholder={originPost.content}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className={styles.btn_area}>
                <button className={styles.add_btn} onClick={handleUpdate}>
                    수정하기
                </button>
            </div>
        </div>
    )
}

export default UpdatePost;