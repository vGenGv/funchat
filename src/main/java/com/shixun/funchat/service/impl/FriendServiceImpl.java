package com.shixun.funchat.service.impl;

import com.shixun.funchat.dao.FriendMapper;
import com.shixun.funchat.entity.User;
import com.shixun.funchat.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendServiceImpl implements FriendService {
    @Autowired
    private FriendMapper friendMapper;

    @Override
    public List<User> listfriend(int id) {
        List<User> users=friendMapper.selectByFriendId(id);
        return users;
    }
}
