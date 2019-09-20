package com.shixun.funchat.service.impl;

import com.shixun.funchat.dao.ChatGroupMapper;
import com.shixun.funchat.entity.ChatGroup;
import com.shixun.funchat.dao.GroupStructureMapper;
import com.shixun.funchat.service.GroupService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupServiceImpl implements GroupService {
    private static Logger log = LoggerFactory.getLogger(GroupServiceImpl.class);

    @Autowired
    private GroupStructureMapper groupStructureMapper; //群结构表mapper
    @Autowired
    private ChatGroupMapper chatGroupMapper; //群表mapper

    //查找群
    @Override
    public List<ChatGroup> search(ChatGroup group) {
        List<ChatGroup> groups = chatGroupMapper.selectByIdOrName(group);
        return groups;
    }


    /**
     * 获取用户 ID 加入的所有群聊
     *
     * @param userId 用户 ID
     * @return 群聊数组
     */
    @Override
    public List<ChatGroup> getChatGroupByUserId(int userId) {
        return chatGroupMapper.selectChatGroupByUserId(userId);
    }

    /**
     * 获取
     *
     * @param grop_id
     * @return
     */
    @Override
    public List<Integer> getGroupMemberByGroupId(int grop_id) {
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
