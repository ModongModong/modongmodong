package org.example.server.controllers;
import jakarta.servlet.http.HttpServletRequest;
import org.example.server.dto.CommentRequestDto;
import org.example.server.dto.CommentResponseDto;
import org.example.server.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    // 댓글 생성
    @PostMapping
    public ResponseEntity<CommentResponseDto> createComment(@RequestBody CommentRequestDto request, HttpServletRequest httpRequest) {
        CommentResponseDto createdComment = commentService.createComment(request, httpRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
    }

    // 특정 게시물의 댓글 목록 조회
    @GetMapping("/api/posts/{postId}/comments")
    public ResponseEntity<List<CommentResponseDto>> getCommentsByPostId(@PathVariable("postId") Long postId) {
        List<CommentResponseDto> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    // 좋아요 증가
    @PostMapping("/{id}/like")
    public ResponseEntity<CommentResponseDto> increaseLike(@PathVariable("id") Long id) {
        CommentResponseDto response = commentService.increaseLike(id);
        return ResponseEntity.ok(response);
    }

    // 좋아요 취소
    @DeleteMapping("/{id}/like")
    public ResponseEntity<CommentResponseDto> decreaseLike(@PathVariable("id") Long id) {
        CommentResponseDto response = commentService.decreaseLike(id);
        return ResponseEntity.ok(response);
    }

    // 싫어요 증가
    @PostMapping("/{id}/dislike")
    public CommentResponseDto increaseDislike(@PathVariable("id") Long id) {
        return commentService.increaseDislike(id);
    }

    // 싫어요 취소
    @DeleteMapping("/{id}/dislike")
    public CommentResponseDto decreaseDislike(@PathVariable("id") Long id) {
        return commentService.decreaseDislike(id);
    }


    // 댓글 수정
    @PutMapping("/{id}")
    public ResponseEntity<CommentResponseDto> updateComment(
            @PathVariable("id") Long id,
            @RequestBody CommentRequestDto request,  HttpServletRequest httpRequest) {
        CommentResponseDto updatedComment = commentService.updateComment(id, request, httpRequest);
        return ResponseEntity.ok(updatedComment);
    }

    // 댓글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable("id") Long id, HttpServletRequest  httpRequest) {
        commentService.deleteComment(id,httpRequest);
        return ResponseEntity.noContent().build();
    }
}