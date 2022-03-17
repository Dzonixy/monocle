package com.vdjuketic.monocle.post;

import java.util.List;
import java.util.Set;

import com.vdjuketic.monocle.post.tags.Tag;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends CrudRepository<Post, String> {

	List<Post> findByPoster(String poster);

	List<Post> findByPosterInOrderByDatePosted(List<String> posterList);

	List<Post> findByTagsIn(Set<Tag> tags);
}
