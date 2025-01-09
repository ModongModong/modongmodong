import styles from "./Home.module.css"
import HeartIcon from "../../assets/icons/heart_icon.jsx";
import CommentIcon from "../../assets/icons/comment_icon.jsx";
import FloatingBtn from "../../assets/FloatingBtn/Floating_btn.jsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function Home(){
    const [postList, setPostList] = useState([]);
    const [error, setError] = useState(null);
    // const postList = [
    //     {   postId:1,
    //         userId: 1,
    //         title:"게시글제목1",
    //         content:"게시글내용1",
    //         commentCount: 30,
    //         postLikeNum:8,
    //         timestamp:"2025-01-01",
    //     },
    //     {   postId:2,
    //         userId: 2,
    //         title:"게시글제목2",
    //         content:"게시글내용2",
    //         commentCount: 5,
    //         postLikeNum:50,
    //         timestamp:"2025-01-01",
    //     },
    //     {   postId:3,
    //         userId: 3,
    //         title:"게시글제목3",
    //         content:"게시글내용3",
    //         commentCount: 0,
    //         postLikeNum:0,
    //         timestamp:"2025-01-02"
    //     },
    //     {   postId:4,
    //         userId: 4,
    //         title:"게시글제목4",
    //         content:"게시글내용4",
    //         commentCount: 2,
    //         postLikeNum:11,
    //         timestamp:"2025-01-01",
    //     },
    //     {   postId: 5,
    //         userId: 5,
    //         title:"게시글제목5",
    //         content:"게시글내용5",
    //         commentCount: 2,
    //         postLikeNum:500,
    //         timestamp:"2025-01-01",
    //     },
    // ]

    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const res = await axios.get("/api/posts");
                console.log(res.data.content);
                setPostList(res.data.content);
            }catch(err){
                console.error("Error occurred:", JSON.stringify(err, null, 2));
                setError({err});
            }
        };
        fetchPosts();
    }, []);

    if (error) {
        alert({error});
    }

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
                                <p>{item.postLikeNum}</p>
                            </div>
                            <div className={styles.comment}>
                                <CommentIcon/>
                                <p>{item.commentCount}</p>
                            </div>
                            <p>{item.timestamp}</p>
                        </div>
                    </Link>
                )
            })}
            <FloatingBtn/>
        </>
    )
}

export default Home;