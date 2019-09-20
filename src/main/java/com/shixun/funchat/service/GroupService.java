package com.shixun.funchat.service;

import com.shixun.funchat.entity.Group;

import java.util.List;

public interface GroupService {
    //查找群
    List<Group> search(Group group);

    public List<Integer> getGroupMember(int grop_id);

    public boolean createChatGroup(int id, String grop_name, String grop_type);

    public boolean deleteChatGroup(int id, int grop_id);

    public boolean joinChatGroup(int id, int grop_id);

    public boolean leaveChatGroup(int id, int grop_id);
}
