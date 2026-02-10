package com.example.wearify.controller;

import com.example.wearify.model.Cart;
import com.example.wearify.model.Product;
import com.example.wearify.model.User;
import com.example.wearify.repository.CartRepository;
import com.example.wearify.repository.ProductRepository;
import com.example.wearify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/user/{userId}")
    public List<Cart> getCartByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return cartRepository.findByUser(user);
        }
        return null;
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestParam Long userId, @RequestParam Long productId,
            @RequestParam Integer quantity) {
        User user = userRepository.findById(userId).orElse(null);
        Product product = productRepository.findById(productId).orElse(null);

        if (user != null && product != null) {
            Cart existingCart = cartRepository.findByUserAndProduct(user, product);
            if (existingCart != null) {
                existingCart.setQuantity(existingCart.getQuantity() + quantity);
                return ResponseEntity.ok(cartRepository.save(existingCart));
            } else {
                Cart cart = new Cart();
                cart.setUser(user);
                cart.setProduct(product);
                cart.setQuantity(quantity);
                return ResponseEntity.ok(cartRepository.save(cart));
            }
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCartQuantity(@PathVariable Long id, @RequestParam Integer quantity) {
        Optional<Cart> cart = cartRepository.findById(id);
        if (cart.isPresent()) {
            Cart existingCart = cart.get();
            existingCart.setQuantity(quantity);
            return ResponseEntity.ok(cartRepository.save(existingCart));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long id) {
        if (cartRepository.existsById(id)) {
            cartRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
