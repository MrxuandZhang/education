package com.edu.xu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author xuzhangyuan
 * @Date 2019/8/26 10:45
 */

@Controller
@RequestMapping("/url")
public class SchoolController {
    private static final String school = "school";

    @RequestMapping("/o")
    public String string() {
        return school;
    }
}
