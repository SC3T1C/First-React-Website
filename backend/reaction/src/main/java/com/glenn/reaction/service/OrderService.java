package com.glenn.reaction.service;

import com.glenn.reaction.entity.OrderEntity;

import java.util.List;

public interface OrderService {

    List<OrderEntity> findAll();

    OrderEntity create(OrderEntity order);
}
