package org.example.server.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Comment {
    private Long commentId;
    private Long postId;
    private Long userPk;
    private String content;
    private Integer likeNum;
    private Integer dislikeNum;
}