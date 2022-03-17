package com.vdjuketic.monocle.utils.response;

import java.util.Collections;
import java.util.List;

import com.vdjuketic.monocle.utils.exception.AbstractApiException;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Data
@RequiredArgsConstructor
public class Response<T> {
	private T             data;
	private Metadata      meta;
	private List<Message> messages;

	public static ResponseEntity<?> ofException(AbstractApiException exception,
			HttpStatus status) {
		Response<Void> response = new Response<>();
		response.setMessages(Collections.singletonList(Message.of(exception)));
		return ResponseEntity.status(status).body(response);
	}

	public static ResponseEntity<?> ofException(AbstractApiException exception) {
		return ofException(exception, HttpStatus.BAD_REQUEST);
	}

	public static <T> ResponseEntity<?> of(T data) {
		Response<T> response = new Response<>();
		response.setData(data);
		return ResponseEntity.ok(response);
	}

	public static <T> ResponseEntity<?> of(T data, Page<?> page) {
		Response<T> response = new Response<>();
		response.setData(data);
		response.setMeta(Metadata.of(page));
		return ResponseEntity.ok(response);
	}
}
