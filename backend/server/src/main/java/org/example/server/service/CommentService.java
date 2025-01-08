package org.example.server.services;

import org.example.server.dto.CommentRequestDto;
import org.example.server.dto.CommentResponseDto;
import org.example.server.entities.Comment;
import org.example.server.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    // 댓글 작성
    public CommentResponseDto createComment(CommentRequestDto request) {
        Comment comment = new Comment();
        comment.setPostId(request.getPostId());
        comment.setUserPk(request.getUserPk());
        comment.setContent(request.getContent());
        comment = commentRepository.save(comment);

        return toResponseDto(comment);
    }

    // 특정 게시물의 댓글 목록 조회
    public List<CommentResponseDto> getCommentsByPostId(Long postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        return comments.stream().map(this::toResponseDto).collect(Collectors.toList());
    }

    // 댓글 수정
    public CommentResponseDto updateComment(Long id, CommentRequestDto request) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        comment.setContent(request.getContent());
        comment = commentRepository.save(comment);
        return toResponseDto(comment);
    }

    // 댓글 삭제
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

    // 좋아요 증가
    public CommentResponseDto increaseLike(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        comment.setLikeNum(comment.getLikeNum() + 1);
        commentRepository.save(comment);
        return toResponseDto(comment);
    }

    // 싫어요 증가
    public CommentResponseDto increaseDislike(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        comment.setDislikeNum(comment.getDislikeNum() + 1);
        commentRepository.save(comment);
        return toResponseDto(comment);
    }

    // Entity -> DTO 변환
    private CommentResponseDto toResponseDto(Comment comment) {
        return CommentResponseDto.builder()
                .commentId(comment.getId())
                .postId(comment.getPostId())
                .userPk(comment.getUserPk())
                .content(comment.getContent())
                .likeNum(comment.getLikeNum())
                .dislikeNum(comment.getDislikeNum())
                .build();
    }
}