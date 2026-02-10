package com.example.wearify.repository;

import com.example.wearify.model.Order;
import com.example.wearify.model.User;
import com.example.wearify.model.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);

    List<Order> findByStatus(OrderStatus status);
}
