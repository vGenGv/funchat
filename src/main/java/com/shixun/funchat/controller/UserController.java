package com.shixun.funchat.controller;

import com.shixun.funchat.entity.User;
import com.shixun.funchat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

//    跳转登录页面
    @GetMapping("/login")
    public String tologin(){ return "login";}

//    根据用户名和密码登录
    @PostMapping("/login")
    @ResponseBody
    public Map<String, String> login(@RequestBody User user1, HttpSession session){
//        System.out.println(user1.getUsername());//测试后台接收数据
        User user = userService.selectByName(user1);
        Map<String, String> map = new HashMap<>();
        if (user !=null){
            session.setAttribute("USER_SESSION", user);//登录成功，加入session
            map.put("msg","登录成功 欢迎您 "+user.getUsername()+" !");
        }
        else map.put("msg","用户名或密码错误！");
        return map;
    }

    //跳转注册页面
    @GetMapping("/register")
    public String toregister(){return "register";}

    // 注册，上传数据库
    @PostMapping("/register")
    @ResponseBody
    public Map<String, String> register(@RequestBody User user1, HttpSession session){
        System.out.println(user1.getUsername());//测试后台接收数据
        int state = userService.insertSelective(user1);
        Map<String, String> map = new HashMap<>();
        if (state !=0){
            session.setAttribute("USER_SESSION", user1);//注册成功，加入session
            map.put("msg","注册成功 欢迎您 "+user1.getUsername()+" !");
        }
        else map.put("msg","注册失败");
        return map;
    }
}
