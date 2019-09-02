<%@ page language="java" pageEncoding="UTF-8"%>
    <%-- 左侧导航开始 --%>
    <nav class="navbar-default navbar-static-side" role="navigation">
        <div class="nav-close"><i class="fa fa-times-circle"></i>
        </div>
        <div class="sidebar-collapse">
            <ul class="nav" id="side-menu">
                <li class="nav-header">
                    <div class="dropdown profile-element">
                        <%--<span><img alt="image" class="img-circle" src="${admin.headImgUrl}" width="50" /></span>--%>
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                    <span class="clear">
                                    <span class="block m-t-xs"><strong class="font-bold">${admin.realName}</strong></span>
                                    <span class="text-muted text-xs block">${role eq null ? '暂无角色' : role.name}<b class="caret"></b></span>
                                    </span>
                        </a>
                        <ul class="dropdown-menu animated fadeInRight m-t-xs">
                            <li><a class="J_menuItem" href="${ctx}/setting/account">个人资料</a>
                            </li>
                            <%--<li><a class="J_menuItem" href="form_avatar.html">修改头像</a>
                            </li>
                            <li><a class="J_menuItem" href="contacts.html">联系我们</a>
                            </li>
                            <li><a class="J_menuItem" href="mailbox.html">信箱</a>
                            </li>
                            <li class="divider"></li>--%>
                            <li><a href="${ctx}/logout">安全退出</a>
                            </li>
                        </ul>
                    </div>
                    <div class="logo-element">J</div>
                </li>
                <c:forEach var="menu" items="${menuList}">
                    <c:if test="${menu.childList != null}">
                    <li>
                        <a class="moduleGroup" href="#">
                            <i class="fa ${menu.icon}"></i>
                            <span class="nav-label">${menu.name}</span>
                            <span class="fa arrow"></span>
                        </a>
                        <ul class="nav nav-second-level">
                            <c:forEach var="childMenu" items="${menu.childList}">
                                <li>
                                    <a class="J_menuItem" href="${ctx}${childMenu.url}" data-index="0">${childMenu.name}</a>
                                </li>
                            </c:forEach>
                        </ul>

                    </li>
                    </c:if>
                    <c:if test="${menu.childList == null}">
                    <li>
                        <a class="J_menuItem" href="${ctx}${menu.url}">
                            <i class="fa ${menu.icon}"></i> <span class="nav-label">${menu.name}</span>
                        </a>
                    </li>
                    </c:if>
                </c:forEach>
            </ul>
        </div>
    </nav>
    <%-- 左侧导航结束 --%>
