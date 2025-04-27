package com.Learning.JapoApp.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Data
@Getter
@Setter
public class PageResponse<T> {
    private List<T> content;
    private int page;
    private int size;
    private long totalElements;

    public PageResponse(List<T> content, int size, int page, long totalElements) {
        this.content = content;
        this.size = size;
        this.page = page;
        this.totalElements = totalElements;
    }

    public PageResponse() {
    }
    // Constructor, getters y setters
}
