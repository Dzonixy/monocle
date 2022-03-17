package com.vdjuketic.monocle.user.model;

import java.util.List;

import lombok.Data;

@Data
public class Following {
	private List<String> following;

	public void addFollow(String userId){
		this.following.add(userId);
	}
}
