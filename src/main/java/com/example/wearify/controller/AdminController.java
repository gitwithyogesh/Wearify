package com.example.wearify.controller;

import com.example.wearify.model.Product;
import com.example.wearify.model.Order;
import com.example.wearify.model.User;
import com.example.wearify.repository.ProductRepository;
import com.example.wearify.repository.OrderRepository;
import com.example.wearify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    // ==================== DASHBOARD ====================
    @GetMapping
    public String adminDashboard(Model model) {
        long totalProducts = productRepository.count();
        long totalOrders = orderRepository.count();
        long totalUsers = userRepository.count();

        model.addAttribute("totalProducts", totalProducts);
        model.addAttribute("totalOrders", totalOrders);
        model.addAttribute("totalUsers", totalUsers);

        return "admin/dashboard";
    }

    // ==================== PRODUCT MANAGEMENT ====================
    @GetMapping("/products")
    public String viewProducts(Model model) {
        List<Product> products = productRepository.findAll();
        model.addAttribute("products", products);
        return "admin/product/view_product";
    }

    @GetMapping("/products/add")
    public String addProductForm(Model model) {
        model.addAttribute("product", new Product());
        return "admin/product/add_product";
    }

    @PostMapping("/products/add")
    public String addProduct(@ModelAttribute Product product) {
        productRepository.save(product);
        return "redirect:/admin/products";
    }

    @GetMapping("/products/update/{id}")
    public String updateProductForm(@PathVariable Long id, Model model) {
        Product product = productRepository.findById(id).orElse(null);
        model.addAttribute("product", product);
        return "admin/product/update_product";
    }

    @PostMapping("/products/update")
    public String updateProduct(@ModelAttribute Product product) {
        productRepository.save(product);
        return "redirect:/admin/products";
    }

    @GetMapping("/products/delete/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return "redirect:/admin/products";
    }

    // ==================== ORDER MANAGEMENT ====================
    @GetMapping("/orders")
    public String viewOrders(Model model) {
        List<Order> orders = orderRepository.findAll();
        model.addAttribute("orders", orders);
        return "admin/order/view_order";
    }

    @GetMapping("/orders/update/{id}")
    public String updateOrderForm(@PathVariable Long id, Model model) {
        Order order = orderRepository.findById(id).orElse(null);
        model.addAttribute("order", order);
        return "admin/order/update_order";
    }

    @PostMapping("/orders/update")
    public String updateOrder(@ModelAttribute Order order) {
        orderRepository.save(order);
        return "redirect:/admin/orders";
    }

    @GetMapping("/orders/delete/{id}")
    public String deleteOrder(@PathVariable Long id) {
        orderRepository.deleteById(id);
        return "redirect:/admin/orders";
    }

    // ==================== USER MANAGEMENT ====================
    @GetMapping("/users")
    public String viewUsers(Model model) {
        List<User> users = userRepository.findAll();
        model.addAttribute("users", users);
        return "admin/user/view_user";
    }

    @GetMapping("/users/add")
    public String addUserForm(Model model) {
        model.addAttribute("user", new User());
        return "admin/user/add_user";
    }

    @PostMapping("/users/add")
    public String addUser(@ModelAttribute User user) {
        userRepository.save(user);
        return "redirect:/admin/users";
    }

    @GetMapping("/users/update/{id}")
    public String updateUserForm(@PathVariable Long id, Model model) {
        User user = userRepository.findById(id).orElse(null);
        model.addAttribute("user", user);
        return "admin/user/update_user";
    }

    @PostMapping("/users/update")
    public String updateUser(@ModelAttribute User user) {
        userRepository.save(user);
        return "redirect:/admin/users";
    }

    @GetMapping("/users/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return "redirect:/admin/users";
    }
}
