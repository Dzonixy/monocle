package com.vdjuketic.monocle.user;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, String> {

	List<User> findByIdIn(List<String> ids);

	List<User> findByFollowingContaining(String id);

	boolean existsById(String id);
}
