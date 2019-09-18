package com.shixun.funchat.service;

import com.shixun.funchat.entity.User;

import java.util.List;

public interface FriendService {
    //好友列表
    List<User> listfriend(int id);
}
