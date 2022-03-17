package com.vdjuketic.monocle.user;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import com.vdjuketic.monocle.post.model.Likes;
import com.vdjuketic.monocle.user.model.Following;
import com.vdjuketic.monocle.utils.entity.BaseEntity;
import com.vdjuketic.monocle.utils.json.JsonUtils;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "profile")
@EqualsAndHashCode(callSuper = true)
public class User extends BaseEntity {

	@Column(name = "user_name", unique = true, nullable = false)
	private String userName;

	@Column(name = "handle", unique = true, nullable = false)
	private String handle;

	@Column(name = "profile_image")
	private String profileImage;

	private String following;

	@Enumerated(EnumType.STRING)
	private Role role;

	public List<String> getFollowing(){
		return JsonUtils.fromJson(following, Following.class).getFollowing();
	}

	public void follow(String userId){
		Following currentFollowing = JsonUtils.fromJson(following, Following.class);
		currentFollowing.addFollow(userId);
		this.following = JsonUtils.objectToJson(currentFollowing);
	}
}
