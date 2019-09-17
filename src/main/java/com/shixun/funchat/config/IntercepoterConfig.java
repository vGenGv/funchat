package com.shixun.funchat.config;


import com.shixun.funchat.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class IntercepoterConfig implements WebMvcConfigurer {

    /**
     * 注册拦截器
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        LoginInterceptor loginInterceptor = new LoginInterceptor();
        // addPathPatterns 添加拦截url，excludePathPatterns 排除拦截url
        registry.addInterceptor(
                new LoginInterceptor()
        ).addPathPatterns("/**").excludePathPatterns(loginInterceptor.getUrl());
        WebMvcConfigurer.super.addInterceptors(registry);
    }

}
