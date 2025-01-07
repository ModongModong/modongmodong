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
import {useState} from "react";


function PostDetail(){
    const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [isDislike, setIsDislike] = useState(false);
    const [likeCount, setLikeCount] = useState(5); // 초기 좋아요 수
    const [dislikeCount, setDislikeCount] = useState(10); // 초기 싫어요 수

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
                <GobackIcon/>
                <p>게시글 제목</p>
                <div className={styles.kebab_icon} onClick={toggleKebabMenu}>
                    <KebabIcon/>
                </div>
                {isKebabMenuOpen && (
                    <div className={styles.kebab_menu_area}>
                        <button className={styles.post_edit_btn}>수정하기</button>
                        <button className={styles.post_delete_btn}>삭제하기</button>
                    </div>
                )}
            </div>
            <div className={styles.content_area}>
                <div className={styles.content}>게시글 내용</div>
                <div className={styles.icon_area}>
                    <div className={styles.heart_icon}>
                    <HeartIcon/>
                        <p>11</p>
                    </div>
                    <div className={styles.comment_icon}>
                        <CommentIcon/>
                        <p>8</p>
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