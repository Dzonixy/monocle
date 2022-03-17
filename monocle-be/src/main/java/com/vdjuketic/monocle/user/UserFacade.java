package com.vdjuketic.monocle.user;

import java.util.ArrayList;
import java.util.List;

import com.vdjuketic.monocle.user.model.UserBasicView;
import com.vdjuketic.monocle.user.model.UserBasicViewWrapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserFacade {

	private final UserService userService;

	public UserBasicViewWrapper getAllUsers() {
		List<User> users = userService.getAllUsers();
		List<UserBasicView> basicViewList = new ArrayList<>();

		for (User user: users) {
			basicViewList.add(UserBasicView.of(user));
		}

		return new UserBasicViewWrapper(basicViewList);
	}

	public UserBasicViewWrapper getFollowers(String id) {
		List<User> users = userService.getUserFollowers(id);
		List<UserBasicView> basicViewList = new ArrayList<>();

		for (User user: users) {
			basicViewList.add(UserBasicView.of(user));
		}

		return new UserBasicViewWrapper(basicViewList);
	}

	public UserBasicViewWrapper getFollowing(String id) {
		List<User> users = userService.getUsersByIds(userService.getUserFollowing(id));
		List<UserBasicView> basicViewList = new ArrayList<>();

		for (User user: users) {
			basicViewList.add(UserBasicView.of(user));
		}

		return new UserBasicViewWrapper(basicViewList);
	}

	public UserBasicView getUserBasic(String id) {
		User user = userService.getUser(id);
		return UserBasicView.of(user);
	}
}
