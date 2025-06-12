package com.udemy.spring1hello1.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class HelloController {

    @GetMapping(value = "/")
    public String index() {
        return "アクセス成功です。";
    }
    
    @GetMapping(value = "/hello")
    public String hello() {
        return "Hello World!";
    }

    @GetMapping(value = "/welcome")
    public String welcome() {
        return "SPRING BOOTにようこそ";
    }
}
