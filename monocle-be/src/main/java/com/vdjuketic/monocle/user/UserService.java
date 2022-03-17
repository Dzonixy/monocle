package com.vdjuketic.monocle.user;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.vdjuketic.monocle.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;

	public List<User> getAllUsers() {
		List<User> userList = new ArrayList<>();
		userRepository.findAll().forEach(userList::add);
		return userList;
	}

	public List<User> getUsersByIds(List<String> ids){
		return userRepository.findByIdIn(ids);
	}

	public User getUser(String id){
		Optional<User> optionalUser = userRepository.findById(id);
		if (optionalUser.isPresent()) {
			return optionalUser.get();
		}

		throw UserNotFoundException.getDefault();
	}

	public boolean userExists(String id){
		return userRepository.existsById(id);
	}

	public void followUser(String followerId, String followingId){
		User follower = getUser(followerId);
		follower.follow(followingId);
		userRepository.save(follower);
	}

	public List<String> getUserFollowing(String id) {
		User user = getUser(id);
		return user.getFollowing();
	}

	public List<User> getUserFollowers(String id) {
		return userRepository.findByFollowingContaining(id);
	}
}
