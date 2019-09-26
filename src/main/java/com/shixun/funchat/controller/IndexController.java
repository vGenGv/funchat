package com.shixun.funchat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {
    @RequestMapping(value = "/")
    public ModelAndView index() {
        ModelAndView retVal = new ModelAndView();
        retVal.setViewName("index");
        retVal.addObject("message", "Hello, funchat!");
        return retVal;
    }

    @RequestMapping(value = "/index_qiaofeng")
    public String index_qiaofeng() {
        return "index_qiaofeng";
    }
}
