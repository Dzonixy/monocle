package com.vdjuketic.monocle.post.tags;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.vdjuketic.monocle.utils.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "tag")
@EqualsAndHashCode(callSuper = true)
public class Tag extends BaseEntity {

	private String name;
}
