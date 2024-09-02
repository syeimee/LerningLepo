package com.example.spring_mvc_demoapp.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * CRUDアプリケーションのコントローラ
 * <p>
 * 今回はDBを使用しないので、メモリ内にアイテムを保持させ、アイテムの追加・表示・削除・更新を実装する。
 * </p>
 */

@Controller //Controllerにはアノテーションをつける
@RequestMapping("/items")
public class ItemController {

    //メモリ内にアイテムを保持させる
    private List<String> items = new ArrayList<>();

    /**
     * 新規作成メソッド（追加）
     * @param item 追加するアイテムの名前
     * @param model モデルにアイテムのリストを追加するためのオブジェクト
     * @return　アイテム一覧を表示するビューの名前
     */
    @PostMapping("/add")
    public String addItem(@RequestParam String item, Model model){
        System.out.println(item);
        items.add(item);
        model.addAttribute("items", items);
        System.out.println(items);
        return "redirect:/items/";     
    }

    /**
     * 一覧表示メソッド（表示）
     * @param model　モデルにアイテムのリストを追加するためのオブジェクト
     * @return　アイテム一覧を表示するビューの名前
     */
    @GetMapping("/")
    public String getItems(Model model) {
        model.addAttribute("item", items);
        return "items";
    }

    /**
     * 更新メソッド
     * @param id 更新するアイテムのid(0~)
     * @param newItem 更新するアイテム名
     * @param model モデルにアイテムのリストを追加するためのオブジェクト
     * @return　アイテム一覧を表示するビューの名前
     */
    @PostMapping("/update/{id}")
    public String updateItem(@PathVariable int id, @RequestParam String newItem,Model model) {

        if(id >= 0 && id <= items.size()){
            items.set(id,newItem);
        }

        model.addAttribute("item",items);
        return "items";
    }
    
    /**
     * 削除メソッド
     * @param id 削除するアイテムのid(0~)
     * @param model モデルにアイテムのリストを追加するためのオブジェクト
     * @return アイテム一覧を表示するビューの名前
     */
    @PostMapping("/delete/{id}")
    public String deleteItem(@PathVariable int id, Model model) {

        if(id >= 0 && id <= items.size()){
            items.remove(id);
        }

        model.addAttribute("item", items);
        return "items";
    }

}
