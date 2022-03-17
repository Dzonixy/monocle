package com.vdjuketic.monocle.user;

import com.vdjuketic.monocle.user.model.request.FollowRequest;
import com.vdjuketic.monocle.utils.exception.AbstractApiException;
import com.vdjuketic.monocle.utils.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	private final UserFacade userFacade;

	@GetMapping
	public ResponseEntity<?> getAllUsers(){
		try {
			return Response.of(userFacade.getAllUsers());
		} catch (AbstractApiException e) {
			log.warn(e.getMessage());
			return Response.ofException(e, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getBasicInfo(@PathVariable String id){
		try {
			return Response.of(userFacade.getUserBasic(id));
		} catch (AbstractApiException e) {
			log.warn(e.getMessage());
			return Response.ofException(e, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{id}/followers")
	public ResponseEntity<?> getFollowers(@PathVariable String id){
		try {
			return Response.of(userFacade.getFollowers(id));
		} catch (AbstractApiException e) {
			log.warn(e.getMessage());
			return Response.ofException(e, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{id}/following")
	public ResponseEntity<?> getFollowing(@PathVariable String id){
		try {
			return Response.of(userFacade.getFollowing(id));
		} catch (AbstractApiException e) {
			log.warn(e.getMessage());
			return Response.ofException(e, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/follow")
	public ResponseEntity<?> followUser(@RequestBody FollowRequest followRequest){
		try {
			userService.followUser(followRequest.getFollowerId(),
					followRequest.getFollowingId());
			return Response.of(HttpStatus.OK);
		} catch (AbstractApiException e) {
			log.warn(e.getMessage());
			return Response.ofException(e, HttpStatus.BAD_REQUEST);
		}
	}
}
