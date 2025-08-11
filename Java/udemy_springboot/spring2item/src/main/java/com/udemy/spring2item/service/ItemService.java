package com.udemy.spring2item.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.udemy.spring2item.model.Item;

@Service
public class ItemService {

    private List<Item> allItems = new ArrayList<>(Arrays.asList(
            new Item("10001","ネックレス","ジュエリ"),
            new Item("10002","パーカー","ファッション"),
            new Item("10003","フェイスクリーム","ビューティ"),
            new Item("10004","サプリメント","ヘルス"),
            new Item("10005","ブルーベリー","フード")));

    public List<Item> gettAllItems(){
        return allItems;
    }

    //allItemsからItemクラスメソッドを使用してitemIdが等しくなる商品を探す
    public Item getItem(String itemId){
        for(int i = 0; i < allItems.size(); i++){
            if(allItems.get(i).getItemId().equals(itemId)){
                return (Item)allItems.get(i);
            }
        }
        return null;
    }

    public void addItem(Item item){
        allItems.add(item);
    }

    public void updateItem(Item item, String itemId){
        for(int i = 0; i < allItems.size(); i++){
            if(allItems.get(i).getItemId().equals(itemId)){
                allItems.set(i,item);
            }
        }
    }

    public void deleteItem(String itemId){
        // for(int i = 0; i < allItems.size(); i++){
        //     if(allItems.get(i).getItemId().equals(itemId)){
        //         allItems.remove(i);
        //     }
        // }
        allItems.removeIf(i -> i.getItemId().equals(itemId));
    }
}
