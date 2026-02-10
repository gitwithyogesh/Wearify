package com.example.wearify.controller;

import com.example.wearify.model.Address;
import com.example.wearify.model.Order;
import com.example.wearify.model.Product;
import com.example.wearify.model.User;
import com.example.wearify.model.enums.OrderStatus;
import com.example.wearify.repository.AddressRepository;
import com.example.wearify.repository.OrderRepository;
import com.example.wearify.repository.ProductRepository;
import com.example.wearify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private AddressRepository addressRepository;

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return orderRepository.findByUser(user);
        }
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> order = orderRepository.findById(id);
        return order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestParam Long userId, @RequestParam Long productId,
            @RequestParam Integer quantity, @RequestParam Long addressId) {
        User user = userRepository.findById(userId).orElse(null);
        Product product = productRepository.findById(productId).orElse(null);
        Address address = addressRepository.findById(addressId).orElse(null);

        if (user != null && product != null && address != null) {
            Order order = new Order();
            order.setUser(user);
            order.setProduct(product);
            order.setQuantity(quantity);
            order.setTotalPrice(product.getPrice() * quantity);
            order.setOrderDate(LocalDateTime.now());
            order.setStatus(OrderStatus.PENDING);
            order.setAddress(address);
            return ResponseEntity.ok(orderRepository.save(order));
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestParam OrderStatus status) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent()) {
            Order existingOrder = order.get();
            existingOrder.setStatus(status);
            return ResponseEntity.ok(orderRepository.save(existingOrder));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/status/{status}")
    public List<Order> getOrdersByStatus(@PathVariable OrderStatus status) {
        return orderRepository.findByStatus(status);
    }
}
