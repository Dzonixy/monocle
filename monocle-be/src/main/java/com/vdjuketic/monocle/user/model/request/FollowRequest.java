package com.vdjuketic.monocle.user.model.request;

import lombok.Data;

@Data
public class FollowRequest {
	private String followerId;
	private String followingId;
}
