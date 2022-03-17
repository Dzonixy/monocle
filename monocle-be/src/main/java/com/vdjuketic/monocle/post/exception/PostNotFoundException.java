package com.vdjuketic.monocle.post.exception;

import com.vdjuketic.monocle.utils.exception.AbstractApiException;
import com.vdjuketic.monocle.utils.response.Message;

public class PostNotFoundException extends AbstractApiException {
	private static final long serialVersionUID = -2959615150389342399L;

	public static final String INVALID_CODE = "post.null";

	public static PostNotFoundException getDefault() {
		PostNotFoundException ex = new PostNotFoundException();
		ex.setCode(INVALID_CODE);
		ex.setDescription("Post not found!");
		ex.setLevel(Message.Level.WARNING);
		return ex;
	}
}
