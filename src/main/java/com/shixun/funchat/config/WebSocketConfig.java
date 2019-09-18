package com.shixun.funchat.config;

import com.shixun.funchat.controller.WebSocketController;
import com.shixun.funchat.interceptor.WebSocketInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

/**
 * WebSocket 配置类
 */
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(myHandler(),"/websocket").addInterceptors(myInterceptors());
    }

    @Bean
    public WebSocketController myHandler(){
        return new WebSocketController();
    }

    @Bean
    public WebSocketInterceptor myInterceptors(){
        return new WebSocketInterceptor();
    }
}
