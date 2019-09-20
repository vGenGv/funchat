package com.shixun.funchat.entity;

public class ChatGroup {
    private Integer gropId;

    private String gropName;

    private Integer sum;

    private String gropType;

    public Integer getGropId() {
        return gropId;
    }

    public void setGropId(Integer gropId) {
        this.gropId = gropId;
    }

    public String getGropName() {
        return gropName;
    }

    public void setGropName(String gropName) {
        this.gropName = gropName == null ? null : gropName.trim();
    }

    public Integer getSum() {
        return sum;
    }

    public void setSum(Integer sum) {
        this.sum = sum;
    }

    public String getGropType() {
        return gropType;
    }

    public void setGropType(String gropType) {
        this.gropType = gropType == null ? null : gropType.trim();
    }
}