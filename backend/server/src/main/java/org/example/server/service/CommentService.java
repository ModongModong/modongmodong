package org.example.server.service;

import org.example.server.dto.CommentRequestDto;
import org.example.server.dto.CommentResponseDto;
import org.example.server.entities.Comment;
import org.example.server.entities.Post;
import org.example.server.entities.User;
import org.example.server.repository.CommentRepository;
import org.example.server.repository.PostRepository;
import org.example.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    // 댓글 생성
    public CommentResponseDto createComment(CommentRequestDto request) {
        // 게시물 확인
        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        // 댓글 생성
        Comment comment = new Comment();
        comment.setPost(post); // Post 설정
        comment.setContent(request.getContent());

        post.addComment(comment);

        // 저장
        commentRepository.save(comment);
        post.setCommentCount(post.getCommentCount() + 1);
        postRepository.save(post);

        return toResponseDto(comment);
    }

    // 특정 게시물의 댓글 목록 조회
    public List<CommentResponseDto> getCommentsByPostId(Long postId) {

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // 댓글 조회
        List<Comment> comments = commentRepository.findByPost(post);
        return comments.stream().map(this::toResponseDto).collect(Collectors.toList());
    }

    // 좋아요 증가
    public CommentResponseDto increaseLike(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        comment.setCommentLikeNum(comment.getCommentLikeNum() + 1);
        commentRepository.save(comment);
        return toResponseDto(comment);
    }
    // 좋아요 취소
    public CommentResponseDto decreaseLike(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (comment.getCommentLikeNum() > 0) {
            comment.setCommentLikeNum(comment.getCommentLikeNum() - 1);
            commentRepository.save(comment);
        }

        return toResponseDto(comment);
    }
    // 싫어요 증가
    public CommentResponseDto increaseDislike(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        comment.setDislikeNum(comment.getDislikeNum() + 1);
        commentRepository.save(comment);
        return toResponseDto(comment);
    }
    // 싫어요 취소
    public CommentResponseDto decreaseDislike(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (comment.getDislikeNum() > 0) {
            comment.setDislikeNum(comment.getDislikeNum() - 1);
            commentRepository.save(comment);
        }

        return toResponseDto(comment);
    }
    // 댓글 수정
    public CommentResponseDto updateComment(Long id, CommentRequestDto request) {

        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        // 댓글 내용 수정
        comment.setContent(request.getContent());
        commentRepository.save(comment);

        return toResponseDto(comment);
    }



    // 댓글 삭제
    public void deleteComment(Long id) {

        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));


        Post post = comment.getPost();
        post.removeComment(comment);


        if (post.getCommentCount() > 0) {
            post.setCommentCount(post.getCommentCount() - 1);
        }
        postRepository.save(post);
        commentRepository.delete(comment);
    }
    // Comment 엔티티 -> CommentResponseDto 변환
    private CommentResponseDto toResponseDto(Comment comment) {
        return CommentResponseDto.builder()
                .commentId(comment.getCommentId())
                .postId(comment.getPost().getPostId())
                .nickname(comment.getUser().getNickname())
                .content(comment.getContent())
                .commentLikeNum(comment.getCommentLikeNum())
                .dislikeNum(comment.getDislikeNum())
                .build();
    }
}