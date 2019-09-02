<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
    <%@include file="head-meta.jsp"%>
    <title>${projectName}后台管理系统</title>
</head>

<body class="fixed-sidebar full-height-layout gray-bg" style="min-width:1280px; overflow:scroll">
    <div id="wrapper">
        <%@include file="menu.jsp" %>
        <%@include file="main.jsp" %>
        <%@include file="sidebar.jsp" %>
    </div>

    <script type="text/javascript" src="${ctx}/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script type="text/javascript" src="${ctx}/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <script type="text/javascript" src="${ctx}/js/lib/hplus/hplus.js"></script>
    <script type="text/javascript" src="${ctx}/js/lib/hplus/contabs.js"></script>

    <script type="text/javascript" src="${ctx}/js/plugins/pace/pace.min.js"></script>
    <script type="text/javascript" src="${ctx}/js/plugins/suggest/bootstrap-suggest.min.js?v=${version}"></script>
	<script type="text/javascript">
	
	
		// 标签双击刷新事件
		$(".content-tabs").on("dblclick",".J_menuTab",function(){
			var iframeObj = $(".J_iframe:eq(" + $(this).index() + ")");
			iframeObj.attr("src",iframeObj.attr("src"));
		});
	
        $(function(){

            // 退出按钮
            $('.J_tabExit').click(function(){
                layer.confirm('确认退出当前账号?', {
                    shift: 0,
                    btn: ['确定', '取消'],
                    icon: 3
                }, function(index){
                    window.location.href = ctx + '/logout';
                }, function(index){
                    layer.close(index);
                });
            });

            // 刷新按钮
            $('.J_tabRefresh').click(function(){
                var $currentTab = $('.J_menuTab.active');
                var target = $('.J_iframe[data-id="' + $currentTab.data('id') + '"]');
                var url = target.attr('src');
                var loading = layer.load();
                target.attr('src', url).load(function () {
                    layer.close(loading);
                });
            });
            

        });

        $(function(){

            $(".J_menuTab").on("dblclick",function(){
                var iframeObj = $(".J_iframe:eq(" + $(this).index() + ")");
                console.log("~~~~~" + iframeObj);
                iframeObj.attr("src",iframeObj.attr("src"));
            });

            var menuItemArr = $("#side-menu .J_menuItem");
            var moduleNameArr = initModuleNameArr();
            function initModuleNameArr(){
                var tempArr = [];
                for (var i = 0; i < menuItemArr.length; i++) {
                    tempArr.push({"word":$(menuItemArr[i]).text()});
                }
                return tempArr;
            }

            var searchModuleBsSuggest = $("#topSearch").bsSuggest({
                delay:50, // 搜索触发的延时时间间隔，单位毫秒
                delayUntilKeyup: false, // 获取数据的方式 为 firstByUrl 时，是否延迟到有输入时才请求数据
                data: {
                    'value': moduleNameArr
                }
            }).on('onSetSelectValue', function (e, keyword) { // 选中后回调的方法
                for (var i = 0; i < menuItemArr.length; i++) {
                    var menuItem = $(menuItemArr[i]);
                    if(menuItem.text() == keyword.id){
                        menuItem.click();
                        $("#topSearch").val("");
                        $("#topSearch").attr("placeholder","输入模块名称  (上次搜索 : " + keyword.id + ")");
                        return;
                    }
                }
            });

        });
	</script>
</body>
</html>
