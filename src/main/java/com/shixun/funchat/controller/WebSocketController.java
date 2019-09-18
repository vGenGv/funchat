package com.shixun.funchat.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;

import java.util.concurrent.ConcurrentHashMap;

/**
 * WebSocket 控制器
 */
@Component
public class WebSocketController implements WebSocketHandler {
    private static Logger log = LoggerFactory.getLogger(WebSocketController.class);

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
        if (StringUtils.isNotBlank(msgs)) {
            log.debug("收到消息：" + msgs);
            JSONArray json_msgs = JSON.parseArray(msgs);
            for (int i = 0; i < json_msgs.size(); i++) {
                JSONObject json_msg = json_msgs.getJSONObject(i);
                String toUserID = json_msg.getString("toUserID");
                String contentText = json_msg.getString("contentText");
                if (StringUtils.isNotBlank(toUserID) && StringUtils.isNotBlank(contentText)) {
                    WebSocketSession toSession = websocketList.get(toUserID);
                    if (toSession != null) {
                        json_msg.put("fromUserID", getUserID(session));
                        toSession.sendMessage(new TextMessage(JSON.toJSONString(json_msg)));
                    }else{
                        log.debug("目标不存在");
                    }
                }else{
                    log.debug("空 ID 或空内容");
                }
            }
        }else{
            log.debug("空消息");
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
