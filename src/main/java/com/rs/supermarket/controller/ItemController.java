package com.rs.supermarket.controller;

import com.rs.supermarket.model.Item;
import com.rs.supermarket.model.Product;
import com.rs.supermarket.service.ItemService;
import com.rs.supermarket.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api")
public class ItemController {

    @Autowired
    private ItemService itemService;
    private ProductService productService;

    public ItemController(ItemService itemService, ProductService productService) {
        this.itemService = itemService;
        this.productService = productService;
    }

    @PostMapping("/item/create")
    public Item create(@RequestBody Item item){
        Optional<Product> product = productService.findById(item.getProduct_id());
        product.get().setQuantity(product.get().getQuantity()-item.getQuantity());
        productService.save(product.get());
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

    @GetMapping("/item/get-order-totalcost")
    public Integer getTotalCostByOrderId(@RequestParam(name="order_id") int order_id){
        return (Integer) itemService.getTotalCostByOrderId(order_id);
    }

    @PutMapping("/item/update")
    public void update(@RequestBody Item item){
        itemService.save(item);
    }

}
