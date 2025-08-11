package com.udemy.spring3item.exception;

public class ItemNotFoundException extends RuntimeException{

    //決まり文句
    private static final long serialVersionUID = 1L;

    public ItemNotFoundException(Long itemId){
        super("商品コード:" + itemId + "は見つかりません"); 
    }
}

