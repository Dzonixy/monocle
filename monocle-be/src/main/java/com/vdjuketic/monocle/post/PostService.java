package com.vdjuketic.monocle.post;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.vdjuketic.monocle.post.exception.PostNotFoundException;
import com.vdjuketic.monocle.post.tags.Tag;
import com.vdjuketic.monocle.post.tags.TagRepository;
import com.vdjuketic.monocle.user.UserService;
import com.vdjuketic.monocle.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostService {

	private final UserService userService;

	private final PostRepository postRepository;
	private final TagRepository  tagRepository;

	public Post addNewPost(String poster, String title, String description) {
		Post post = PostFactory.createDefault(poster, title, "", description);
		return postRepository.save(post);
	}

	public Post buyPost(String postId, String buyerId) {
		Post post = getPostById(postId);
		post.setOwner(buyerId);
		post.setOnSale(false);
		post.setPrice(null);
		return postRepository.save(post);
	}

	public List<Post> getAllPosts() {
		List<Post> allPosts = new ArrayList<>();
		postRepository.findAll().forEach(allPosts::add);
		return allPosts;
	}

	public Post getPostById(String id){
		Optional<Post> optionalPost = postRepository.findById(id);
		if(optionalPost.isPresent()){
			return optionalPost.get();
		}

		throw PostNotFoundException.getDefault();
	}

	public List<Post> getPostsByTags(Set<String> tags) {
		Set<Tag> tagsObjects = new HashSet<>();
		tagRepository.findAllById(tags).forEach(tagsObjects::add);
		return postRepository.findByTagsIn(tagsObjects);
	}

	public List<Post> getLatestPostsForUser(String id) {
		List<String> followingList = userService.getUserFollowing(id);
		return postRepository.findByPosterInOrderByDatePosted(followingList);
	}

	public Post likePost(String postId, String userId) {
		Post post = getPostById(postId);

		if(userService.userExists(userId)) {
			post.addLike(userId);
			return postRepository.save(post);
		}

		throw UserNotFoundException.getDefault();
	}

	public void putPostOnSale(String id, BigDecimal price, List<Tag> tags) {
		Post post = getPostById(id);
		post.setPrice(price);
		post.setOnSale(true);
		postRepository.save(post);
	}
}
