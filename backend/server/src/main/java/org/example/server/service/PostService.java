package org.example.server.service;

import jakarta.servlet.http.HttpServletRequest;
import org.example.server.dto.PostRequestDto;
import org.example.server.dto.PostResponseDto;
import org.example.server.entities.Post;
import org.example.server.entities.User;
import org.example.server.repository.PostRepository;
import org.example.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    public PostResponseDto createPost(PostRequestDto request, HttpServletRequest httpRequest) {
        User user = (User) httpRequest.getSession().getAttribute("user");

        if (user == null) {
            throw new RuntimeException("로그인된 사용자가 없습니다.");
        }

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
    public PostResponseDto updatePost(Long postId, PostRequestDto request, HttpServletRequest httpRequest) {
        User user = (User) httpRequest.getSession().getAttribute("user");

        if (user == null) {
            throw new RuntimeException("로그인된 사용자가 없습니다.");
        }

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시물을 찾을 수 없습니다."));

        if (!post.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("수정 권한이 없습니다.");
        }

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
    public void deletePost(Long postId, HttpServletRequest httpRequest) {
        User user = (User) httpRequest.getSession().getAttribute("user");

        if (user == null) {
            throw new RuntimeException("로그인된 사용자가 없습니다.");
        }

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시물을 찾을 수 없습니다."));

        if (!post.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }

        postRepository.delete(post);
    }

    // 좋아요 증가
    public PostResponseDto increaseLike(Long postId, HttpServletRequest httpRequest) {
        User user = (User) httpRequest.getSession().getAttribute("user");

        if (user == null) {
            throw new RuntimeException("로그인된 사용자가 없습니다.");
        }

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
    public PostResponseDto decreaseLike(Long postId, HttpServletRequest httpRequest) {
        User user = (User) httpRequest.getSession().getAttribute("user");

        if (user == null) {
            throw new RuntimeException("로그인된 사용자가 없습니다.");
        }

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시물을 찾을 수 없습니다."));

        if (post.getPostLikeNum() > 0) {
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
