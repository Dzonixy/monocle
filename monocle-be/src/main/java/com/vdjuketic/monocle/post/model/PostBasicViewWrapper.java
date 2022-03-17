package com.vdjuketic.monocle.post.model;

import java.util.List;

import lombok.Data;

@Data
public class PostBasicViewWrapper {
	private List<PostBasicView> posts;

	public PostBasicViewWrapper(List<PostBasicView> posts) {
		this.posts = posts;
	}
}
