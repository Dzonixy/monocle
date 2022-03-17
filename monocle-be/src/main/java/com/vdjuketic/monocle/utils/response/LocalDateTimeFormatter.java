package com.vdjuketic.monocle.utils.response;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class LocalDateTimeFormatter extends StdSerializer<LocalDateTime> {
    private static final long serialVersionUID = -7079125683078983813L;

    public LocalDateTimeFormatter() {
        this(null);
    }

    public LocalDateTimeFormatter(Class<LocalDateTime> t) {
        super(t);
    }

    @Override
    public void serialize(LocalDateTime value, JsonGenerator gen, SerializerProvider arg2) throws IOException {
        gen.writeNumber(value.toEpochSecond(ZoneOffset.UTC));
    }

}
