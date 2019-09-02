package com.edu.xu.service;

import com.edu.xu.common.BaseService;
import com.edu.xu.entity.News;

import java.util.List;

/**
 * @Author xuzhangyuan
 * @Date 2019/8/23 11:31
 */
public interface NewsService extends BaseService<News> {

     /**
      * 此方法用于 
      * @author xuzhangyuan
      * @date 10:19 2019/8/26
      * @param news
      * @return 
      */
    boolean update(News news);

     /**
      * 此方法用于
      * @author xuzhangyuan
      * @date 10:19 2019/8/26
      * @param news
      * @return
      */
    boolean save(News news);

     /**
      * 此方法用于 
      * @author xuzhangyuan
      * @date 10:21 2019/8/26
      * @param uid
      * @return 
      */
    boolean delete(Long uid);
    
     /**
      * 此方法用于 
      * @author xuzhangyuan
      * @date 10:21 2019/8/26
      * @return
      */
    List<News> selectAll();
}
