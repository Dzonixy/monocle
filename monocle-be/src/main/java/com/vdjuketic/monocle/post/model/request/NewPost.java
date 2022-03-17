package com.vdjuketic.monocle.post.model.request;

import lombok.Data;

@Data
public class NewPost {
	private String poster;
	private String title;
	//private byte[] image;
	private String description;
}
