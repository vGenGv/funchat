package com.shixun.funchat.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.shixun.funchat.service.GroupService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

/**
 * WebSocket 控制器
 */
@Component
public class WebSocketController implements WebSocketHandler {
    private static Logger log = LoggerFactory.getLogger(WebSocketController.class);

    @Autowired
    private GroupService groupService;

    //连接表
    private static ConcurrentHashMap<String, WebSocketSession> websocketList = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String userID = getUserID(session);
        if (StringUtils.isNotBlank(userID)) {
            websocketList.put(userID, session);
            log.debug("新连接，用户ID：" + userID + "，当前人数：" + websocketList.size());
        } else {
            log.debug("userID 为空");
        }
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String msgs = (String) message.getPayload();
        if (!StringUtils.isNotBlank(msgs)) {
            log.debug("空消息");
            return;
        }
        log.debug("收到消息：" + msgs);
        JSONArray json_msgs = JSON.parseArray(msgs);
        //遍历消息
        for (int i = 0; i < json_msgs.size(); i++) {
            JSONObject json_msg = json_msgs.getJSONObject(i);
            //提取消息内容
            Integer toGroupID = json_msg.getInteger("toGroupID");
            String contentText = json_msg.getString("contentText");
            if (!StringUtils.isNotBlank(contentText)) {
                log.debug("空内容");
                return;
            }
            //获取组内成员 ID
            List<Integer> group_users = groupService.getGroupMember(toGroupID);
            if (group_users.size() == 0) {
                log.debug("群聊不存在");
                return;
            }
            //群发在线消息
            for (Integer group_user : group_users) {
                //获取在线用户会话
                WebSocketSession toSession = websocketList.get(String.valueOf(group_user));
                if (toSession != null) {
                    json_msg.put("fromUserID", getUserID(session));
                    toSession.sendMessage(new TextMessage(JSON.toJSONString(json_msg)));
                }
            }
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable throwable) throws Exception {
        if (session.isOpen()) {
            session.close();
        }
        String userID = getUserID(session);
        if (userID != null)
            websocketList.remove(userID);
        log.error("连接错误");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        String userID = getUserID(session);
        if (userID != null)
            websocketList.remove(userID);
        log.debug("连接关闭，用户ID：" + userID + "，当前人数：" + websocketList.size());
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    private String getUserID(WebSocketSession session) {
        try {
            return (String) session.getAttributes().get("userID");
        } catch (Exception e) {
            return null;
        }
    }
}
