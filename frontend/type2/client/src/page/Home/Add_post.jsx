import Goback_icon from "../../assets/icons/goback_icon.jsx";
import styles from "./Add_post.module.css"

function AddPost(){
    return (
        <div className={styles.post_add_area}>
            <div className={styles.top_area}>
                <Goback_icon/>
                <p>게시글 제목 입력하기</p>
            </div>
            <div className={styles.content}>
                게시글 작성하기
            </div>
            <div className={styles.btn_area}>
                <button className={styles.add_btn}>
                    등록하기
                </button>
            </div>
        </div>
    )
}

export default AddPost;