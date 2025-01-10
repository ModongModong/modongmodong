import styles from './PostDetail.module.css'
import KebabIcon from "../../assets/icons/KebabIcon.jsx";
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
    FaHeart,
    FaRegHeart,
} from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


function PostDetail(){
    const [postDetail, setPostDetail] = useState([]);
    const [error, setError] = useState(null);
    const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [likePost, setLiksePost]= useState(false);
    const [likePostCount, setLikePostCount] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [isDislike, setIsDislike] = useState(false);
    const [likeCount, setLikeCount] = useState();
    const [dislikeCount, setDislikeCount] = useState();
    const [comment, setComment] = useState([]);
    const navigate = useNavigate();
    const { postId } = useParams();


    //뒤로가기버튼
    const goBack = () => {
        navigate(-1);
    };

    const goUpdate = () =>{
      navigate(`/post/update/${postId}`)
    };

    //상세 게시글 불러오기 + 댓글불러오기
    useEffect(() => {
        console.log(postId);

        const fetchPostDetail = async () => {
            try{
                const res = await axios.get(`/api/posts/${postId}`)
                console.log(res.data)
                setPostDetail(res.data);
                setLikePostCount(res.data.postLikeNum);

                const commentRes = await axios.get(`/api/comments/post/${postId}`)
                console.log(commentRes.data);
                setComment(commentRes.data);
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


    // 게시글 좋아요 기능
    const togglePostLike = async () => {
        try {
            if(likePost) {
                //DELETE like
                await axios.delete(`/api/posts/${postId}/like`);
                setLiksePost(false);
                setLikePostCount((prev) => prev - 1);
            } else {
                // POST like
                await axios.post(`/api/posts/${postId}/like`);
                setLiksePost(true);
                setLikePostCount((prev) => prev + 1);

                // 싫어요가 활성화된 경우 취소
                if(isDislike) {
                    setLiksePost(false);
                    setLikePostCount((prev) => prev - 1);
                }
            }
        }catch(err) {
            alert("에러발생🚨🚨")
            console.log(err);
        }
    };

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
        <div className={styles.detail_post_wrapper}>
            <div className={styles.top_area}>
                <div onClick={goBack} className={styles.goback_icon}>
                    <GobackIcon/>
                </div>
                <h3>{postDetail.title}</h3>
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
                    <div className={styles.heart_icon} onClick={togglePostLike}>
                        {likePost ? <FaHeart/> : <FaRegHeart/>}
                        <p>{likePostCount}</p>
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
                {comment.length > 0 ?(
                    comment.map((commentItem, index) => (
                        <div key={index}>
                            <div className={styles.nickname_area}>
                                <p>{commentItem.userId}</p>
                                <div className={styles.thums_up_area}>
                                    {isLike ? <FaThumbsUp /> : <FaRegThumbsUp />}
                                    <span>{commentItem.commentLikeNum}</span>
                                </div>
                                <div className={styles.thums_down_area} onClick={toggleDislike}>
                                    {isDislike ? <FaThumbsDown /> : <FaRegThumbsDown />}
                                    <span>{commentItem.dislikeNum}</span>
                                </div>
                            </div>
                            <div className={styles.comment_rud_area}>
                                <p>{commentItem.content}</p>
                                <UpdateIcon />
                                <DeleteIcon />
                            </div>
                        </div>
                    ))
                )  : (
                    <div>댓글이 없습니다</div>
                )}
                <div className={styles.comment_c_area}>
                    <input type="text" placeholder="댓글을 입력하세요"/>
                    <IoIosAddCircleOutline />
                </div>
            </div>

        </div>
    )
}

export default PostDetail;