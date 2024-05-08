package com.rs.supermarket.service.impl;

import com.rs.supermarket.model.Item;
import com.rs.supermarket.repository.ItemRepository;
import com.rs.supermarket.service.ItemService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {
    private ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public List<Item> findByOrderId(int order_id) {
        return itemRepository.searchItem(order_id);
    }

    @Override
    public Item save(Item Item) {
        return itemRepository.save(Item);
    }

    @Override
    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    @Override
    public Optional<Item> findById(int id) {
        return itemRepository.findById(id);
    }

    @Override
    public Integer getTotalCostByOrderId(int order_id){
        return (Integer) itemRepository.getTotalCostByOrderId(order_id);
    }

    @Override
    public void saveAll(List<Item> items){
        itemRepository.saveAll(items);
    }
}
