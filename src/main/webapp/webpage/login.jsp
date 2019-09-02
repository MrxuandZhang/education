<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="s" uri="http://www.springframework.org/tags/form" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    out.println("<base href=\""+basePath+"\">");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户登录</title>
</head>
<style>
    * { font: 13px/1.5 '微软雅黑'; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; -box-sizing: border-box; padding:0; margin:0; list-style:none; box-sizing: border-box; }
    body, html { height:100%; overflow:hidden; }
    body { background:#93defe; background-size: cover; }
    a { color:#27A9E3; text-decoration:none; cursor:pointer; }
    img{ border:none;}
    .login_box{ width:1100px; margin:120px auto 0;}
    .login_box .login_l_img{ float:left; width:432px; height:440px; margin-left:50px;}
    .login_box .login_l_img img{width:500px; height:440px; }
    .login {height:377px; width:400px; padding:50px; background-color: #ffffff;border-radius:6px;box-sizing: border-box; float:right; margin-right:50px; position:relative;}
    .login_logo{ width:120px; height:120px; border:5px solid #93defe;border-radius:100px; background:#fff; text-align:center; line-height:110px; position:absolute; top:-60px; right:140px;}
    .login_name{ width:100%; float:left; text-align:center; margin-top:20px;}
    .login_name p{ width:100%; text-align:center; font-size:18px; color:#444; padding:10px 0 20px;}
    .login_logo img{ width:60px; height:60px;display: inline-block; vertical-align: middle;}
    input[type=text], input[type=file], input[type=password], input[type=email], select { border: 1px solid #DCDEE0; vertical-align: middle; border-radius: 3px; height: 50px; padding: 0px 16px; font-size: 14px; color: #555555; outline:none; width:100%;margin-bottom: 15px;line-height:50px; color:#888;}
    input[type=text]:focus, input[type=file]:focus, input[type=password]:focus, input[type=email]:focus, select:focus { border: 1px solid #27A9E3; }
    input[type=submit], input[type=button] { display: inline-block; vertical-align: middle; padding: 12px 24px; margin: 0px; font-size:16px; line-height: 24px; text-align: center; white-space: nowrap; vertical-align: middle; cursor: pointer; color: #ffffff; background-color: #27A9E3; border-radius: 3px; border: none; -webkit-appearance: none; outline:none; width:100%; }
    d_text{border: 1px solid #DCDEE0; vertical-align: middle; border-radius: 3px; height: 50px; padding: 0px 16px; font-size: 14px; color: #888; outline:none; width:100%;margin-bottom: 15px;display: block; line-height:50px;}.copyright { font-size:14px; color:#fff; display:block;width:100%; float:left; text-align:center; margin-top:60px;}

</style>
<script src="/js/layui.js"></script>
<script src="/js/jquery-3.3.1.js"></script>
<script src="/js/jquery.form.js"></script>
<script type="text/javascript">
    $(document).ready(function () {

        $("#sub").click(function () {
            if (chec()){
                $("form").ajaxForm({
                    success:function (msg) {
                        console.log(msg)
                        if (msg=="成功"){
                            window.location.href="/index" //成功后跳转
                        }
                        $("#loginMsg").html(msg);
                    },//回调函数
                    resetForm:true, //是否清除表单
                    timeout:3000,  //超时时间
                })
                $("form").submit();//提交
            }

        })

    })
</script>
<body onload="javascript:$('#i_no').focus();">
<div class="login_box">
      <div class="login_l_img"><img src="/images/login-img.png" /></div>
      <div class="login">
          <div class="login_logo"><a href="/index"><img src="/images/login_logo.png" title="登录" /></a></div>
          <div class="login_name">
               <p>后台系统 </p>
          </div>
          <s:form action="/user/login"  method="post" onsubmit="return chec()" modelAttribute="u">
              <s:input path="account" id="i_no" placeholder="用户编号"  /><br/>
              <s:password path="password"  id="i_password" placeholder="用户密码" />
             <font color="red">${loginMsg}</font>
              <input  value="登录" type="button" id="sub">
              <br/>
              <br/>
          </s:form>
      </div>
      <div class="copyright">某某有限公司 版权所有©2019-2020 技术支持电话：000-00000000</div>
</div>
</body>
<script src="/js/layui.all.js"></script>
<script type="text/javascript">
function chec(){
	   var reg=/^\d\w{3,}$/;
	   var _no=$("#i_no").val();
	   var _pwd=$("#i_password").val();
	   if(reg.test(_no)||_no==''||_no.length<3){
           layer.open({
               title: '温馨提示'
               ,content: '<font color="red">您的编号需不为空且大于3位!<font> '
           });
		   return false;
	   }else if(_pwd==''||_pwd.length<6||_pwd.length>8){
           layer.open({
               title: '温馨提示'
               ,content: '<font color="red">密码不允许为空且大等于6小等于8</font>'
           });
		   return false;
	   }else{
		   return true;
	   }
}
</script>
</html>
