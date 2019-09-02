package com.edu.xu.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 系统菜单
 */
@TableName("sys_menu")
public class SysMenu implements Serializable {

    private static final long serialVersionUID = -3269024362874565491L;

    @TableId(type = IdType.AUTO)
    private Integer id;
    /**
     * 菜单编号
     */
    private String code;
    /**
     * 菜单名称
     */
    private String name;
    /**
     * 菜单图标class名
     */
    private String icon;
    /**
     * 菜单层级
     */
    private Integer level;
    /**
     * 菜单父节点
     */
    private String parent;
    /**
     * 菜单URL（用于页面跳转）
     */
    private String url;
    /**
     * 菜单排序
     */
    private Integer sort;
    /**
     * 是否禁用 0：启用 1：禁用
     */
    private Integer enable;
    /**
     * 更新时间
     */
    @TableField("update_time")
    private Date updateTime;

    @TableField(exist = false)
    List<SysMenu> childList;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getParent() {
        return parent;
    }

    public void setParent(String parent) {
        this.parent = parent;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Integer getEnable() {
        return enable;
    }

    public void setEnable(Integer enable) {
        this.enable = enable;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public List<SysMenu> getChildList() {
        return childList;
    }

    public void setChildList(List<SysMenu> childList) {
        this.childList = childList;
    }

}
