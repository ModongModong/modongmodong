package org.example.server.service;

import org.example.server.dto.PostRequestDto;
import org.example.server.dto.PostResponseDto;
import org.example.server.entities.Post;
import org.example.server.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // 모든 게시물 조회
    public Page<PostResponseDto> getAllPosts(Pageable pageable) {
        return postRepository.findAll(pageable).map(post -> PostResponseDto.builder()
                .postId(post.getPostId())
                .userId(post.getUserId())
                .title(post.getTitle())
                .content(post.getContent())
                .timestamp(post.getTimestamp())
                .postLikeNum(post.getPostLikeNum())
                .commentCount(post.getCommentCount())
                .build());
    }
   // 게시물 상세 보기
    public PostResponseDto getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return PostResponseDto.builder()
                .postId(post.getPostId())
                .userId(post.getUserId())
                .title(post.getTitle())
                .content(post.getContent())
                .timestamp(post.getTimestamp())
                .postLikeNum(post.getPostLikeNum())
                .commentCount(post.getCommentCount())
                .build();
    }

    // 글 쓰기
    public PostResponseDto createPost(PostRequestDto request) {
        Post post = new Post();
        post.setUserId(request.getUserId());
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setTimestamp(LocalDateTime.now());
        post = postRepository.save(post);

        return PostResponseDto.builder()
                .postId(post.getPostId())
                .userId(post.getUserId())
                .title(post.getTitle())
                .content(post.getContent())
                .timestamp(post.getTimestamp())
                .postLikeNum(post.getPostLikeNum())
                .commentCount(post.getCommentCount())
                .build();
    }


    // 글수정
    public PostResponseDto updatePost(Long postId, PostRequestDto request) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post = postRepository.save(post);

        return PostResponseDto.builder()
                .postId(post.getPostId())
                .userId(post.getUserId())
                .title(post.getTitle())
                .content(post.getContent())
                .timestamp(post.getTimestamp())
                .postLikeNum(post.getPostLikeNum())
                .commentCount(post.getCommentCount())
                .build();
    }

    // 글 삭제
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

    // 좋아요 개수
    public PostResponseDto increaseLike(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        post.setPostLikeNum(post.getPostLikeNum() + 1);
        postRepository.save(post);
        return PostResponseDto.builder()
                .postId(post.getPostId())
                .userId(post.getUserId())
                .title(post.getTitle())
                .content(post.getContent())
                .timestamp(post.getTimestamp())
                .postLikeNum(post.getPostLikeNum())
                .commentCount(post.getCommentCount())
                .build();
    }
}