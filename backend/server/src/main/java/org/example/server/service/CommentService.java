package org.example.server.service;

import org.example.server.dto.CommentRequestDto;
import org.example.server.dto.CommentResponseDto;
import org.example.server.entities.Comment;
import org.example.server.entities.Post;
import org.example.server.repository.CommentRepository;
import org.example.server.repository.PostRepository;
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

    // 댓글 생성
    public CommentResponseDto createComment(CommentRequestDto request) {
        // 게시물 확인
        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // 댓글 생성
        Comment comment = new Comment();
        comment.setUserId(request.getUserId());
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

    // 싫어요 증가
    public CommentResponseDto increaseDislike(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        comment.setDislikeNum(comment.getDislikeNum() + 1);
        commentRepository.save(comment);
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
        commentRepository.delete(comment);
        if (post.getCommentCount() > 0) {
            post.setCommentCount(post.getCommentCount() - 1);
            postRepository.save(post);
        }
    }

    // Comment 엔티티 -> CommentResponseDto 변환
    private CommentResponseDto toResponseDto(Comment comment) {
        return CommentResponseDto.builder()
                .commentId(comment.getCommentId())
                .postId(comment.getPost().getPostId())
                .userId(comment.getUserId())
                .content(comment.getContent())
                .commentLikeNum(comment.getCommentLikeNum())
                .dislikeNum(comment.getDislikeNum())
                .build();
    }
}