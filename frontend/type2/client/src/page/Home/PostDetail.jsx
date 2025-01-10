import styles from './PostDetail.module.css'
import KebabIcon from "../../assets/icons/KebabIcon.jsx";
import HeartIcon from "../../assets/icons/heart_icon.jsx";
import CommentIcon from "../../assets/icons/comment_icon.jsx";
import UpdateIcon from "../../assets/icons/Update_icon.jsx";
import DeleteIcon from "../../assets/icons/Delete_Icon.jsx";
import GobackIcon from "../../assets/icons/goback_icon.jsx";
import {
    FaRegStar,
    FaStar,
    FaRegThumbsUp,
    FaThumbsUp,
    FaRegThumbsDown,
    FaThumbsDown,
} from "react-icons/fa";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


function PostDetail(){
    const [postDetail, setPostDetail] = useState([]);
    const [error, setError] = useState(null);
    const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [isDislike, setIsDislike] = useState(false);
    const [likeCount, setLikeCount] = useState();
    const [dislikeCount, setDislikeCount] = useState();
    const navigate = useNavigate();
    const { postId } = useParams();


    //뒤로가기버튼
    const goBack = () => {
        navigate(-1);
    };

    const goUpdate = () =>{
      navigate(`/post/update/${postId}`)
    };

    //상세 게시글 불러오기
    useEffect(() => {
        console.log(postId);

        const fetchPostDetail = async () => {
            try{
                const res = await axios.get(`/api/posts/${postId}`)
                console.log(res.data)
                setPostDetail(res.data);
            } catch(err) {
               alert(err);
            }
        };
        fetchPostDetail();
    }, []);


    //게시글 삭제
    const deletePost = async () => {
      try{
          await axios.delete(`/api/posts/${postId}`);
          alert("게시글이 삭제되었습니다")
          navigate("/");
      }catch{
          alert("에러가 발생했어요ㅠ")
      }
    };

    const toggleKebabMenu = () => {
        setIsKebabMenuOpen((prev) => !prev);
    }

    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev);
    }

    const toggleLike = () => {
        if(isLike){
            setIsLike(false);
            setLikeCount((prev) => prev - 1);
        } else{
            setIsLike(true);
            setLikeCount((prev) => prev + 1)

            // 싫어요가 활성화된 경우 취소
            if (isDislike) {
                setIsDislike(false);
                setDislikeCount((prev) => prev - 1);
            }

        }

    }

    const toggleDislike = () => {
        if (isDislike) {
            setIsDislike(false);
            setDislikeCount((prev) => prev - 1);
        } else {
            setIsDislike(true);
            setDislikeCount((prev) => prev + 1);
            if (isLike) {
                // 좋아요가 활성화된 경우 취소
                setIsLike(false);
                setLikeCount((prev) => prev - 1);
            }
        }
    };

    return (
        <>
            <div className={styles.top_area}>
                <div onClick={goBack}>
                    <GobackIcon/>
                </div>
                <p>{postDetail.title}</p>
                <div className={styles.kebab_icon} onClick={toggleKebabMenu}>
                    <KebabIcon/>
                </div>
                {isKebabMenuOpen && (
                    <div className={styles.kebab_menu_area}>
                        <button className={styles.post_edit_btn} onClick={goUpdate}>수정하기</button>
                        <button
                            className={styles.post_delete_btn}
                            onClick={deletePost}>삭제하기
                        </button>
                    </div>
                )}
            </div>
            <div className={styles.content_area}>
                <div className={styles.content}>{postDetail.content}</div>
                <div className={styles.icon_area}>
                    <div className={styles.heart_icon}>
                    <HeartIcon/>
                        <p>{postDetail.postLikeNum}</p>
                    </div>
                    <div className={styles.comment_icon}>
                        <CommentIcon/>
                        <p>{postDetail.commentCount}</p>
                    </div>
                    <div className={styles.favorite_icon} onClick={toggleFavorite}>
                        {isFavorite ? <FaStar/> : <FaRegStar/>}
                    </div>
                </div>
            </div>
            <div className={styles.comment_area}>
                <div className={styles.nickname_area}>
                    <p>댓글 단 유저의 닉네임</p>
                    <div className={styles.thums_up_area} onClick={toggleLike}>
                        {isLike ? <FaThumbsUp/>  : <FaRegThumbsUp/>}
                        <span>{likeCount}</span>
                    </div>
                    <div className={styles.thums_down_area} onClick={toggleDislike}>
                        {isDislike ? <FaThumbsDown/> : <FaRegThumbsDown/>}
                        <span>{dislikeCount}</span>
                    </div>
                </div>
                <div className={styles.comment_rud_area}>
                    <p>댓글내용</p>
                    <UpdateIcon/>
                    <DeleteIcon/>
                </div>
            </div>
        </>
    )
}

export default PostDetail;