package com.vdjuketic.monocle.post.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.vdjuketic.monocle.post.Post;
import com.vdjuketic.monocle.utils.response.LocalDateTimeFormatter;
import lombok.Data;

@Data
public class PostBasicView implements Serializable {
	private static final long serialVersionUID = -7041993476381564667L;

	private String postId;
	private String poster;
	private String owner;
	private String title;
	private String description;
	private String       image;
	private List<String> likes;
	private Boolean      onSale;
	private BigDecimal price;

	@JsonSerialize(using = LocalDateTimeFormatter.class)
	private LocalDateTime datePosted;

	public static PostBasicView of(Post post){
		PostBasicView view = new PostBasicView();
		view.setPostId(post.getId());
		view.setPoster(post.getPoster());
		view.setOwner(post.getOwner());
		view.setTitle(post.getTitle());
		view.setDescription(post.getDescription());
		view.setImage(post.getImage());
		view.setLikes(post.getLikes());
		view.setOnSale(post.getOnSale());
		view.setPrice(post.getPrice());
		view.setDatePosted(post.getDatePosted());
		return view;
	}
}
