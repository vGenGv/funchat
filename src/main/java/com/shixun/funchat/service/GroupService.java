package com.shixun.funchat.service;

import com.shixun.funchat.entity.ChatGroup;

import java.util.List;

public interface GroupService {
    //查找群
    List<ChatGroup> search(ChatGroup group);

    public List<ChatGroup> getChatGroupByUserId(int userId);

    public List<Integer> getGroupMemberByGroupId(int grop_id);

    public boolean createChatGroup(int id, String grop_name, String grop_type);

    public boolean deleteChatGroup(int id, int grop_id);

    public boolean joinChatGroup(int id, int grop_id);

    public boolean leaveChatGroup(int id, int grop_id);
}
