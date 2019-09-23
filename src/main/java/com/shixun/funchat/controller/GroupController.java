package com.shixun.funchat.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.shixun.funchat.entity.ChatGroup;
import com.shixun.funchat.entity.User;
import com.shixun.funchat.service.GroupService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class GroupController {
    private static Logger log = LoggerFactory.getLogger(GroupController.class);

    @Autowired
    private GroupService groupService;

    @GetMapping("/testGroup")
    public String toTestGroup() {
        return "test_group";
    }

    @PostMapping("/testGroup")
    @ResponseBody
    public Map<String, Object> testGroup(
            @RequestBody String jsonString,
            HttpSession session) {
        HashMap<String, Object> map = new HashMap<>();
        User user = (User) session.getAttribute("USER_SESSION");

        log.info(jsonString);
        JSONObject jsonObject = JSON.parseObject(jsonString);
        Integer userId;
        try {
            userId = Integer.valueOf((String) jsonObject.get("userId"));
        } catch (Exception e) {
            userId = 0;
        }
        Integer groupId;
        try {
            groupId = Integer.valueOf((String) jsonObject.get("groupId"));
        } catch (Exception e) {
            groupId = 0;
        }
        String groupName = (String) jsonObject.get("groupName");
        String groupType = (String) jsonObject.get("groupType");
        Integer ownerId;
        try {
            ownerId = Integer.valueOf((String) jsonObject.get("ownerId"));
        } catch (Exception e) {
            ownerId = 0;
        }
        Integer removeId;
        try {
            removeId = Integer.valueOf((String) jsonObject.get("removeId"));
        } catch (Exception e) {
            removeId = 0;
        }
        String func = (String) jsonObject.get("func");

        log.info("测试：");
        if (func.equals("search")) {
            log.info("搜索群聊");
            List<ChatGroup> chatGroups = groupService.searchChatGroup(groupName);
            for (ChatGroup group : chatGroups) {
                log.info("id=" + group.getGropId() + ",name=" + group.getGropName() + ",sum=" + group.getSum() + ",type=" + group.getGropType());
            }
        }
        if (func.equals("join")) {
            log.info("加入群聊");
            if (groupService.joinChatGroup(userId, groupId)) {
                log.info("加入成功！");
            } else {
                log.info("ERROR：加入失败！");
            }
        }
        if (func.equals("leave")) {
            log.info("退出群聊");
            if (groupService.leaveChatGroup(userId, groupId)) {
                log.info("退出成功！");
            } else {
                log.info("ERROR：退出失败！");
            }
        }
        if (func.equals("create")) {
            log.info("创建群聊");
            Integer rs_groupId = groupService.createChatGroup(userId, groupName, groupType);
            if (rs_groupId == null || rs_groupId < 0) {
                log.info("ERROR：创建失败！");
            }
            log.info("id=" + rs_groupId);
        }
        if (func.equals("display")) {
            log.info("显示群聊");
            List<ChatGroup> chatGroups = groupService.displayChatGroup(userId);
            for (ChatGroup group : chatGroups) {
                log.info("id=" + group.getGropId() + ",name=" + group.getGropName() + ",sum=" + group.getSum() + ",type=" + group.getGropType());
            }
        }
        if (func.equals("member")) {
            log.info("显示群聊成员");
            List<User> users = groupService.displayChatGroupMember(groupId);
            for (User u : users) {
                log.info("id=" + u.getId() + ",name=" + u.getUsername());
            }
        }
        if (func.equals("owner")) {
            log.info("验证群主");
            if (groupService.isOwner(userId, groupId)) {
                log.info("是群主！");
            } else {
                log.info("不是群主！");
            }
        }
        if (func.equals("delete")) {
            log.info("解散群聊");
            if (groupService.deleteChatGroup(userId, groupId)) {
                log.info("成功！");
            } else {
                log.info("失败！");
            }
        }
        if (func.equals("remove")) {
            log.info("踢出群聊");
            if (groupService.removeFromChatGroupByOwner(ownerId, removeId, groupId)) {
                log.info("成功！");
            } else {
                log.info("失败！");
            }
        }
        if (func.equals("update")) {
            log.info("更新群聊");
            ChatGroup up_group = new ChatGroup();
            up_group.setGropId(groupId);
            up_group.setGropName(groupName);
            if (groupService.updateChatGroupInfo(ownerId, up_group)) {
                log.info("成功！");
            } else {
                log.info("失败！");
            }
        }
        log.info("结束");
        map.put("result", "success");
        return map;
    }
}
