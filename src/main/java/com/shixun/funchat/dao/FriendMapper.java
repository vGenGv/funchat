package com.shixun.funchat.dao;

import com.shixun.funchat.entity.Friend;
import com.shixun.funchat.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendMapper {
    int deleteByPrimaryKey(Friend key);

    int insert(Friend record);

    int insertSelective(Friend record);

    List<User> selectByFriendId(int id);

}