package com.vdjuketic.monocle.utils.exception;

import com.vdjuketic.monocle.utils.response.Message;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.commons.lang3.StringUtils;

@Data
@EqualsAndHashCode(callSuper = true)
public abstract class AbstractApiException extends RuntimeException {
    private static final long serialVersionUID = 6571853078897541422L;

    private String code;
    private String        description;
    private Message.Level level = Message.Level.INFO;

    @Override
    public String getMessage() {
        if(StringUtils.isEmpty(super.getMessage())){
            return this.getDescription();
        }

        return super.getMessage();
    }
}
