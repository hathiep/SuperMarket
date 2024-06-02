package com.rs.supermarket.service.impl;

import com.rs.supermarket.model.Statistic;
import com.rs.supermarket.repository.StatisticRepository;
import com.rs.supermarket.service.StatisticService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatisticServiceImpl implements StatisticService {
    private StatisticRepository statisticRepository;

    public StatisticServiceImpl(StatisticRepository statisticRepository) {
        this.statisticRepository = statisticRepository;
    }

    @Override
    public List<Statistic> getAllByTime(String startDate, String endDate) {
        return statisticRepository.getAllByTime(startDate, endDate);
    }
}
