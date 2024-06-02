package com.rs.supermarket.controller;

import com.rs.supermarket.model.Order;
import com.rs.supermarket.model.Statistic;
import com.rs.supermarket.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/statistic")
public class StatisticController {
    @Autowired
    private StatisticService statisticService;

    @GetMapping("/getAllByTime")
    public List<Statistic> getAllByTime(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){
        return statisticService.getAllByTime(startDate, endDate);
    }

}
