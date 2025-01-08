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

    // 글 목록 조회
    public Page<PostResponseDto> getAllPosts(Pageable pageable) {
        // Page<Post>를 Page<PostResponseDto>로 매핑
        return postRepository.findAll(pageable).map(post -> PostResponseDto.builder()
                .postId(post.getPostId())
                .userPk(post.getUserPk())
                .title(post.getTitle())
                .content(post.getContent())
                .timestamp(post.getTimestamp().toString())
                .likeNum(post.getLikeNum())
                .commentCounter(post.getCommentCounter())
                .build());
    }

    // 글 작성
    public PostResponseDto createPost(PostRequestDto request) {
        // Post 엔티티 생성 및 저장
        Post post = new Post();
        post.setUserPk(request.getUserPk());
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setTimestamp(LocalDateTime.now());
        post = postRepository.save(post);

        // PostResponseDto로 변환하여 반환
        return PostResponseDto.builder()
                .postId(post.getPostId())
                .userPk(post.getUserPk())
                .title(post.getTitle())
                .content(post.getContent())
                .timestamp(post.getTimestamp().toString())
                .likeNum(post.getLikeNum())
                .commentCounter(post.getCommentCounter())
                .build();
    }

    // 글 수정
    public PostResponseDto updatePost(Long postId, PostRequestDto request) {
        // postId에 해당하는 글 찾기
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post = postRepository.save(post);

        // PostResponseDto로 변환하여 반환
        return PostResponseDto.builder()
                .postId(post.getPostId())
                .userPk(post.getUserPk())
                .title(post.getTitle())
                .content(post.getContent())
                .timestamp(post.getTimestamp().toString())
                .likeNum(post.getLikeNum())
                .commentCounter(post.getCommentCounter())
                .build();
    }

    // 글 삭제
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }
}
