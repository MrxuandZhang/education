package com.edu.xu.common;

import java.io.Serializable;

/**
 * 分页请求对象
 * @author wm
 * @date 2018/11/14
 */
public class PageRequest implements Serializable{
    private static final long serialVersionUID = -7395269826980278273L;

    private int offset;
    /**
     *  默认为10
     */
    private int limit;
    private String sort;
    private String search;

    public int getOffset() {
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public int getPageSize(){
        return limit <= 0 ? 10 : limit;
    }

    public int getPageNumber(){
        if(offset <= 0) {
            return 1;
        }
        return offset/getPageSize() + 1;
    }

}
