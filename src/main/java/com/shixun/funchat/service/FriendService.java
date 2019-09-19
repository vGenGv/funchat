package com.shixun.funchat.service;


import com.shixun.funchat.entity.User;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

public interface FriendService {
    //好友列表
    List<User> listfriend(int id);
    String deleteFriend(Integer[] ids, HttpSession session);
}
