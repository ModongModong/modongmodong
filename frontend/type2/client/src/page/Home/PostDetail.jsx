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
import { IoIosSend } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import MainModal from "./MainModal.jsx";
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
    const [userPk, setUserPk] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState("");
    const [showModal, setShowModal] = useState(false); // 모달 표시 상태
    const [modalMessage, setModalMessage] = useState(""); // 모달 메시지 상태
    const [commentLikes, setCommentLikes] = useState({}); // 각 댓글의 좋아요 상태
    const [commentDislikes, setCommentDislikes] = useState({}); // 각 댓글의 싫어요 상태


    //뒤로가기버튼
    const goBack = () => {
        navigate(-1);
    };
    const goUpdate = () =>{
        navigate(`/post/update/${postId}`)
    };

    //userPK 저장
    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const userRes = await axios.get("/api/myinfo", { withCredentials: true });
                setUserPk(userRes.data.id);
            } catch (err) {
                console.error(err);
                alert("에러 발생!");
            }
        };

        fetchPostDetail();
    }, []);
    //상세 게시글 불러오기 + 댓글불러오기
    useEffect(() => {
        console.log(postId);

        const fetchPostDetail = async () => {
            try{
                const res = await axios.get(`/api/posts/${postId}`, { withCredentials: true })
                console.log(res.data)
                setPostDetail(res.data);
                setLikePostCount(res.data.postLikeNum);

                const commentRes = await axios.get(`/api/comments/${postId}`, { withCredentials: true })
                console.log(commentRes.data);
                setComment(commentRes.data);
            } catch(err) {
                console.error("게시글/댓글 가져오기 실패", err);
            }
        };
        fetchPostDetail();
    }, []);

    // 모달 열기
    const openSuccessModal = (message) => {
        setModalMessage(message); // 모달 메시지 설정
        setShowModal(true);  // 모달 열기
    };

    // 모달 닫기
    const handleModalClose = () => {
        setShowModal(false); // 모달 닫기
        navigate("/");
    };

    //게시글 삭제
    const deletePost = async () => {
        try{
            await axios.delete(`/api/posts/${postId}`, { withCredentials: true });
            openSuccessModal("게시글이 삭제되었습니다")

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

    // 댓글 생성
    const commentSubmit = async () => {
        try {
            const res = await axios.post(
                "/api/comments",
                { postId, content: newComment },
                { withCredentials: true }
            );
            if (res.status === 201) {
                setComment([...comment, res.data]); // 새 댓글 추가
                setNewComment(""); // 입력 필드 초기화
            }
        } catch (err) {
            console.error("댓글 생성 실패", err);
            alert("댓글 작성 중 오류가 발생했습니다.");
        }
    };

    //댓글 삭제
    const deleteComment = async (commentId) => {
        try {
            await axios.delete(`/api/comments/${commentId}`);
            openSuccessModal("댓글이 삭제되었습니다")
            setComment((prevComments) => prevComments.filter((c) => c.commentId !== commentId));

        } catch (err) {
            console.error("댓글 삭제 실패", err);
            alert("댓글 삭제 중 오류가 발생했습니다.");
        }
    };

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

    // 댓글 수정 시작
    const startEditComment = (commentId, currentContent) => {
        setEditCommentId(commentId);
        setEditCommentContent(currentContent); // 현재 댓글 내용을 초기값으로 설정
    };

    // 댓글 수정 완료
    const updateComment = async () => {
        if(!editCommentContent) {
            openSuccessModal("댓글 내용을 입력해주세요")
            return;
        }
        try{
            const updateRes = await axios.put(`/api/comments/${editCommentId}`,{
                postId,
                userId: userPk,
                content: editCommentContent
            });

            if(updateRes.status === 200) {
                setComment((prevComments) =>
                    prevComments.map((i) =>
                        i.commentId === editCommentId
                            ? { ...i, content: editCommentContent }
                            : i
                    )
                );
                openSuccessModal("댓글 수정이 되었습니다")
                setEditCommentId(null);
            }
        }catch(err){
            console.log(err)
            alert("오류가 발생했습니다.");
        }

    }

    // 게시글 작성자인지 확인
    const isPostAuthor = userPk === postDetail.userPk;

    // 댓글 작성자인지 확인
    const isCommentAuthor = (commentUserPk) => userPk === commentUserPk;

    //댓글 좋아요
    const toggleCommentLike = async (commentId, commentLikeNum) => {
        try{
            if(commentLikes[commentId]){
                await axios.delete(`/api/comments/${commentId}/like`);
                setCommentLikes((prev) => ({ ...prev, [commentId]: false }));

            }else{
                await axios.post(`/api/comments/${commentId}/like`,{
                    commentId:commentId,
                    commentLikeNum:commentLikeNum
                });
                setCommentLikes((prev) => ({ ...prev, [commentId]: true }));

                if(commentDislikes[commentId]){
                    await axios.delete(`/api/comments/${commentId}/dislike`);
                    setCommentDislikes((prev) => ({ ...prev, [commentId]: false }));
                }
            }
        }catch(err){
            console.error(err);
        }
    };

    // 댓글 싫어요
    const toggleCommentDislike = async (commentId, dislikeNum) => {
        try{
            if(commentDislikes[commentId]){
                await axios.delete(`/api/comments/${commentId}/dislike`);
                setCommentDislikes((prev) => ({ ...prev, [commentId]: false }));
            }else{
                await axios.post(`/api/comments/${commentId}/dislike`,{
                    commentId: commentId,
                    dislikeNum: dislikeNum
                });
                setCommentDislikes((prev) => ({ ...prev, [commentId]: true }));

                if(commentLikes[commentId]){
                    await axios.delete(`/api/comments/${commentId}/like`);
                    setCommentLikes((prev) => ({ ...prev, [commentId]: false }));
                }
            }
        }catch(err){
            console.error(err);
        }
    };

    return (
        <div className={styles.detail_post_wrapper}>
            <div className={styles.top_area}>
                <div onClick={goBack} className={styles.goback_icon}>
                    <GobackIcon/>
                </div>
                <h3>{postDetail.title}</h3>
                {isPostAuthor && ( // 작성자만 메뉴 보이기
                    <div>
                        <div className={styles.kebab_icon} onClick={() => setIsKebabMenuOpen((prev) => !prev)}>
                            <KebabIcon />
                        </div>
                        {isKebabMenuOpen && (
                            <div className={styles.kebab_menu_area}>
                                <button className={styles.post_edit_btn} onClick={goUpdate}>
                                    수정하기
                                </button>
                                <button className={styles.post_delete_btn} onClick={async () => {
                                    await deletePost();
                                    openSuccessModal("게시글이 삭제되었습니다");
                                }}>
                                    삭제하기
                                </button>
                            </div>
                        )}
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
                                <p>{commentItem.nickname}</p>
                                <div className={styles.thums_up_area} onClick={() => toggleCommentLike(commentItem.commentId, commentItem.commentLikeNum)}>
                                    {commentLikes[commentItem.commentId] ? (
                                        <>
                                            <FaThumbsUp/>
                                            <span>{commentItem.commentLikeNum + 1}</span>
                                        </>
                                    ) :(
                                        <>
                                            <FaRegThumbsUp />
                                            <span>{commentItem.commentLikeNum}</span></>
                                    ) }
                                </div>
                                <div className={styles.thums_down_area} onClick={()=>toggleCommentDislike(commentItem.commentId, commentItem.dislikeNum)}>
                                    {commentDislikes[commentItem.commentId] ? (
                                        <>
                                            <FaThumbsDown/>
                                            <span>{commentItem.dislikeNum + 1}</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaRegThumbsDown/>
                                            <span>{commentItem.dislikeNum}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className={styles.comment_rud_area}>
                                {editCommentId === commentItem.commentId ? (
                                    // 수정 모드
                                    <input
                                        type="text"
                                        value={editCommentContent}
                                        onChange={(e) => setEditCommentContent(e.target.value)}
                                    />
                                ) : (
                                    // 일반 모드
                                    <p>{commentItem.content}</p>
                                )}
                                {isCommentAuthor(commentItem.userPk) && (
                                    <div onClick={() => {
                                        if (editCommentId === commentItem.commentId) {
                                            updateComment(); // 업데이트 처리
                                        } else {
                                            startEditComment(commentItem.commentId, commentItem.content); // 수정 모드 시작
                                        }
                                    }}>
                                        <div>
                                            {editCommentId === commentItem.commentId ? <IoIosSend/> : <UpdateIcon />}
                                        </div>
                                    </div>
                                )}
                                {isCommentAuthor(commentItem.userPk) && (
                                    <div onClick={() => deleteComment(commentItem.commentId)}>
                                        <DeleteIcon />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )  : (
                    <div className={styles.noncomment_area} >댓글이 없습니다</div>
                )}
                <div className={styles.comment_c_area}>
                    <input type="text" placeholder="댓글을 입력하세요"
                           value={newComment}
                           onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button className={styles.add_btn} onClick={commentSubmit}>
                        <IoIosAddCircleOutline/>
                    </button>
                </div>
            </div>
            {showModal && (
                <MainModal
                    message={modalMessage}
                    onClose={handleModalClose}
                />
            )}
        </div>
    )
}

export default PostDetail;