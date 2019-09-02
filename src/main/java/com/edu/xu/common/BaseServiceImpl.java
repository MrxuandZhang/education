package com.edu.xu.common;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
/**
 * @Author xuzhangyuan
 * @Date 2019/8/11 16:11
 */

public class BaseServiceImpl<M extends BaseMapper<T> , T> extends ServiceImpl<M , T> implements BaseService<T> {
}
