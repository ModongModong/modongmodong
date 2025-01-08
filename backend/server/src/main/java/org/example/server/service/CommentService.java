package org.example.server.service;

import org.example.server.dto.CommentRequestDto;
import org.example.server.dto.CommentResponseDto;
import org.example.server.entities.Comment;
import org.example.server.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    // 댓글 작성
    public CommentResponseDto createComment(Long postId, CommentRequestDto request) {
        // Comment 엔티티 생성 및 저장
        Comment comment = new Comment();
        comment.setPostId(postId);
        comment.setUserPk(request.getUserPk());
        comment.setContent(request.getContent());
        comment = commentRepository.save(comment);

        // CommentResponseDto로 변환하여 반환
        return CommentResponseDto.builder()
                .commentId(comment.getCommentId())
                .postId(comment.getPostId())
                .userPk(comment.getUserPk())
                .content(comment.getContent())
                .likeNum(comment.getLikeNum())
                .dislikeNum(comment.getDislikeNum())
                .build();
    }

    // 댓글 수정
    public CommentResponseDto updateComment(Long postId, Long commentId, CommentRequestDto request) {
        // commentId에 해당하는 댓글 찾기
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));
        comment.setContent(request.getContent());
        comment = commentRepository.save(comment);

        // CommentResponseDto로 변환하여 반환
        return CommentResponseDto.builder()
                .commentId(comment.getCommentId())
                .postId(comment.getPostId())
                .userPk(comment.getUserPk())
                .content(comment.getContent())
                .likeNum(comment.getLikeNum())
                .dislikeNum(comment.getDislikeNum())
                .build();
    }

    // 댓글 삭제
    public void deleteComment(Long postId, Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
