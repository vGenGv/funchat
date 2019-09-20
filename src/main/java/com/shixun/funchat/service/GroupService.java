package com.shixun.funchat.service;

import com.shixun.funchat.entity.ChatGroup;

import java.util.List;

public interface GroupService {
    //查找群
    List<ChatGroup> search(ChatGroup group);
}
