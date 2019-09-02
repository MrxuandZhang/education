package com.edu.xu.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * @Author xuzhangyuan
 * @Date 2019/8/23 11:25
 */

public class News implements Serializable {
    private static final long serialVersionUID = -2481271490244830035L;

    @TableId
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long uid;

    @TableField("title")
    private String title;

    @TableField("state")
    private Integer state;

    @TableField("isNew")
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Integer isNew;

    @TableField("content")
    private String content;

    @TableField("create_time")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    public Long getUid() {
        return uid;
    }

    public void setUid(Long uid) {
        this.uid = uid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getIsNew() {
        return isNew;
    }

    public void setIsNew(Integer isNew) {
        this.isNew = isNew;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return this.uid +"\t" + this.isNew + "\t"+this.content + "\t"+this.createTime + "";
    }
}
