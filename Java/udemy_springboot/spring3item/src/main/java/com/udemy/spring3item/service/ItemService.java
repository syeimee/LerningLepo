package com.udemy.spring3item.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import com.udemy.spring3item.model.Item;
import com.udemy.spring3item.repo.ItemRepository;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    @Cacheable("getItems")
    public List<Item> getAllItems(){
        List<Item> allItems = new ArrayList<>();

        //キャッシュが使用されなければ3秒待機する
        try{
            Thread.sleep(3000);
        }catch(Exception e){
            e.printStackTrace();
        }

        //findAllで撮ってきたデータをallItemsにaddする
        itemRepository.findAll().forEach(allItems::add);
        return allItems;
    }

    @Cacheable(value="getItem", key="#p0")
    //allItemsからItemクラスメソッドを使用してitemIdが等しくなる商品を探す
    public Optional<Item> getItem(Long itemId){

        //キャッシュが使用されなければ3秒待機する
        try{
            Thread.sleep(3000);
        }catch(Exception e){
            e.printStackTrace();
        }

        return itemRepository.findById(itemId);
    }

    @CacheEvict(value="getItems", allEntries = true)
    public void addItem(Item item){
        itemRepository.save(item);
    }

    @Caching(evict = {
        @CacheEvict(value="getItem", key="#p0"),
        @CacheEvict(value="getItems", allEntries=true)
    })
    public void updateItem(Item item, Long itemId){
        if(itemRepository.findById(itemId).get() != null){
            itemRepository.save(item);
        }
    }

    @Caching(evict = {
        @CacheEvict(value="getItem", key="#p0"),
        @CacheEvict(value="getItems", allEntries=true)
    })
    public void deleteItem(Long itemId){
        itemRepository.deleteById(itemId);
    }
}
