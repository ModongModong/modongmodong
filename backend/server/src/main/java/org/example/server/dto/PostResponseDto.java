package org.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class PostResponseDto {
    private Long postId;
    private Long userPk;
    private String nickname;
    private String title;
    private String content;
    private LocalDateTime timestamp;
    private Integer postLikeNum;
    private Integer commentCount;
}