package com.edu.xu.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.edu.xu.entity.SysAdmin;
import com.edu.xu.service.SysAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.Objects;

/**
 * 用户控制器
 */
@Controller
@RequestMapping("/user")
public class UserController {
    private static final String INDEX_PAGE = "/login";
    @Autowired
    private SysAdminService sysAdminService;


    @RequestMapping("/index")
    public ModelAndView index(@ModelAttribute("u") SysAdmin sysAdmin) {
        ModelAndView modelAndView = new ModelAndView(INDEX_PAGE);
        return modelAndView;
    }

    /**
     * 映射登录
     *
     * @param sysAdmin    用户对象
     * @param httpSession 会话对象
     * @return 模型视图
     */
    @RequestMapping(value = "/login" , produces = {"text/html;charset=utf-8"})
    @ResponseBody
    @SuppressWarnings("all")
    public String login(@ModelAttribute("u") SysAdmin sysAdmin, HttpSession httpSession) {
        String res = "用户名或密码错误!";
        /* 调用对应的方法判断是否存在此对象 */
        SysAdmin loginSys = sysAdminService.selectOne(
                new EntityWrapper<SysAdmin>().eq("account", sysAdmin.getAccount())
                        .eq("password", sysAdmin.getPassword())
        );
        if (!Objects.isNull(loginSys)) {
            httpSession.setAttribute("user", loginSys);
            httpSession.removeAttribute("loginMeg");
            res = "成功";
        }
        return res;
    }


}
