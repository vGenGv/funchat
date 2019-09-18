package com.shixun.funchat.service.Impl;

import com.shixun.funchat.dao.UserMapper;
import com.shixun.funchat.entity.User;
import com.shixun.funchat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    //登录函数
    @Override
    public Map<String, String> login(User user, HttpSession session){
        System.out.println("登录: "+user.getUsername());//测试后台接收数据
        User user1 = userMapper.selectByName(user);
        Map<String, String> map = new HashMap<>();
        if (user1 !=null){
            map.put("msg","登录成功 欢迎您 "+user1.getUsername()+" !");
            session.setAttribute("USER_SESSION", user1);//登录成功，加入session
        }
        else map.put("msg","用户名或密码错误！");
        return map;
    }

    //注册函数
    @Override
    public Map<String, String> register(User user, HttpSession session){
        System.out.println(user.getUsername());//测试后台接收数据
        int state = userMapper.insertSelective(user);
        Map<String, String> map = new HashMap<>();
        if (state !=0){
            session.setAttribute("USER_SESSION", user);//注册成功，加入session
            map.put("msg","注册成功 欢迎您 "+user.getUsername()+" !");
        }
        else map.put("msg","注册失败");
        return map;
    }

    //查看个人资料
    @Override
    public User userinfo(User user) {
        user = userMapper.selectByName(user);
        return user;
    }

    //修改个人资料
    @Override
    public Map<String, String> edituser(User user) {
        int state = userMapper.updateByPrimaryKeySelective(user);
        Map<String, String> map = new HashMap<>();
        if (state !=0){
            map.put("msg","修改成功");
        }
        else map.put("msg","修改失败");
        return map;
    }

}
