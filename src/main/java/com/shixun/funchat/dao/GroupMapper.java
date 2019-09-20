package com.shixun.funchat.dao;

import com.shixun.funchat.entity.Group;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupMapper {
    int deleteByPrimaryKey(Integer gropId);

    int insert(Group record);

    int insertSelective(Group record);

    Group selectByPrimaryKey(Integer gropId);

    int updateByPrimaryKeySelective(Group record);

    int updateByPrimaryKey(Group record);

    List<Group> selectByIdOrName(Group record);

}