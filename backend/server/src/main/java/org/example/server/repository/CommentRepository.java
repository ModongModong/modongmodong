package org.example.server.repository;

import org.example.server.entities.Comment;
import org.example.server.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
}