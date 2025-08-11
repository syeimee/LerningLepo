package com.udemy.spring1hello1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// 最上位クラスに@SpringBootApplicationをつけることでspringbootに認識される
@SpringBootApplication
public class Spring1hello1Application {

	public static void main(String[] args) {
		SpringApplication.run(Spring1hello1Application.class, args);
	}

}
