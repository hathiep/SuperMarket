package com.rs.supermarket.controller;

import com.rs.supermarket.model.Item;
import com.rs.supermarket.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api")
public class ItemController {

    @Autowired
    private ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }
    @PostMapping("/item/create")
    public Item create(@RequestBody Item item){
        return itemService.save(item);
    }

    @GetMapping("/items")
    public List<Item> getAll(){
        return itemService.findAll();
    }

    @GetMapping("/item")
    public Item getById(@RequestParam(name="id") int id){
        return (Item) itemService.findById(id).orElse(null);
    }

    @GetMapping("/items/search")
    public List<Item> searchItems(@RequestParam(name="order_id") int order_id){
        return itemService.findByOrderId(order_id);
    }

    @PutMapping("/item/update")
    public void update(@RequestBody Item item){
        itemService.save(item);
    }

}
