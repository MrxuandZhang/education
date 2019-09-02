<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
<head>
    <%@include file="./head-meta.jsp" %>
    <%@include file="./form-meta.jsp" %>
    <%@include file="./table-meta.jsp" %>
    <title>详情</title>
</head>
<body>
<div class="wrapper wrapper-content">
    <div class="form-content">
        <form id="form" class="form-horizontal">
            <div class="form-group">
                <label class="control-label col-sm-2"> 动态标题</label>
                <div class="col-sm-4">
                    <input class="form-control " name="title" value="${news.title}" readonly>
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-sm-2 required">是否推荐</label>
                <div class="col-sm-4 radio i-checks" style="margin-left: 15px;">
                    <input type="radio" name="isNew" value="1" disabled ${news.isNew == 1 ? 'checked' :''}/>推荐
                    <input type="radio" name="isNew" value="0" disabled ${news.isNew == 0 ? 'checked' :''}/>不推荐
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-sm-2"> 动态正文</label>
                <div class="col-sm-4">
                    <textarea rows="20" cols="80" name="content" readonly>${news.content}</textarea>
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-sm-2">新增时间</label>
                <div class="col-sm-4 layui-input-inline">
                    <input type="text" class="laydate-icon form-control layui-input" id="create_Time"
                           name="createTime" readonly value="<fmt:formatDate value="${news.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/>">
                </div>
            </div>

            <%--<div class="form-group fixed">--%>
            <%--<div class="col-sm-10" style="margin-left: 460px;">--%>
            <%--<input class="btn btn-primary" type="submit"--%>
            <%--data-url="${ctx}/news/save"--%>
            <%--value="确定"/>--%>
            <%--<button class="btn btn-white" type="button" id="form-cancel-btn">取消</button>--%>
            <%--</div>--%>
            <%--</div>--%>
        </form>
    </div>
</div>
</body>
</html>
