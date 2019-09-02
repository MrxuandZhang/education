package com.edu.xu.service.impl;

import com.edu.xu.common.BaseServiceImpl;
import com.edu.xu.entity.News;
import com.edu.xu.mapper.NewsMapper;
import com.edu.xu.service.NewsService;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

/**
 * @Author xuzhangyuan
 * @Date 2019/8/23 11:32
 */
@Service
public class NewsServiceImpl extends BaseServiceImpl<NewsMapper , News> implements NewsService {
    @Override
    public boolean update(News news) {
        News selectNews = baseMapper.selectById(news.getUid());
        Assert.notNull(selectNews, "您的单据不完整");
        return retBool(baseMapper.updateById(news));
    }

    /**
     * 此方法用于
     *
     * @param news
     * @return
     * @author xuzhangyuan
     * @date 10:19 2019/8/26
     */
    @Override
    public boolean save(News news) {
        return retBool(baseMapper.insert(news));
    }

    /**
     * 此方法用于
     *
     * @param uid
     * @return
     * @author xuzhangyuan
     * @date 10:21 2019/8/26
     */
    @Override
    public boolean delete(Long uid) {
        News news = selectById(uid);
        Assert.notNull(news, "您的数据不完整");
        Assert.state(news.getState() != 101, "已确认的数据不允许删除");
        return retBool(baseMapper.deleteById(uid));
    }

    /**
     * 此方法用于
     *
     * @return
     * @author xuzhangyuan
     * @date 10:21 2019/8/26
     */
    @Override
    public List<News> selectAll() {
        return baseMapper.selectList(null);
    }
}
