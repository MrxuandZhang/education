<%@ page language="java" pageEncoding="UTF-8" %>
<!DOCTYPE HTML>
<html>
<head>
    <%@include file="./head-meta.jsp" %>
    <%@include file="./form-meta.jsp" %>
    <%@include file="./table-meta.jsp" %>

    <title>${projectName}后台管理系统</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content">
    <div class="ibox">
        <div class="ibox-title">
            <h5>动态信息</h5>
        </div>
        <div class="ibox-content">
            <div class="btn-group" id="bootstrapTableToolBar" role="group">
                <form id="search-form" class="form-inline">
                    <div class="form-group">
                        <button id="create-btn" type="button" data-width="100%" data-height="100%"
                                class="btn btn-primary" title="新增"
                                data-url="${ctx}/finance/order/payment/create">
                            <i class="glyphicon glyphicon-plus" aria-hidden="true"></i> 新增
                        </button>
                        <div class="form-group" id="data_4">
                            <div class="input-group date">
                                <input class="laydate-icon form-control layer-date" placeholder="起始日期" id="startTime"
                                       name="startTime">
                            </div>
                            <div class="input-group date">
                                <input class="laydate-icon form-control layer-date" placeholder="截止日期" id="endTime"
                                       name="endTime">
                            </div>
                        </div>
                        <input class="form-control input-outline enterFlush" type="text" id="tradingPartnersUid"
                               placeholder="">
                        <%--<select class="form-control changeFlush" id="search-column-accountType">--%>
                        <%--<option value="">-- 账目类型 --</option>--%>
                        <%--<option value="2">采购支出</option>--%>
                        <%--<option value="4">销售退货支出</option>--%>
                        <%--</select>--%>
                        <%--<input class="form-control input-outline auditor enterFlush" type="text"--%>
                        <%--placeholder="审核人">--%>

                        <%--<select class="form-control changeFlush" id="search-column-type">--%>
                        <%--<option value="">-- 单据状态 --</option>--%>
                        <%--<option value="0">草稿</option>--%>
                        <%--<option value="100">审核中</option>--%>
                        <%--<option value="101">已付款</option>--%>
                        <%--<option value="102">审核失败</option>--%>
                        <%--</select>--%>

                        <button id="search-btn" type="button" class="btn btn-outline btn-primary" title="查询">
                            <i class="glyphicon glyphicon-search" aria-hidden="true"></i> 查询
                        </button>
                        <button id="reset-btn" type="button" class="btn btn-outline btn-primary" title="重置">
                            <i class="glyphicon glyphicon-repeat" aria-hidden="true"></i> 重置
                        </button>
                        <%-- 导出 --%>
                        <button id="export-btn" type="button" class="btn btn-outline btn-primary" title="导出">
                            导出
                        </button>

                    </div>
                </form>
            </div>
            <table id="bootstrapTable">
                <thead>
                <tr>
                    <th data-field="createTime" data-width="10%"
                        data-formatter="TableUtils.dateFormatter">日期
                    </th>
                    <th data-field="title" data-formatter="titleFormatter">标题</th>
                    <th data-field="isNew" data-formatter="newFormatter">
                        是否推荐
                    </th>
                    <th data-field="content" data-width="10%" data-formatter="textFormatter">正文
                    </th>
                    <th data-field="uid" data-formatter="actionFormatter" data-width="15%">操作</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
</body>
<script type="text/javascript">

    /**
     * 时间控件调用
     */
    // CommonUtils.initDateTimePicker('#startTime', '#endTime');

    function titleFormatter(value, row) {
        return row.title.substr(0, 5);
    }

    function newFormatter(value, row) {
        // console.log(row)
        return row.isNew == "1" ? "推荐" : "不推荐";
    }

    function textFormatter(value, row) {
        return row.content.substr(0, 5);
    }

    /**
     * 操作栏按钮的格式化
     */
    function actionFormatter(value, row, index) {
        var result = "";
        result += '<a href="javascript:;" class="btn btn-xs btn-outline btn-primary edit" data-id="' + row.uid + '" title="编辑">编辑</a>';
        result += '<a href="javascript:;" class="btn btn-xs btn-outline btn-primary details"  data-id="' + row.uid + '"  title="详情">详情</a>';
        return result;
    }


    /**
     * 编辑方法
     */
    function openEdit(id, title) {
        var url = ctx + "/news/to/edit?uid=" + id;
        LayerUtils.openFrame({
            url: url,
            title: title
        });
    }

    function initTable() {

        TableUtils.initTable('bootstrapTable', {
            url: ctx + '/news/list',
            queryParams: function (params) {
                return params;
            }
        });
    }

    $(function () {

        // 初始话表格插件
        initTable();

        /**
         *  编辑信息
         * */
        $(document).on('click', '.edit', function () {
            openEdit($(this).attr('data-id'), "编辑");
        });

        /**
         *  获取详情页
         * */
        $(document).on('click', '.details', function () {
            var url = ctx + '/news/detail?uid=' + $(this).data('id');
            var title = $(this).attr('title');
            LayerUtils.openFrame({
                url: url,
                title: title
            });
        });

        /**
         * 此方法用于删除账户
         * */
        $(document).on('click', '.del', function () {
            var url = ctx + '/news/delete';
            var data = {uid: $(this).attr('data-id')};
            layer.confirm('确认要删除该账户？删除后不可恢复', {
                shift: 0,
                btn: ['确定', '取消'],
                icon: 3
            }, function (index) {
                RequestUtils.ajaxPost(url, data, function () {
                    flushTable();
                });
                layer.close(index);
            }, function (index) {
                layer.close(index);
            });
        });


    });

    /**
     *Change提交表单
     */
    $(document).on("change", ".changeFlush", flushTable);

    /**
     * 键盘弹起刷新
     */
    $(document).on("keyup", ".enterFlush", flushTable);

    /**
     * 刷新表格
     */
    function flushTable() {
        $('#bootstrapTable').bootstrapTable('refresh');
    }

</script>
</html>
