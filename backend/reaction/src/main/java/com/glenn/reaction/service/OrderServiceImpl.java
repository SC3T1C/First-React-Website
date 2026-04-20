package com.glenn.reaction.service;

import com.glenn.reaction.entity.OrderEntity;
import com.glenn.reaction.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public List<OrderEntity> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public OrderEntity create(OrderEntity order) {
        return orderRepository.save(order);
    }
}
