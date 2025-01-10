package org.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CommentResponseDto {
    private Long commentId;
    private Long postId;
    private String nickname;
    private String content;
    private Integer commentLikeNum;
    private Integer dislikeNum;
}