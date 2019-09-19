package com.shixun.funchat.controller;

import com.shixun.funchat.entity.User;
import com.shixun.funchat.service.FriendService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;


@Controller
public class FriendController {
    private static Logger log= LoggerFactory.getLogger(FriendController.class);

    @Autowired
    private FriendService friendService;

    @GetMapping("/listfriend")
    public String toListfriend(Model model, HttpServletRequest request){
        HttpSession session=request.getSession();
        User user = (User) session.getAttribute("USER_SESSION");
        List<User> users=friendService.listfriend(user.getId());
        model.addAttribute("users",users);
        return "test_listfriend";
    }

    @PostMapping("/deleteFriend")
    public String deleteFriend(Integer[] ids, HttpServletRequest request) {
        HttpSession session=request.getSession();
        String msg = friendService.deleteFriend(ids,session);
        log.debug(msg);
        return "redirect:/listfriend";
    }
}
