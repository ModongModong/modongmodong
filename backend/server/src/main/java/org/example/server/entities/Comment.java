package org.example.server.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Comment")
@Getter
@Setter
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;


    @Column(name = "user_pk", nullable = false)
    private Long userId;

    @Column(name = "content", length = 255)
    private String content;

    @Column(name = "comment_like_num", nullable = false)
    private Integer commentLikeNum = 0;

    @Column(name = "dislike_num", nullable = false)
    private Integer dislikeNum = 0;
}