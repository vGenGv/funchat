package com.shixun.funchat.service;

import com.shixun.funchat.entity.Group;

import java.util.List;

public interface GroupService {
    //查找群
    List<Group> search(Group group);
}