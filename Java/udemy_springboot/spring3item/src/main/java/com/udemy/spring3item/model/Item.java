package com.udemy.spring3item.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "m_item")

public class Item {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long itemId;
    private String itemName;
    private String itemCategory;

    public Item() {

    }

    public Item(String itemName, String itemCategory) {

        //this.itemId = itemId;
        this.itemName = itemName;
        this.itemCategory = itemCategory;
    }

    public Long getItemId() {
        return itemId;
    }
    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }
    public String getItemName() {
        return itemName;
    }
    public void setItemName(String itemName) {
        this.itemName = itemName;
    }
    public String getItemCategory() {
        return itemCategory;
    }
    public void setItemCategory(String itemCategory) {
        this.itemCategory = itemCategory;
    }
    
}
