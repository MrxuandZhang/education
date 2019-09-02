package com.edu.xu.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.springframework.stereotype.Component;

/**
 * @Author xuzhangyuan
 * @Date 2019/8/26 10:29
 */
@org.aspectj.lang.annotation.Aspect
@Component
public class Aspect {

    @Around("execution(* com.edu.xu.controller.*.*(..))")
    public Object timeStatic(ProceedingJoinPoint joinPoint) throws Throwable {
        Long startTime = System.currentTimeMillis();
        Object o = joinPoint.proceed();
        Long endTime = System.currentTimeMillis();
        System.out.println("执行时间是:");
        System.out.println(endTime - startTime);
        System.out.println("\n\n\n\n\n");
        return o;
    }
}
