package com.shixun.funchat.entity;

public class GroupStructure extends GroupStructureKey {
    private String gropJob;

    public String getGropJob() {
        return gropJob;
    }

    public void setGropJob(String gropJob) {
        this.gropJob = gropJob == null ? null : gropJob.trim();
    }
}