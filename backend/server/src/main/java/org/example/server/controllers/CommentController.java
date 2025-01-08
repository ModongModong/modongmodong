package org.example.server.controllers;

import org.example.server.dto.CommentRequestDto;
import org.example.server.dto.CommentResponseDto;
import org.example.server.services.CommentService;
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
    public ResponseEntity<CommentResponseDto> createComment(@RequestBody CommentRequestDto commentRequestDto) {
        CommentResponseDto createdComment = commentService.createComment(commentRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
    }

    // 특정 게시물의 댓글 목록 조회
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentResponseDto>> getCommentsByPostId(@PathVariable Long postId) {
        List<CommentResponseDto> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    // 댓글 수정
    @PutMapping("/{id}")
    public ResponseEntity<CommentResponseDto> updateComment(@PathVariable Long id, @RequestBody CommentRequestDto commentRequestDto) {
        CommentResponseDto updatedComment = commentService.updateComment(id, commentRequestDto);
        return ResponseEntity.ok(updatedComment);
    }

    // 댓글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }

    // 좋아요 증가
    @PostMapping("/{id}/like")
    public ResponseEntity<CommentResponseDto> increaseLike(@PathVariable Long id) {
        CommentResponseDto updatedComment = commentService.increaseLike(id);
        return ResponseEntity.ok(updatedComment);
    }

    // 싫어요 증가
    @PostMapping("/{id}/dislike")
    public ResponseEntity<CommentResponseDto> increaseDislike(@PathVariable Long id) {
        CommentResponseDto updatedComment = commentService.increaseDislike(id);
        return ResponseEntity.ok(updatedComment);
    }
}