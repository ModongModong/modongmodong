package org.example.server.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Post {
    private Long postId;
    private String userPk;
    private String title;
    private String content;
    private Integer likeNum;
    private Integer commentCounter;
    private String timestamp;

    // 좋아요 증가
    public void incrementLikes() {
        this.likeNum++;
    }
}
