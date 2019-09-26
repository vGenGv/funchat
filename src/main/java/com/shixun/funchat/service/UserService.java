package com.shixun.funchat.service;

import com.shixun.funchat.entity.User;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

public interface UserService {

    /**
     * 登录验证
     *
     * @param userName 用户名
     * @param password 密码
     * @return null 验证失败 其他 验证成功的用户信息
     */
    User login(String userName, String password);

    /**
     * 注册用户
     *
     * @param user 要注册的用户信息
     * @return null 注册失败 其他 注册成功的用户信息
     */
    User register(User user);

    /**
     * 更新用户信息
     *
     * @param user 要更新的用户信息
     * @return null 更新失败 其他 更新后的用户信息
     */
    User updateUserInfo(User user);

    //查找用户
    List<User> search(User user);
}
