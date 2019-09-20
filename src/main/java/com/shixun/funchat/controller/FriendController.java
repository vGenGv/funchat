package com.shixun.funchat.controller;

import com.shixun.funchat.entity.Friend;
import com.shixun.funchat.entity.Group;
import com.shixun.funchat.entity.User;
import com.shixun.funchat.service.FriendService;
import com.shixun.funchat.service.GroupService;
import com.shixun.funchat.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
public class FriendController {
    private static Logger log= LoggerFactory.getLogger(FriendController.class);

    @Autowired
    private FriendService friendService;
    @Autowired
    private UserService userService;
    @Autowired
    private GroupService groupService;

    //跳转好友列表
    @GetMapping("/listfriend")
    public String toListfriend(Model model, HttpServletRequest request){
        HttpSession session=request.getSession();
        User user = (User) session.getAttribute("USER_SESSION");
        List<User> users=friendService.listfriend(user.getId());
        model.addAttribute("users",users);
        return "test_listfriend";
    }

    //删除好友
    @PostMapping("/deleteFriend")
    public String deleteFriend(Integer[] ids, HttpServletRequest request) {
        HttpSession session=request.getSession();
        String msg = friendService.deleteFriend(ids,session);
        log.debug(msg);
        return "redirect:/listfriend";
    }

    //跳转好友搜索和群搜索页面
    @GetMapping("/search")
    public String tosearch(){return "test_search";}

    //实现好友搜索和群搜索
    @PostMapping("/search")
    public String Search(User user,Model model){
        Group group = new Group();
        group.setGropId(user.getId());
        group.setGropName(user.getUsername());
        List<User> users = userService.search(user);
        List<Group> groups =groupService.search(group);
        model.addAttribute("users",users);
        model.addAttribute("groups",groups);
        return "test_search";
    }

    //添加好友
    @GetMapping("/addfriend")
    @ResponseBody
    public String addfriend(int id,HttpServletRequest request){
        HttpSession session=request.getSession();
        String msg = friendService.addFriend(id,session);
        log.debug(msg);
        return msg;
    }
}