package com.example.spring_project.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration //springの設定クラスと認識させ、implements WebMvcConfigurerでMVCの設定をカスタマイズする
public class WebConfig implements WebMvcConfigurer{

    /**
     * CORS設定
     */
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/api/**")//apiで始まるエンドポイントに対して以下の設定を適用
                .allowedOrigins("https://localhost:4200") //どこからのリクエストを許可するか
                .allowedMethods("GET","POST","PUT","DELETE","OPTIONS"); //どのメソッドを許可するか
    }
}
