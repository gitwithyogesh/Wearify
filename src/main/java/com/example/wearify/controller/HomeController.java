package com.example.wearify.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/mens")
    public String mens() {
        return "mens";
    }

    @GetMapping("/womens")
    public String womens() {
        return "womens";
    }

    @GetMapping("/accessories")
    public String accessories() {
        return "accessories";
    }

    @GetMapping("/shoes")
    public String shoes() {
        return "shoes";
    }

    @GetMapping("/about")
    public String about() {
        return "about";
    }

    @GetMapping("/checkout")
    public String checkout() {
        return "checkout";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }
}
