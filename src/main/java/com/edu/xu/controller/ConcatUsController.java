package com.edu.xu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author xuzhangyuan
 * @Date 2019/8/26 11:54
 */
@Controller
@RequestMapping("/payment")
public class ConcatUsController {

    private static final String US = "concat";

    @RequestMapping("/to/list")
    public String toList(){
        return US;
    }
}
