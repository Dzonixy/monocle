package com.vdjuketic.monocle.post;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.vdjuketic.monocle.post.tags.Tag;
import com.vdjuketic.monocle.post.model.Likes;
import com.vdjuketic.monocle.user.model.Following;
import com.vdjuketic.monocle.utils.entity.BaseEntity;
import com.vdjuketic.monocle.utils.json.JsonUtils;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "post")
@EqualsAndHashCode(callSuper = true)
public class Post extends BaseEntity {

	private String poster;

	private String owner;

	private String title;

	private String image;

	private String description;

	@Column(name = "likes")
	private String likes;

	@Column(name = "on_sale")
	private Boolean onSale;

	private BigDecimal price;

	@Column(name = "date_posted")
	private LocalDateTime datePosted;

	@OneToMany(mappedBy = "id")
	private Set<Tag> tags;

	public List<String> getLikes(){
		return JsonUtils.fromJson(likes, Likes.class).getLikes();
	}

	public void addLike(String userId){
		Likes currentLikes = JsonUtils.fromJson(likes, Likes.class);
		currentLikes.addLike(userId);
		this.likes = JsonUtils.objectToJson(currentLikes);
	}
}
