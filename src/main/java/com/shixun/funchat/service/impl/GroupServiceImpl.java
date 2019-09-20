package com.shixun.funchat.service.impl;

import com.shixun.funchat.dao.ChatGroupMapper;
import com.shixun.funchat.entity.ChatGroup;
import com.shixun.funchat.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupServiceImpl implements GroupService {
    @Autowired
    private ChatGroupMapper groupMapper;

    //查找群
    @Override
    public List<ChatGroup> search(ChatGroup group) {
        List<ChatGroup> groups= groupMapper.selectByIdOrName(group);
        return groups;
    }
}
