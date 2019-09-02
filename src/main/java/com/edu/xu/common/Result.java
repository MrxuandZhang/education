package com.edu.xu.common;

import com.alibaba.fastjson.JSONObject;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

/**
 * 请求返回对象
 * @param <T>
 */
public class Result<T> implements Serializable{

    private static final long serialVersionUID = 476620951745616773L;

    /**
     * 数据
     */
    private T data;

    /**
     * 错误码 0 为请求成功 其余为请求错误
     */
    private int code;

    /**
     * 错误消息 请求成功默认为 'success'
     */
    private String message;

    /**
     * 状态 成功 true 失败 false
     */
    private boolean success;

    public Result(){}

    private Result(int code, String message){
        this.success = false;
        this.code = code;
        this.message = message;
    }

    private Result(ResultErrorMessage errorMessageEnum){
        this.success = false;
        this.code = errorMessageEnum.getErrorCode();
        this.message = errorMessageEnum.getErrorMessage();
    }

    public static <T> Result<T> success(){
        Result<T> result = new Result<T>(ResultErrorMessage.SUCCESS);
        result.setSuccess(true);
        return result;
    }

    public static <T> Result<T> success(T data){
        Result<T> result = success();
        result.setData(data);
        return result;
    }

    public static <T> Result<T> fail(int code, String msg){
        return new Result<T>(code, msg);
    }

    public static Result<PageResult> getPageResult(Integer total, List<?> list){
        PageResult pageResult = new PageResult();
        pageResult.setTotal(total);
        pageResult.setList(list);

        return success(pageResult);
    }
    public static <T> Result<?> suggestData(Collection<T> values){
        JSONObject result = new JSONObject();
        result.put("value",values);
        return Result.success(result);
    }

    /**
     * 验证结果
     * @param validate 是否验证成功
     * @param message 信息
     * @param <T>
     * @return
     */
    public static <T> Result<?> validate(boolean validate , String message){
        Result<Boolean> result = new Result<>();
        result.success = validate;
        result.code = -1;
        result.message = message;
        return result;
    }

    public static <T> Result<?> validateSuccess(){
        return validate(true , "");
    }

    public static <T> Result<?> validateFailure(String message){
        return validate(false , message);
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean getSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

}
