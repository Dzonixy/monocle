package com.vdjuketic.monocle.utils.response;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;

@Data
@RequiredArgsConstructor
public class Metadata {
    private Integer pageSize;
    private Integer pageNumber;
    private Integer totalPages;
    private Long totalSize;

    public static Metadata of(Page<?> page){
        Metadata metadata = new Metadata();
        metadata.setPageSize(page.getNumberOfElements());
        metadata.setPageNumber(page.getNumber());
        metadata.setTotalPages(page.getTotalPages());
        return metadata;
    }
}
