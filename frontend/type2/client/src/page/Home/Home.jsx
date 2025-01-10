import styles from "./Home.module.css"
import HeartIcon from "../../assets/icons/heart_icon.jsx";
import CommentIcon from "../../assets/icons/comment_icon.jsx";
import FloatingBtn from "../../assets/FloatingBtn/Floating_btn.jsx";
import {Link} from "react-router-dom";
import  {useEffect, useState} from "react";
import axios from "axios";

function Home(){
    const [postList, setPostList] = useState([]);
    const [error, setError] = useState(null);

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
                    <Link to={`/post/${item.postId}`} className={styles.post} key={item.postId}>
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