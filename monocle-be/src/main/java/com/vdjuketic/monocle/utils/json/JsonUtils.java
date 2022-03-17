package com.vdjuketic.monocle.utils.json;

import java.util.HashMap;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

public class JsonUtils {

    public static String getFieldFromJson(String json, String field) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(json);
            return jsonNode.get(field).asText();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String objectToJson(Object object) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static <T> T fromJson(String json, Class<T> type) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(json, type);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static HashMap<String, Object> fromJsonToMap(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            MapType mapType = TypeFactory.defaultInstance().constructMapType(HashMap.class, String.class, Object.class);
            return objectMapper.readValue(json, mapType);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }
}
