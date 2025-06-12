package com.example.spring_project.dto;

import java.util.List;

public class OrderHistoryResponse {
    private List<OrderDTO> content;
    private PageableDTO pageable;
    public OrderHistoryResponse(){
    }

    public OrderHistoryResponse(List<OrderDTO> content, PageableDTO pageable) {
        this.content = content;
        this.pageable = pageable;
    }

    public List<OrderDTO> getContent() {
        return content;
    }

    public void setContent(List<OrderDTO> content) {
        this.content = content;
    }

    public PageableDTO getPageable() {
        return pageable;
    }

    public void setPageable(PageableDTO pageable) {
        this.pageable = pageable;
    }

    
    
}
