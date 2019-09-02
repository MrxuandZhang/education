package com.edu.xu.common;

/**
 *
 */
public enum ResultErrorMessage {

    /**
     * 请求成功
     */
    SUCCESS(200, "success") ,
    ERROR(-1 , "error") ,
    FAIL_LOGIN( -100 , "登录已失效")

    ;

    private int errorCode;
    private String errorMessage;

    ResultErrorMessage(int errorCode, String errorMessage){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    public int getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

}
