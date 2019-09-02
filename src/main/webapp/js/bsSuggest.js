/**
 * 封装了下拉输入
 * 通常如果需要使用BsSuggest下拉输入时，必须在制定的input节点下拥有下拉列表的节点，才可以是一个合法的下拉输入，
 * 当前js对其进行封装，自动创建下拉列表的节点<div><ul></ul></div>.....
 * <br/>修改 MrHanHao 2018-12-04 14:22:23 20181204142223 备注:通过set设置下拉框后，可以根据返回的对象的setData方法，改变下拉的值
 * @author HanHao
 * @date 2018-11-22 10:49
 */

/**
 * 下拉选择框
 */
var BsSuggestUtils = new function () {

    var __defaultOption = {
        data: {},
        effectiveFields: ["name"],
        idField: "id",
        keyField: "name",
        listAlign: "auto"
    };

    /**
     * 获取Bssuggest配置
     */
    function getOoption() {
        return JSON.parse(JSON.stringify(__defaultOption))
    }

    /**
     * 获取默认的bsSuggest配置
     * @param change function(option)
     */
    this.changeDefaultOption = function (change) {
        //判断用户是否需要自己设置参数
        if (change && 'function' == typeof  change)
            change(__defaultOption);
    };
    /**
     * 设置下拉框
     * @param option
     */
    this.set = function (option) {
        var bsOption = getOoption();  //默认的配置
        var setParam = option.setParam;//获取设置方法
        var ele = option.ele;//设置需要绑定的ele
        var onSucess = option.onSucess || option.onsuccess || option.success;//当AJAX请求数据成功时触发，并传回结果到第二个参数
        var onSelectValue = option.onSelectValue || option.onselectvalue || option.selectvalue || option.select;//从下拉菜单选取值时触发，并传回设置的数据到第二个参数
        var onInputValue = option.onInputValue || option.oninputvalue || option.inputvalue || option.input;//当设置了idField，且自由输入内容时触发（与背景警告色显示同步）
        var onShow = option.onShow || option.onshow || option.show;//下拉菜单显示时触发
        var onHide = option.onHide || option.onhide || option.hide;//下拉菜单隐藏式触发
        var isCreate = option.isCreate || true;//是否创建
        var align = option.align || "left";
        var eleParent = $(ele).parent();
        if (!ele) return;
        if (isCreate) {
            var menu = "<div class=\"input-group-btn\"><ul class=\"dropdown-menu dropdown-menu-" + align + "\" role=\"menu\"></ul></div>";
            $(ele).after(menu);
        }
        if (!$(eleParent).hasClass("input-group")) {
            $(eleParent).addClass("input-group")
        }

        //判断用户是否需要自己设置参数
        if (setParam && 'function' == typeof  setParam)
            setParam(bsOption);
        /**
         * 事件调用，及床架输入下拉
         */
        $(ele).bsSuggest(bsOption).on('onDataRequestSuccess', function (e, result) {
            if (onSucess && 'function' == typeof  onSucess)
                onSucess(e, result);
        }).on('onSetSelectValue', function (e, selectedData, selectedRawData) {
            if (onSelectValue && 'function' == typeof  onSelectValue)
                onSelectValue(e, selectedData, selectedRawData);
        }).on('onUnsetSelectValue', function (e) {
            if (onInputValue && 'function' == typeof  onInputValue)
                onInputValue(e)
        }).on('onShowDropdown', function (e, data) {
            if (onShow && 'function' == typeof  onShow)
                onShow(e, data)
        }).on('onHideDropdown', function (e, data) {
            if (onHide && 'function' == typeof  onHide)
                onHide(e, data)
        });

        return new Object({
            data: bsOption.data,
            setData: function (data) {
                if (this.data && this.data.value) {
                    var value = this.data.value;
                    if (data && 'array' == typeof data) {
                        value.splice(0, value.length);
                        for (var i = 0; i < data.length; i++) {
                            value.push(data[i]);
                        }
                    }
                }
            }
        });

    }
};
