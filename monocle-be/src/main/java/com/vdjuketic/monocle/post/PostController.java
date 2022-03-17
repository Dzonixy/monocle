package com.vdjuketic.monocle.post;

import java.util.Set;

import com.vdjuketic.monocle.post.model.request.BuyPost;
import com.vdjuketic.monocle.post.model.request.LikePost;
import com.vdjuketic.monocle.post.model.request.NewPost;
import com.vdjuketic.monocle.post.model.request.PostSale;
import com.vdjuketic.monocle.utils.exception.AbstractApiException;
import com.vdjuketic.monocle.utils.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostController {

	private final PostFacade postFacade;
	private final PostService postService;

	@GetMapping
	public ResponseEntity<?> getAllPosts(){
		try {
			return Response.of(postFacade.getAllPosts());
		} catch (AbstractApiException e) {
			log.warn(e.getMessage());
			return Response.ofException(e, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getPostById(@PathVariable String id){
		try {
			return Response.of(postFacade.getPost(id));
		} catch (AbstractApiException e) {
			log.warn(e.getMessage());
			return Response.ofException(e, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/tags/{tags}")
	public ResponseEntity<?> getPostByTag(@PathVariable Set<String> tags){
		try {
			return Response.of(postFacade.getPostByTags(tags));
		} catch (AbstractApiException e) {
			log.warn(e.getMessage());
			return Response.ofException(e, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/user/{id}")
	public ResponseEntity<?> getLatestPostsForUser(@PathVariable String id){
		try {
			return Response.of(postFacade.getLatestPostsForUser(id));
		} catch (AbstractApiException e) {
			log.warn(e.getMessage());
			return Response.ofException(e, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/{id}/buy")
	public ResponseEntity<?> buyPost(@RequestBody BuyPost buyPost,
			@PathVariable String id){
		try {
			return Response.of(postFacade.buyPost(id, buyPost.getBuyerId()));
		} catch (AbstractApiException e) {
			log.warn(e.getMessage());
			return Response.ofException(e, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping
	public ResponseEntity<?> addNewPost(@RequestBody NewPost newPost){
		try {
			return Response.of(postFacade.addNewPost(newPost.getPoster(), newPost.getTitle(),
					newPost.getDescription()));
		} catch (AbstractApiException e) {
			log.warn(e.getMessage());
			return Response.ofException(e, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/{id}/sale")
	public ResponseEntity<?> putPostOnSale(@RequestBody PostSale postSale,
			@PathVariable String id){
		try {
			postService.putPostOnSale(id, postSale.getPrice(),
					postSale.getTags());
			return Response.of(HttpStatus.OK);
		} catch (AbstractApiException e) {
			log.warn(e.getMessage());
			return Response.ofException(e, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/{id}/like")
	public ResponseEntity<?> likePost(@PathVariable String id,
			@RequestBody LikePost likePost){
		try {
			return Response.of(postFacade.likePost(id, likePost.getUserId()));
		} catch (AbstractApiException e) {
			log.warn(e.getMessage());
			return Response.ofException(e, HttpStatus.BAD_REQUEST);
		}
	}
}
