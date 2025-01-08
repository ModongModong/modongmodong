package org.example.server.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class PostResponseDto {
    private Long postId;
    private Long userId;
    private String title;
    private String content;
    private LocalDateTime timestamp;
    private Integer postLikeNum;
    private Integer commentCount;
}