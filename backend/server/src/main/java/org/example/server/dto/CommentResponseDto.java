package org.example.server.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentResponseDto {
    private Long commentId;
    private Long postId;
    private Long userPk;
    private String content;
    private Integer likeNum;
    private Integer dislikeNum;
}
