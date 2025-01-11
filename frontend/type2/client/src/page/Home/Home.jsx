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

    function timeAgo(timestamp) {
        const now = new Date();
        const postTime = new Date(timestamp);
        const diffInMs = now - postTime;
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

        if (diffInMinutes < 60) {
            return `${diffInMinutes}분 전`;
        } else if (diffInMinutes < 1440) {
            const diffInHours = Math.floor(diffInMinutes / 60);
            return `${diffInHours}시간 전`;
        } else {
            const diffInDays = Math.floor(diffInMinutes / 1440);
            return `${diffInDays}일 전`;
        }
    }

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
        <div className={styles.post_list_wrapper}>
            <div className={styles.logo}>
                <h3>모동모동</h3>
                <p>모두의 동물 정보!</p>
            </div>
            {postList.map((item) => {
                return (
                   <div className={styles.post_wrapper} key={item.postId}>
                       <Link to={`/post/${item.postId}`} className={styles.post} >
                           <div className={styles.top_area}>
                               <p className={styles.title}>{item.title}</p>
                               <p>{item.nickname}</p>
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
                               <p>{timeAgo(item.timestamp)}</p>
                           </div>
                       </Link>
                   </div>
                )
            })}
            <FloatingBtn/>
        </div>
    )
}

export default Home;