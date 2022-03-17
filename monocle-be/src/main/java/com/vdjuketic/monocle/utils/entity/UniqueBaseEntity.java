package com.vdjuketic.monocle.utils.entity;

import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@MappedSuperclass
@EqualsAndHashCode(callSuper = true)
public class UniqueBaseEntity extends BaseEntity {

	@Column(name = "uid", unique = true, nullable = false)
	private String uid;

	public void generateUID() {
		this.setUid(UUID.randomUUID().toString());
	}

	@PrePersist
	public void checkForUid() {
		if (this.uid == null) {
			generateUID();
		}
	}

}
