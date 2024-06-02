package com.rs.supermarket.service;

import com.rs.supermarket.model.Statistic;
import org.springframework.stereotype.Service;

import java.util.List;

public interface StatisticService {
    List<Statistic> getAllByTime(String startDate, String endDate);
}
