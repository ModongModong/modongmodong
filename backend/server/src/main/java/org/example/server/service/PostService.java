package org.example.server.service;

import org.example.server.dto.PostRequestDto;
import org.example.server.dto.PostResponseDto;
import org.example.server.entities.Post;
import org.example.server.entities.User;
import org.example.server.repository.PostRepository;
import org.example.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    // 로그인된 사용자 정보 가져오기
    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() ||
                "anonymousUser".equals(authentication.getPrincipal())) {
            throw new RuntimeException("인증 정보가 유효하지 않습니다.");
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails) {
            // UserDetails에서 userPk를 가져오기
            String email = ((UserDetails) principal).getUsername();
            return userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("로그인된 사용자를 찾을 수 없습니다."));
        }

        throw new RuntimeException("알 수 없는 인증 정보 유형입니다.");
    }
    // 모든 게시물 조회
    public Page<PostResponseDto> getAllPosts(Pageable pageable) {
        return postRepository.findAll(pageable).map(post -> PostResponseDto.builder()
                .postId(post.getPostId())
                .userPk(post.getUser().getId())
                .nickname(post.getUser().getNickname())
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
                .orElseThrow(() -> new RuntimeException("게시물을 찾을 수 없습니다."));
        return PostResponseDto.builder()
                .postId(post.getPostId())
                .userPk(post.getUser().getId())
                .nickname(post.getUser().getNickname())
                .title(post.getTitle())
                .content(post.getContent())
                .timestamp(post.getTimestamp())
                .postLikeNum(post.getPostLikeNum())
                .commentCount(post.getCommentCount())
                .build();
    }

    // 글 쓰기
    public PostResponseDto createPost(PostRequestDto request) {
        User user = getAuthenticatedUser(); // 로그인된 사용자 정보 가져오기

        Post post = new Post();
        post.setUser(user);
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());

        post = postRepository.save(post);

        return PostResponseDto.builder()
                .postId(post.getPostId())
                .userPk(user.getId())
                .nickname(user.getNickname())
                .title(post.getTitle())
                .content(post.getContent())
                .timestamp(post.getTimestamp())
                .postLikeNum(post.getPostLikeNum())
                .commentCount(post.getCommentCount())
                .build();
    }

    // 글 수정
    public PostResponseDto updatePost(Long postId, PostRequestDto request) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시물을 찾을 수 없습니다."));

        post.setTitle(request.getTitle());
        post.setContent(request.getContent());

        post = postRepository.save(post);

        return PostResponseDto.builder()
                .postId(post.getPostId())
                .userPk(post.getUser().getId())
                .nickname(post.getUser().getNickname())
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

    // 좋아요 증가
    public PostResponseDto increaseLike(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시물을 찾을 수 없습니다."));
        post.setPostLikeNum(post.getPostLikeNum() + 1);
        postRepository.save(post);
        return PostResponseDto.builder()
                .postId(post.getPostId())
                .userPk(post.getUser().getId())
                .nickname(post.getUser().getNickname())
                .title(post.getTitle())
                .content(post.getContent())
                .timestamp(post.getTimestamp())
                .postLikeNum(post.getPostLikeNum())
                .commentCount(post.getCommentCount())
                .build();
    }

    // 좋아요 감소
    public PostResponseDto decreaseLike(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시물을 찾을 수 없습니다."));

        if (post.getPostLikeNum() > 0) { // 좋아요가 0보다 클 때만 감소
            post.setPostLikeNum(post.getPostLikeNum() - 1);
            postRepository.save(post);
        }

        return PostResponseDto.builder()
                .postId(post.getPostId())
                .userPk(post.getUser().getId())
                .nickname(post.getUser().getNickname())
                .title(post.getTitle())
                .content(post.getContent())
                .timestamp(post.getTimestamp())
                .postLikeNum(post.getPostLikeNum())
                .commentCount(post.getCommentCount())
                .build();
    }
}