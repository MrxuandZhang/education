/**
 * bootstrape-table tools
 *
 */
(function (window, $, DateUtils, LayerUtils) {

    // 设置默认参数
    $.fn.bootstrapTable.defaults.method = 'post';
    $.fn.bootstrapTable.defaults.dataType = 'json';
    $.fn.bootstrapTable.defaults.contentType = 'application/x-www-form-urlencoded';
    $.fn.bootstrapTable.defaults.sidePagination = 'server';
    $.fn.bootstrapTable.defaults.search = false;
    $.fn.bootstrapTable.defaults.striped = true;
    $.fn.bootstrapTable.defaults.pagination = true;
    $.fn.bootstrapTable.defaults.pageList = [500, 1000, 1500];
    $.fn.bootstrapTable.defaults.pageSize = 500;
    $.fn.bootstrapTable.defaults.showRefresh = false;
    $.fn.bootstrapTable.defaults.showColumns = true;
    $.fn.bootstrapTable.defaults.iconSize = 'outline';
    $.fn.bootstrapTable.defaults.toolbar = '#bootstrapTableToolBar';
    $.fn.bootstrapTable.defaults.icons = {
        refresh: 'glyphicon-repeat',
        columns: 'glyphicon-list'
    };
    $.fn.bootstrapTable.defaults.responseHandler = function (res) {
        return {
            total: res.data.total,
            rows: res.data.list
        }
    };
    $.fn.bootstrapTable.defaults.onPostBody = function () {
        var classes = this.classes.split(" ");
        var selectorClass = "";
        for (var i = 0; i < classes.length; i++) {
            selectorClass += "." + classes[i];
        }
        var $fixedTableContainer = $(selectorClass).parents('.fixed-table-container');
        $fixedTableContainer.removeAttr("style");
    };

    var TableUtils = function () {

        this.initTable = function (tableId, options) {

            tableId = '#' + tableId;

            var $table = $(tableId);
            $table.attr('data-height', '700');

            var table = $table.bootstrapTable("destroy").bootstrapTable(options);

            $('#create-btn').click(function () {
                var url = $(this).attr('data-url');
                var title = $(this).attr('title');
                var width = $(this).attr('data-width');
                var height = $(this).attr('data-height');
                LayerUtils.openFrame({
                    url: url,
                    title: '',
                    closeBtn: 0,
                    width: width,
                    height: height
                });
            });

            $('#search-btn').click(function () {
                $(tableId).bootstrapTable('refresh', {pageNumber: 1});
            });

            $('#reset-btn').click(function () {
                $('#search-form')[0].reset();
                $(tableId).bootstrapTable('refresh', {pageNumber: 1});
            });

            /*$(window).resize(function () {
                var height = $(window).height();
                var $bootstrapTable = $(tableId).parents('.bootstrap-table'),
                    $fixedTableContainer = $bootstrapTable.find('.fixed-table-container');
                height = height -129;
                if($(tableId).height() < (height-19)){
                    height = $(tableId).height() + 19;
                }
                $fixedTableContainer.css({'height': height});
            });*/

            return table;
        };

        this.dateFormatter = function (value, row, index) {
            return DateUtils.format(value);
        };

        this.dateYMDFormatter = function (value, row, index) {
            return DateUtils.formatYYYYMMDD(value);
        };

        this.decimalFormatter = function (value, row, index) {
            return value ? parseFloat(value).toFixed(2) + '' : '0.00';
        };

        this.quantityFormatter = function (value, row, index) {
            return value ? parseFloat(value).toFixed(3) + '' : '0.000';
        };

        /**
         * 按钮转换，需要实体类有buttonList参数
         * @author MrHanHao
         * @date 2019-01-09 10:21:57
         */
        this.orderButtonFormatter = function (value, row, index) {
            var result = "";
            var buttonList = row.buttonList;
            if (!buttonList) return '';

            for (var i = 0; i < buttonList.length; i++) {
                var btn = buttonList[i];
                if (!btn) continue;
                for (var name in btn) {
                    var button = btn[name];
                    if (!button) continue;
                    if (button.htmlTagAttribute) {
                        result += '<a href="javascript:;"' + (button.htmlTagAttribute) + ' data-id="' + value + '" title="' + name + '">' + name + '</a>';
                    }
                    if (button.javascriptFunction) {
                        $('body').append(button.javascriptFunction);
                    }
                }
            }
            return result;
        };
        /**
         * 状态栏的格式化方法
         * @param value
         * @param row
         * @param index
         */
        this.orderStateFormatter = function (value, row, index) {
            switch (value) {
                case 0:
                    return "草稿";
                case 1:
                    return "已确认";
                case 100:
                    return "审核中";
                case 101:
                    return "审核成功";
                case 102:
                    return "审核失败";
                case 200:
                    return "已生成采购单";
                case 300:
                    return "已入库";
                case 301:
                    return "部分入库";
                case 400:
                    return "已出库";
                case 401:
                    return "部分出库";
                case 501:
                    return "已入库";
                case 702:
                    return "已出库";
                case 500:
                    return "已入库";
                case 600:
                    return "已退货";
                case 601:
                    return "部分退货";
                case 700:
                    return "已出库";
                case 800:
                    return "已退款";
                case 900:
                    return "已发货";
                case 901:
                    return "待发货";
                case 1000:
                    return "完成盘点";
                case 1202:
                    return "待配送";
                case 1201:
                    return "已配送";
                case 1300:
                    return "配送中";
                case 1400:
                    return "已开票";
                case 1500:
                    return "已送达";
                case 1600:
                    return "已收款";
                case 1700:
                    return "已付款";
                case 701:
                    return "待出库";
                case 502:
                    return "待入库";
                default:
                    return '未知状态';
            }
        }

    };

    window.TableUtils = new TableUtils();

})(window, jQuery, DateUtils, LayerUtils);