package com.shixun.funchat.dao;

import com.shixun.funchat.entity.GroupStructure;
import com.shixun.funchat.entity.GroupStructureKey;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupStructureMapper {

    List<Integer> selectMember(int gropId);

    int deleteByPrimaryKey(GroupStructureKey key);

    int insert(GroupStructure record);

    int insertSelective(GroupStructure record);

    GroupStructure selectByPrimaryKey(GroupStructureKey key);

    int updateByPrimaryKeySelective(GroupStructure record);

    int updateByPrimaryKey(GroupStructure record);
}