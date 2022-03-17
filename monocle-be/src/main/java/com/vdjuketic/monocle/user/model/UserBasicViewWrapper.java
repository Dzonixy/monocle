package com.vdjuketic.monocle.user.model;

import java.util.List;

import lombok.Data;

@Data
public class UserBasicViewWrapper {
	List<UserBasicView> users;

	public UserBasicViewWrapper(List<UserBasicView> users) {
		this.users = users;
	}
}
