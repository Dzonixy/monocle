package com.vdjuketic.monocle.utils.response;

import com.vdjuketic.monocle.utils.exception.AbstractApiException;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Message {
    private final String key;
    private final String desc;
    private final Level level;

    public static Message of(AbstractApiException e){
        return new Message(e.getCode(), e.getDescription(), e.getLevel());
    }

    public enum Level{
        ERROR,
        WARNING,
        DEBUG,
        INFO
    }
}
