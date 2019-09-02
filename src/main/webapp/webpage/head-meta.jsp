<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<c:set var="version" value="1.0.5"/>
<c:set var="projectName" value="学历" />

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="renderer" content="webkit">

<link rel="shortcut icon" href="${ctx}/images/favicon.png?v=${version}" type="image/x-icon" />
<link type="text/css" rel="stylesheet" href="${ctx}/js/plugins/layer/skin/layer.css?v=${version}" />
<link type="text/css" rel="stylesheet" href="${ctx}/js/plugins/layer/skin/layer.ext.css?v=${version}" />
<link type="text/css" rel="stylesheet" href="${ctx}/js/plugins/iCheck/custom.css?v=${version}" />
<link type="text/css" rel="stylesheet" href="${ctx}/js/plugins/chosen/css/chosen.css?v=${version}" />
<link type="text/css" rel="stylesheet" href="${ctx}/js/plugins/datetimepicker/css/jquery.datetimepicker.css?v=${version}">
<link type="text/css" rel="stylesheet" href="${ctx}/js/lib/bootstrap/css/bootstrap-3.3.6.min.css?v=${version}" />
<link type="text/css" rel="stylesheet" href="${ctx}/js/plugins/layui/css/layui.css?v=${version}" />
<link type="text/css" rel="stylesheet" href="${ctx}/js/plugins/layui/cacsader/cascader.css?v=${version}" />
<link type="text/css" rel="stylesheet" href="${ctx}/js/lib/hplus/css/font-awesome.min.css?v=${version}" />
<link type="text/css" rel="stylesheet" href="${ctx}/js/lib/iconfont/iconfont.css?v=${version}" />
<link type="text/css" rel="stylesheet" href="${ctx}/js/lib/hplus/css/animate.css?v=${version}" />
<link type="text/css" rel="stylesheet" href="${ctx}/js/lib/hplus/css/style.css?v=${version}" />

<script type="text/javascript" src="${ctx}/js/lib/jquery/jquery-2.1.4.min.js?v=${version}"></script>
<script type="text/javascript" src="${ctx}/js/lib/bootstrap/js/bootstrap-3.3.6.min.js?v=${version}"></script>
<script type="text/javascript" src="${ctx}/js/plugins/layui/layui.all.js?v=${version}"></script>
<script type="text/javascript" src="${ctx}/js/plugins/layui/cacsader/cascader.js?v=${version}"></script>
<script type="text/javascript" src="${ctx}/js/plugins/layer/layer.min.js?v=${version}"></script>
<script type="text/javascript" src="${ctx}/js/plugins/layer/extend/layer.ext.js?v=${version}"></script>
<script type="text/javascript" src="${ctx}/js/plugins/iCheck/icheck.min.js?v=${version}"></script>
<script type="text/javascript" src="${ctx}/js/plugins/chosen/js/chosen.jquery.js?v=${version}"></script>
<script type="text/javascript" src="${ctx}/js/plugins/ztree/jquery-migrate-1.2.1.js?v=${version}"></script>
<script type="text/javascript" src="${ctx}/js/plugins/ztree/jquery.ztree.all.js?v=${version}"></script>
<script type="text/javascript" src="${ctx}/js/plugins/datetimepicker/jquery.datetimepicker.js?v=${version}"></script>
<script type="text/javascript" src="${ctx}/js/lib/jquery.ajaxfileupload.js"></script>
<script type="text/javascript" src="${ctx}/js/date.js?v=${version}"></script>
<script type="text/javascript" src="${ctx}/js/layer.js?v=${version}"></script>
<script type="text/javascript" src="${ctx}/js/plugins/template/template-web.js?v=${version}"></script>
<script type="text/javascript" src="${ctx}/js/request.js?v=2434"></script>

<script type="text/javascript" src="${ctx}/js/plugins/layui/lay/laydate/laydate.js?version=${version}"></script>
<script type="text/javascript">

	var ctx = '${ctx}';

	$(function(){

		document.onkeydown = function (event) {
			var e = event ? event : (window.event ? window.event : null);
			if (e.keyCode == 13) {
				e.preventDefault();text.js
			}
		};

		$(".return-link").click(function(){
			window.history.back();
		});

	});

</script>
