package com.vdjuketic.monocle.post;

import java.time.LocalDateTime;
import java.util.Collections;

import com.vdjuketic.monocle.post.model.Likes;
import com.vdjuketic.monocle.utils.json.JsonUtils;

public class PostFactory {

	public static Post createDefault(String poster, String title, String image,
			String description){
		Likes likes = new Likes();
		likes.setLikes(Collections.emptyList());

		Post post = new Post();
		post.setPoster(poster);
		post.setOwner(poster);
		post.setTitle(title);
		post.setImage("https://staticsmartlife.mondo.rs/Picture/66492/jpeg/Shiba-Inu" +
						".jpeg");
		post.setDescription(description);
		post.setLikes(JsonUtils.objectToJson(likes));
		post.setOnSale(false);
		post.setDatePosted(LocalDateTime.now());
		return post;
	}
}
