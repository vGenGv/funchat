package com.shixun.funchat.dao;

import com.shixun.funchat.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    User selectByName(User user);

    List<User> selectByMailOrName(User user);

    User CheckByName(String string);

    /**
     * 查找群聊内所有成员
     *
     * @param grop_id 群聊ID
     * @return 成员数组
     */
    List<User> selectUserByGroupId(Integer grop_id);
}