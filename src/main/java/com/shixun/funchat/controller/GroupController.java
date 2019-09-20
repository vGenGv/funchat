package com.shixun.funchat.controller;

import com.shixun.funchat.entity.ChatGroup;
import com.shixun.funchat.entity.User;
import com.shixun.funchat.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class GroupController {
    @Autowired
    private GroupService groupService;

    /**
     * 获取用户加入的群聊
     *
     * @param session HTTP 会话
     * @return 返回消息
     */
    @RequestMapping("/getChatGroup")
    @ResponseBody
    public Map<String, Object> getChatGroup(HttpSession session) {
        HashMap<String, Object> map = new HashMap<>();
        User user = (User) session.getAttribute("USER_SESSION");
        List<ChatGroup> list = groupService.getChatGroupByUserId(user.getId());
        map.put("result", "success");
        map.put("data", list);
        return map;
    }
}
