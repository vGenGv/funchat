package com.shixun.funchat.dao;

import com.shixun.funchat.entity.ChatGroup;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatGroupMapper {
    int deleteByPrimaryKey(Integer gropId);

    int insert(ChatGroup record);

    int insertSelective(ChatGroup record);

    ChatGroup selectByPrimaryKey(Integer gropId);

    int updateByPrimaryKeySelective(ChatGroup record);

    int updateByPrimaryKey(ChatGroup record);

    List<ChatGroup> selectByIdOrName(ChatGroup record);

}