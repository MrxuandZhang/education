package com.edu.xu.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.edu.xu.entity.SysAdmin;
import com.edu.xu.entity.SysMenu;
import com.edu.xu.service.SysAdminService;
import com.edu.xu.service.SysMenuService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author xuzhangyuan
 * @Date 2019/8/12 11:22
 */
@Controller
public class IndexController {

    private static  final  String INDEX_PAGE = "index";
    @Autowired
    private SysMenuService sysMenuService;
    @Autowired
    private SysAdminService sysAdminService;

    @RequestMapping("/index")
    public String index(Model model , HttpServletRequest request , HttpSession session){
        EntityWrapper<SysMenu> entityWrapper = new EntityWrapper<SysMenu>();
        entityWrapper.eq("enable", 0);
        entityWrapper.orderBy("level");
        entityWrapper.orderBy("sort");
        List<SysMenu> sysMenuList = sysMenuService.selectList(entityWrapper);
        request.setAttribute("menuList", getMenuTree(sysMenuList));
        SysAdmin admin = (SysAdmin) session.getAttribute("user");
        model.addAttribute("admin" , sysAdminService.selectById(admin.getUid()));

        return INDEX_PAGE;
    }
    public List<SysMenu> getMenuTree(List<SysMenu> menuList){
        Map<String,SysMenu> menuMap = new LinkedHashMap<String, SysMenu>();
        // 判断菜单列表是否为空
        if(CollectionUtils.isEmpty(menuList)) return menuList;
        for ( SysMenu sysMenu : menuList ){
            if(StringUtils.isBlank(sysMenu.getCode())){
                continue;
            }
            menuMap.put(sysMenu.getCode(), sysMenu);
        }

        SysMenu parentMenu;
        List<SysMenu> childList;
        for ( SysMenu sysMenu : menuList ){
            if(StringUtils.isBlank(sysMenu.getCode()))
                continue;
            // 查找父级菜单
            parentMenu = menuMap.get(sysMenu.getParent());
            if ( null == parentMenu )
                continue;
            childList = parentMenu.getChildList();
            if ( CollectionUtils.isEmpty(childList)){
                childList = new ArrayList<SysMenu>();
            }
            childList.add(sysMenu);
            parentMenu.setChildList(childList);
        }
        menuList.clear();
        for ( Map.Entry<String, SysMenu> entry : menuMap.entrySet() ){
            if ( null == menuMap.get(entry.getValue().getParent())) {
                menuList.add(entry.getValue());
            }
        }
        return menuList;
    }
}
