package com.shixun.funchat.service;

import java.util.List;

public interface GroupService {
    public List<Integer> getGroupMember(int grop_id);

    public boolean createChatGroup(int id, String grop_name, String grop_type);

    public boolean deleteChatGroup(int id, int grop_id);

    public boolean joinChatGroup(int id, int grop_id);

    public boolean leaveChatGroup(int id, int grop_id);
}
