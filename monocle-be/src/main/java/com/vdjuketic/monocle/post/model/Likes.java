package com.vdjuketic.monocle.post.model;

import java.util.List;

import lombok.Data;

@Data
public class Likes {
	private List<String> likes;

	public void addLike(String userId){
		if(!likes.contains(userId)) {
			this.likes.add(userId);
		} else {
			this.likes.remove(userId);
		}
	}
}
