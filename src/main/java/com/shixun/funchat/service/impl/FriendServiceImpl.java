package com.shixun.funchat.service.impl;

import com.shixun.funchat.dao.FriendMapper;
import com.shixun.funchat.entity.Friend;
import com.shixun.funchat.entity.User;
import com.shixun.funchat.service.FriendService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FriendServiceImpl implements FriendService {
    private static Logger log= LoggerFactory.getLogger(FriendServiceImpl.class);

    @Autowired
    private FriendMapper friendMapper;

    @Override
    public List<User> listfriend(int id) {
        List<User> users=friendMapper.selectByFriendId(id);
        return users;
    }

    @Override
    public String deleteFriend(Integer[] ids, HttpSession session) {
        int num=0;
        User user = (User) session.getAttribute("USER_SESSION");
        if(ids !=null){
            for (Integer id : ids) {
                Friend friend = new Friend();
                friend.setFriendaId(id);
                friend.setFriendbId(user.getId());
                // 使用输出语句模拟已经删除了用户
                int state=friendMapper.deleteByPrimaryKey(friend);
                if (state !=0) {
                    num+=1;
                    log.debug("删除了id为" + id + "的好友！");
                }
                else  log.debug("id为" + id + "的好友,删除失败！");
            }
            return "删除了"+num+"位好友！";
        }else{
            log.debug("ids=null");
            return "选择为空！";
        }
    }
}
