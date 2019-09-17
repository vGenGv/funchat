package com.shixun.funchat.entity;

import java.util.Date;

public class User {
    private Integer id;

    private String username;

    private String password;

    private Long telephone;

    private String icon;

    private String geder;

    private Date birthday;

    private String addr;

    private String mail;

    private String perSignature;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public Long getTelephone() {
        return telephone;
    }

    public void setTelephone(Long telephone) {
        this.telephone = telephone;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon == null ? null : icon.trim();
    }

    public String getGeder() {
        return geder;
    }

    public void setGeder(String geder) {
        this.geder = geder == null ? null : geder.trim();
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr == null ? null : addr.trim();
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail == null ? null : mail.trim();
    }

    public String getPerSignature() {
        return perSignature;
    }

    public void setPerSignature(String perSignature) {
        this.perSignature = perSignature == null ? null : perSignature.trim();
    }
}