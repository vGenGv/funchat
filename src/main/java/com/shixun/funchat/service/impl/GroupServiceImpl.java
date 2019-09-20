package com.shixun.funchat.service.impl;

import com.shixun.funchat.dao.GroupMapper;
import com.shixun.funchat.entity.Group;
import com.shixun.funchat.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupServiceImpl implements GroupService {
    @Autowired
    private GroupMapper groupMapper;

    //查找群
    @Override
    public List<Group> search(Group group) {
        List<Group> groups= groupMapper.selectByIdOrName(group);
        return groups;
    }
}
