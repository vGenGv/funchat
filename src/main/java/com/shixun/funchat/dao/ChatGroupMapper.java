package com.shixun.funchat.dao;

import com.shixun.funchat.entity.ChatGroup;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatGroupMapper {
    /**
     * 查找当前用户所加入的所有群聊信息
     *
     * @param id 用户ID
     * @return 查找结果
     */
    List<ChatGroup> selectChatGroupsByUserId(Integer id);

    /**
     * 选择性查找
     *
     * @param chatGroup 要查找的群聊信息
     * @return 找到的群聊信息数组
     */
    List<ChatGroup> selectBySelective(ChatGroup chatGroup);

    int deleteByPrimaryKey(Integer gropId);

    int insert(ChatGroup record);

    int insertSelective(ChatGroup record);

    ChatGroup selectByPrimaryKey(Integer gropId);

    int updateByPrimaryKeySelective(ChatGroup record);

    int updateByPrimaryKey(ChatGroup record);

}