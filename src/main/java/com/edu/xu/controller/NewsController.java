package com.edu.xu.controller;

import com.edu.xu.common.Const;
import com.edu.xu.common.PageRequest;
import com.edu.xu.common.Result;
import com.edu.xu.common.UniqueCodeGenerator;
import com.edu.xu.entity.News;
import com.edu.xu.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


/**
 * @Author xuzhangyuan
 * @Date 2019/8/23 11:37
 */
@Controller
@RequestMapping("/news")
public class NewsController {
    @Autowired
    private NewsService newsService;
    private static final String LISTPAGE = "list-news";
    private static final String DETAILS = "detail";
    private static final String EDITPAGE = "editNews";

    @RequestMapping("/to/create")
    public String toCreate() {
        return "/addNews";
    }

    @RequestMapping("/to/list")
    public String toList() {
        return LISTPAGE;
    }

    @RequestMapping("/to/edit")
    public String edit(Long uid, Model model) {
        model.addAttribute("news",newsService.selectById(uid));
        return EDITPAGE;
    }

    @RequestMapping("/save")
    @ResponseBody
    public Result<?> save(News news) {
        news.setState(Const.State.YI_QUE_REN);
        news.setUid(UniqueCodeGenerator.genUID());
        boolean flag = newsService.save(news);
        System.out.println(flag);
        return Result.success(flag);
    }
    @RequestMapping("/saveDraft")
    @ResponseBody
    public Result<?> saveDraft(News news) {
        news.setState(Const.State.CAO_GAO);
        news.setUid(UniqueCodeGenerator.genUID());
        boolean flag = newsService.save(news);
        System.out.println(flag);
        return Result.success(flag);
    }

    @RequestMapping("/detail")
    public String details(Long uid, Model model) {
        model.addAttribute("news", newsService.selectById(uid));
        return DETAILS;
    }

    @RequestMapping("/update")
    @ResponseBody
    public Result<?> update(News news) {
        news.setState(Const.State.YI_QUE_REN);
        boolean flag = newsService.update(news);
        System.out.println(flag);
        return Result.success(flag);
    }
    @RequestMapping("/updateDraft")
    @ResponseBody
    public Result<?> updateDraft(News news) {
        news.setState(Const.State.CAO_GAO);
        boolean flag = newsService.update(news);
        System.out.println(flag);
        return Result.success(flag);
    }

    @RequestMapping("/delete")
    @ResponseBody
    public Result<?> delete(Long uid) {
        return Result.success(newsService.delete(uid));
    }

    @RequestMapping("/list")
    @ResponseBody
    public Result<?> list(PageRequest pageRequest) {
        List<News> news = newsService.selectAll();
        return Result.getPageResult(news.size(), news);
    }

}
