package com.shixun.funchat.dao;

import com.shixun.funchat.entity.ChatGroup;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatGroupMapper {
    /**
     * 获取某个用户ID加入的所有群聊实体
     *
     * @param userId 用户ID
     * @return 群聊实体数组
     */
    List<ChatGroup> selectChatGroupByUserId(Integer userId);

    int deleteByPrimaryKey(Integer gropId);

    int insert(ChatGroup record);

    int insertSelective(ChatGroup record);

    ChatGroup selectByPrimaryKey(Integer gropId);

    int updateByPrimaryKeySelective(ChatGroup record);

    int updateByPrimaryKey(ChatGroup record);

    List<ChatGroup> selectByIdOrName(ChatGroup record);

}