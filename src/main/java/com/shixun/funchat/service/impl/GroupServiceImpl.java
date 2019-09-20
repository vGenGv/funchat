package com.shixun.funchat.service.impl;

import com.shixun.funchat.dao.ChatGroupMapper;
import com.shixun.funchat.entity.ChatGroup;
import com.shixun.funchat.dao.GroupStructureMapper;
import com.shixun.funchat.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupServiceImpl implements GroupService {
    @Autowired
    private ChatGroupMapper groupMapper;

    @Autowired
    private GroupStructureMapper groupStructureMapper;

    //查找群
    @Override
    public List<ChatGroup> search(ChatGroup group) {
        List<ChatGroup> groups = groupMapper.selectByIdOrName(group);
        return groups;
    }


    @Override
    public List<Integer> getGroupMember(int grop_id) {
        return groupStructureMapper.selectMember(grop_id);
    }

    @Override
    public boolean createChatGroup(int user_id, String grop_name, String grop_type) {
        return false;
    }

    @Override
    public boolean deleteChatGroup(int user_id, int grop_id) {
        return false;
    }

    @Override
    public boolean joinChatGroup(int user_id, int grop_id) {
        return false;
    }

    @Override
    public boolean leaveChatGroup(int user_id, int grop_id) {
        return false;
    }
}
