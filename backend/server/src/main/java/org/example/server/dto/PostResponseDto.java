package org.example.server.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PostResponseDto {
    private Long postId;
    private String userPk;
    private String title;
    private String timestamp;
    private String content;
    private Integer likeNum;
    private Integer commentCounter;
}
