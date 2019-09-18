package com.shixun.funchat.service;

import com.shixun.funchat.entity.User;

import javax.servlet.http.HttpSession;
import java.util.Map;

public interface UserService {

    //登录函数
    Map<String, String> login(User user, HttpSession session);

    //注册函数
    Map<String, String> register(User user, HttpSession session);

//    //查看个人资料
//    User userinfo(User user);

    //修改个人资料
    Map<String, String> edituser(User user);
}
