package org.example.server.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentResponseDto {
    private Long commentId;
    private Long postId;
    private Long userId;
    private String content;
    private Integer commentLikeNum;
    private Integer dislikeNum;
}