package org.example.server.controllers;

import org.example.server.dto.PostRequestDto;
import org.example.server.dto.PostResponseDto;
import org.example.server.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    // 글 목록 조회 (페이징 지원)
    @GetMapping
    public ResponseEntity<Page<PostResponseDto>> getAllPosts(Pageable pageable) {
        // 페이징 처리된 글 목록 반환
        Page<PostResponseDto> posts = postService.getAllPosts(pageable);
        return ResponseEntity.ok(posts);
    }

    // 글 작성
    @PostMapping
    public ResponseEntity<PostResponseDto> createPost(@Valid @RequestBody PostRequestDto request) {
        // 글 작성 후 응답
        PostResponseDto post = postService.createPost(request);
        return ResponseEntity.ok(post);
    }

    // 글 수정
    @PutMapping("/{postId}")
    public ResponseEntity<PostResponseDto> updatePost(@PathVariable Long postId, @Valid @RequestBody PostRequestDto request) {
        // 글 수정 후 응답
        PostResponseDto updatedPost = postService.updatePost(postId, request);
        return ResponseEntity.ok(updatedPost);
    }

    // 글 삭제
    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        // 글 삭제 처리
        postService.deletePost(postId);
        return ResponseEntity.noContent().build();
    }
}