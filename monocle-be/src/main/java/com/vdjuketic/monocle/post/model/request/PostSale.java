package com.vdjuketic.monocle.post.model.request;

import java.math.BigDecimal;
import java.util.List;

import com.vdjuketic.monocle.post.tags.Tag;
import lombok.Data;

@Data
public class PostSale {
	private BigDecimal price;
	private List<Tag>  tags;
}
