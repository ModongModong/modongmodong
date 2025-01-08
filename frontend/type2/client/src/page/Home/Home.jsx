import styles from "./Home.module.css"
import HeartIcon from "../../assets/icons/heart_icon.jsx";
import CommentIcon from "../../assets/icons/comment_icon.jsx";
import FloatingBtn from "../../assets/FloatingBtn/Floating_btn.jsx";
import {Link} from "react-router-dom";

function Home(){
    const postList = [
        {   postId:1,
            userId: 1,
            title:"게시글제목1",
            content:"게시글내용1",
            view_count:11,
            comment_count: 30,
            like_count:8,
            create_date:"2025-01-01",
            update_date:"2025-01-02"
        },
        {   postId:2,
            userId: 2,
            title:"게시글제목2",
            content:"게시글내용2",
            view_count:77,
            comment_count: 5,
            like_count:50,
            create_date:"2025-01-01",
            update_date:"2025-01-02"
        },
        {   postId:3,
            userId: 3,
            title:"게시글제목3",
            content:"게시글내용3",
            view_count:0,
            comment_count: 0,
            like_count:0,
            create_date:"2025-01-01",
            update_date:"2025-01-02"
        },
        {   postId:4,
            userId: 4,
            title:"게시글제목4",
            content:"게시글내용4",
            view_count:34,
            comment_count: 2,
            like_count:11,
            create_date:"2025-01-01",
            update_date:"2025-01-02"
        },
        {   postId: 5,
            userId: 5,
            title:"게시글제목5",
            content:"게시글내용5",
            view_count:999,
            comment_count: 2,
            like_count:500,
            create_date:"2025-01-01",
            update_date:"2025-01-02"
        },
    ]
    return (
        <>
            <div className={styles.logo}>
                <h3>모동모동</h3>
                <p>모두의 동물 정보!</p>
            </div>
            {postList.map((item) => {
                return (
                    <Link to={`/post/${item.postId}`} className={styles.post} id={item.postId}>
                        <div className={styles.top_area}>
                            <p className={styles.title}>{item.title}</p>
                            <p>{item.userId}</p>
                        </div>
                        <div className={styles.content}>
                            <p>
                                {item.content}
                            </p>
                        </div>
                        <div className={styles.bottom_area}>
                            <div className={styles.like}>
                                <HeartIcon/>
                                <p>{item.like_count}</p>
                            </div>
                            <div className={styles.comment}>
                                <CommentIcon/>
                                <p>{item.comment_count}</p>
                            </div>
                            <p>{item.create_date}</p>
                        </div>
                    </Link>
                )
            })}
            <FloatingBtn/>
        </>
    )
}

export default Home;