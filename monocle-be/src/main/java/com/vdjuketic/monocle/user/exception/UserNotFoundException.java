package com.vdjuketic.monocle.user.exception;

import com.vdjuketic.monocle.utils.exception.AbstractApiException;
import com.vdjuketic.monocle.utils.response.Message;

public class UserNotFoundException extends AbstractApiException {
	private static final long serialVersionUID = -2119128864619851178L;

	public static final String INVALID_CODE = "user.null";

	public static UserNotFoundException getDefault() {
		UserNotFoundException ex = new UserNotFoundException();
		ex.setCode(INVALID_CODE);
		ex.setDescription("User not found!");
		ex.setLevel(Message.Level.WARNING);
		return ex;
	}
}
