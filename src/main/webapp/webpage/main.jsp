<%@ page language="java" pageEncoding="UTF-8"%>
<%-- 右侧主要内容部分开始 --%>
<div id="page-wrapper" class="gray-bg dashbard-1">
    <div class="row border-bottom">
        <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#">
                    <i class="fa fa-bars"></i>
                </a>
                <div class="input-group col-sm-6" style="margin-left:60px;">
                    <input type="text" class="form-control minimalize-styl-2" style="margin-left:0px;height:40px;font-size:16px;" placeholder="输入模块名称，确认后，自动跳转" id="topSearch" name="topSearch">
                    <div class="input-group-btn ">
                        <ul class="dropdown-menu dropdown-menu-right" role="menu">
                        </ul>
                    </div>
                </div>
            </div>
            <ul class="nav navbar-top-links navbar-right">
                <li class="dropdown hidden-xs">
                    <a class="right-sidebar-toggle" aria-expanded="false">
                        <i class="fa fa-tasks"></i> 主题
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    <div class="row content-tabs">
        <button class="roll-nav roll-left J_tabLeft"><i class="fa fa-backward"></i>
        </button>
        <nav class="page-tabs J_menuTabs">
            <div class="page-tabs-content">
                <a href="javascript:void(0);" class="active J_menuTab" data-id="${ctx}/welcome">首页</a>
            </div>
        </nav>
        <button class="roll-nav roll-right J_tabRight"><i class="fa fa-forward"></i>
        </button>
        <button class="roll-nav roll-right J_tabRefresh"><i class="fa fa-refresh"></i>
        </button>
        <div class="btn-group roll-nav roll-right">
            <button class="dropdown J_tabClose" data-toggle="dropdown">关闭操作<span class="caret"></span>

            </button>
            <ul role="menu" class="dropdown-menu dropdown-menu-right">
                <li class="J_tabShowActive"><a>定位当前选项卡</a>
                </li>
                <li class="divider"></li>
                <li class="J_tabCloseAll"><a>关闭全部选项卡</a>
                </li>
                <li class="J_tabCloseOther"><a>关闭其他选项卡</a>
                </li>
            </ul>
        </div>
        <button class="roll-nav roll-right J_tabExit"><i class="fa fa fa-sign-out"></i> 退出
        </button>
    </div>
    <div class="row J_mainContent" id="content-main">
        <iframe class="J_iframe" name="iframe0" width="100%" height="100%" src="${ctx}/webpage/welcome.jsp"
                frameborder="0" data-id="${ctx}/welcome" seamless></iframe>
    </div>
    <div class="footer" style="text-align: center;">
        2018 © Copyright <a href="https://www.baidu.com/" target="_blank">厦门XXX科技有限公司</a>
    </div>
</div>
<%-- 右侧主要内容部分结束 --%>
