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
    private Long commentId;

    @Column(nullable = false)
    private Long postId;

    @Column(nullable = false)
    private Long userPk;

    @Column(length = 255)
    private String content;

    @Column
    private Integer likeNum = 0;

    @Column
    private Integer dislikeNum = 0;

    @Column(name = "comment_count")
    private Integer commentCount;
}
