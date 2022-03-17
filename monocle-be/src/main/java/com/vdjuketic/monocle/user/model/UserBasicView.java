package com.vdjuketic.monocle.user.model;

import java.io.Serializable;
import java.util.List;

import com.vdjuketic.monocle.user.Role;
import com.vdjuketic.monocle.user.User;
import lombok.Data;

@Data
public class UserBasicView implements Serializable {
	private static final long serialVersionUID = -2730955326141805815L;

	private String id;
	private String username;
	private String handle;
	private String       profileImage;
	private List<String> followers;
	private Role         role;

	public static UserBasicView of(User user){
		UserBasicView view = new UserBasicView();
		view.setId(user.getId());
		view.setUsername(user.getUserName());
		view.setHandle(user.getHandle());
		view.setProfileImage(user.getProfileImage());
		view.setFollowers(user.getFollowing());
		view.setRole(user.getRole());
		return view;
	}
}
