/**
 * JS组件工具类
 * @author MrHanHao
 * @date 2019-02-27 11:47:11
 */
$(function () {
    var component = {};
    window.ComponentUtils = {
        /**
         * 添加一个组件
         * @param name
         * @param handler
         */
        add: function (name, handler) {
            component[name] = handler;
        }
    };
    // 组件调用
    $.fn.component = function (name) {
        var $self = $(this);
        var dom = this;
        if (name) {
            var handler = component[name];
            if ($.isFunction(handler)) {
                var data =  handler.apply(this, [].slice.call(arguments, 1)) || {};
                data.component = function () {
                    $.fn.component.apply(dom , arguments);
                };
                return data;
            }
            var callComponentData = {
                id: 0,
                callMap: {}
            };
            callComponentData = $.extend(true, {}, callComponentData, ($self.data('COMPONENT_DATA') || {}));
            var has = false;
            for (var id in callComponentData.callMap) {
                if (callComponentData.callMap[id].name == name) {
                    callComponentData.callMap[id].args = cloneArray(arguments);
                    has = true;
                }
            }
            if (!has) {
                callComponentData.callMap[callComponentData.id++] = {args: cloneArray(arguments), name: name};
            }
            $self.data('COMPONENT_DATA', callComponentData);
        }
        var method = new NameMethod(this, component);
        method.init();
        return method;
    };


    __init(ComponentUtils);

    /**
     * 初始化方法
     */
    function __init(ComponentUtils) {
        ComponentUtils.add('component:help', ShowHelp);
        ComponentUtils.add('component:reCall', ReCallCompoent);
        ComponentUtils.add('chosen:unit', ChosenProductUnit);
        ComponentUtils.add('chosen:net', ChosenProductNet);
        ComponentUtils.add('chosen', ChosenInit);
        ComponentUtils.add('chosen:customer', ChosenCustomer);
        ComponentUtils.add('chosen:supplier', ChosenSupplier);
        ComponentUtils.add('chosen:driver', ChosenDriver);
        ComponentUtils.add('chosen:repeat:payAccount', ChosenPayAccountList);
        ComponentUtils.add('chosen:vehicle', ChosenVehicle);
        ComponentUtils.add('chosen:warehouse', ChosenWarehouse);
        ComponentUtils.add('chosen:payAccount', ChosenPayAccount);
        ComponentUtils.add('view:unit', ProductUnit);
        ComponentUtils.add('view:bsSuggest', InputBsSuggestComponent);
        ComponentUtils.add('view:bsSuggestNet', InputBsSuggestNetComponent);
        ComponentUtils.add('view:selectLabel', ViewShotSelectTitle);
        ComponentUtils.add('view:replace', ViewReplace);

        /**
         * 初始化Chosen
         * @param data
         * @param option
         * @constructor
         */
        function ChosenInit(data, option, chosenOption) {
            var $self = $(this);
            var defaultOption = {
                title:'请选择' ,//标题
                showField: 'uid',
                valueField: 'orderNumber',//显示字段
                defaultValue: '', //默认选中的值
                attrField: [] ,
                selectBefore: function ($select, data) { //选择之前进行调用
                    return false;
                }
            };
            option = $.extend(true, {}, defaultOption, option);
            var defaultChosenOption = {
                width: '100%',
                placeholder_text: option.title ,
                before_select : option.selectBefore
            };
            $self.chosen($.extend(true, {}, defaultChosenOption, chosenOption));
            var selectValue = option.defaultValue || $self.val();
            $self.html('');

            for (var i = 0; i < data.length; i++) {
                var html = [];
                var dataItem = data[i];
                var value = dataItem[option.valueField];
                var name = dataItem[option.showField];
                html.push('<option value="');
                if(!selectValue){
                    selectValue = value;
                }
                html.push(value);
                html.push('" ');

                // 追加属性
                for (var j = 0; j < option.attrField.length; j++) {
                    var field = option.attrField[j];
                    value = dataItem[field];
                    if( value !== void(0)) {
                        html.push(' data-' + field);
                        html.push('="' + value + '" ');
                    }
                }
                // 追加显示
                html.push('>' + name + '</option>');
                $self.append(html.join(''));
            }
            $self.val(selectValue).trigger('chosen:updated');
            $self.val(selectValue).trigger('change');
        }
        /**
         * 初始化Customer
         * @param option
         * @constructor
         */
        function ChosenCustomer(option, chosenOption) {
            var url = ctx + '/basedata/customer/query';
            var data = {offset: 0, limit: 99999999};
            var defaultOption = {
                title: '请选择客户',
                showField: 'companyName', //显示的字段，
                valueField: 'uid',//值字段
                defaultSelect: {key: '全部客户', value: ''},
                error: function () {
                    LayerUtils.error("网络出错了呦.....");
                },
                getData:function (res) {
                    return res.data;
                }
            };
            ChosenProductNet.call(this, url, data, $.extend(true, defaultOption, option), chosenOption);
        }
        /**
         * 初始化司机
         * @param option
         * @constructor
         */
        function ChosenDriver(option, chosenOption) {
            var url = ctx + '/basedata/driver/list';
            var data = {offset: 0, limit: 99999999};
            var defaultOption = {
                title: '请选择司机',
                showField: 'name', //显示的字段，
                valueField: 'uid',//值字段
                error: function () {
                    LayerUtils.error("网络出错了呦.....");
                }
            };
            ChosenProductNet.call(this, url, data, $.extend(true, defaultOption, option), chosenOption);
        }
        /**
         * 初始化司机
         * @param option
         * @constructor
         */
        function ChosenVehicle(option, chosenOption) {
            var url = ctx + '/basedata/vehicle/list';
            var data = {offset: 0, limit: 99999999};
            var defaultOption = {
                title: '请选择车辆',
                showField: 'type,plateNumber', //显示的字段，
                valueField: 'uid',//值字段
                error: function () {
                    LayerUtils.error("网络出错了呦.....");
                }
            };
            ChosenProductNet.call(this, url, data, $.extend(true, defaultOption, option), chosenOption);
        }

        /**
         * 初始化Customer
         * @param option
         * @constructor
         */
        function ChosenWarehouse(option, chosenOption) {
            var url = ctx + '/basedata/warehouses/list';
            var data = {offset: 0, limit: 99999999};
            var defaultOption = {
                title: '请选择仓库',
                showField: 'name', //显示的字段，
                valueField: 'uid',//值字段
                defaultSelect: {key: '全部仓库', value: ''},
                error: function () {
                    LayerUtils.error("网络出错了呦.....");
                },
                getData:function (res) {
                    return res.data.list;
                }
            };
            ChosenProductNet.call(this, url, data, $.extend(true, defaultOption, option), chosenOption);
        }

        /**
         * Supplier
         * @param option
         * @constructor
         */
        function ChosenSupplier(option, chosenOption) {
            var url = ctx + '/basedata/supplier/query';
            var data = {offset: 0, limit: 99999999};
            var defaultOption = {
                title: '请选择供应商',
                showField: 'companyName', //显示的字段，
                valueField: 'uid',//值字段
                error: function () {
                    LayerUtils.error("网络出错了呦.....");
                },
                getData:function (res) {
                    return res.data;
                }
            };
            ChosenProductNet.call(this, url, data, $.extend(true, {}, defaultOption, option), chosenOption);
        }

         /**
          * 此方法用于 设置结算账户
          * @author xuzhangyuan
          * @date 15:33 2019/4/22
          */
        function ChosenPayAccountList(option, chosenOption) {
            var url = ctx + '/pay/account/queryPayAccount';
            var data = {offset: 0, limit: 99999999};
            var defaultOption = {
                title: '请选择账户',
                showField: 'name', //显示的字段，
                valueField: 'uid',//值字段
                defaultSelect: {key: '全部账户', value: ''},
                error: function () {
                    LayerUtils.error("网络出错了呦.....");
                },
                getData:function (res) {
                    return res.data;
                }
            };
            ChosenProductNet.call(this, url, data, $.extend(true, {}, defaultOption, option), chosenOption);
        }

        /**
         * 商品单位选择器组件单位的选择器
         * <pre>
         *  Chosen 插件
         * @param option 操作
         * @constructor
         */
        function ChosenProductUnit(option) {
            var defaultOption = {
                units: [], //单位集合
                nameField: 'name', //显示名称的字段
                valueFiled: 'productUnitUid',//值字段
                defaultValue: null,//默认选中的值
                baseUnitField: 'isBase', //基础单位的字段
                attrField: [] //需要显示属性的字段
            };
            var self = this;
            var $self = $(this);
            var $select = $self;
            option = $.extend(true, {}, defaultOption, option);
            var unitData;
            var html = [];
            var value, isBase, name, field;
            var selectValue;
            $self.html('');
            for (var i = 0; i < option.units.length; i++) {
                html = [];
                unitData = option.units[i];
                value = unitData[option.valueFiled];
                name = unitData[option.nameField];
                isBase = unitData[option.baseUnitField];
                html.push('<option value="');
                html.push(value);
                html.push('" ');
                // 判断是否选中
                selectValue = option.defaultValue || value;
                // 追加属性
                for (var j = 0; j < option.attrField.length; j++) {
                    field = option.attrField[j];
                    value = unitData[field];
                    if (value !== void(0)) {
                        html.push(' data-' + field);
                        html.push('="' + value + '" ');
                    }
                }
                // 追加显示
                html.push('>' + name + '</option>');
                $select.append(html.join(''));
            }
            // 初始化
            $select.chosen({
                width: '100%',
                disable_search: true,
                placeholder_text: '请选择单位'
            });
            if (selectValue) {
                $select.val(selectValue).trigger('change');
                $select.val(selectValue).trigger('chosen:updated');
            }
            return $select;
        }

        /**
         * 网络获取数据，进行Ajax请求
         * @param url 请求url
         * @param data 参数
         * @param option 操作对象
         * @param chosenOption Chosen操作对象
         * @constructor
         */
        function ChosenProductNet(url, data, option, chosenOption) {
            var defaultOption = {
                showField: '', //显示的字段，
                valueField: '',//值字段
                title: '请选择', // 标题
                join:' ', //多个显示字段连接符
                split:',',//多个字段显示的分割付
                defaultValue: '',// 默认值
                defaultSelect: {}, // 默认选项
                attrField: [], //需要显示属性的字段
                error: function () { //空数据是进行调用

                },
                selectBefore: function ($select, data) { //选择之前进行调用
                    return false;
                },
                getData: function (res) { //获取数据方式
                    return res.data.list;
                }
            };
            var $self = $(this);
            option = $.extend(true, {}, defaultOption, option);
            chosenOption = $.extend(true, {}, {
                width: '100%',
                placeholder_text: option.title,
                before_select: option.selectBefore
            }, (chosenOption || {}));
            $self.chosen(chosenOption);


            if (!option.defaultValue) {
                option.defaultValue = $self.val();
            }

            RequestUtils.ajaxPost(url, data, function (res) {
                var datas = option.getData(res);
                var showField = option.showField || '';
                showField = showField.split(option.split);
                var valueField = option.valueField || '';
                var map = {};
                var value, title;
                var field;
                $self.html('');
                $self.trigger("chosen:updated");
                if (datas && datas.length > 0) {
                    var data,html;
                    if (option.defaultSelect) {
                         title = option.defaultSelect.key;
                         value = option.defaultSelect.value;
                        if (title) {
                            $self.append('<option value="' + value + '" >' + title + '</option>');
                        }
                    }
                    for (var i = 0; i < datas.length; i++) {
                        html = [];
                        data = datas[i];
                        title = data;
                        value = data;
                        if (showField.length) {
                            title = '';
                            for(var z = 0; z < showField.length; z++){
                                title += data[showField[z]];
                                if(z < showField.length - 1){
                                    title += option.join;
                                }
                            }
                        }
                        if (valueField) {
                            value = data[valueField];
                        }


                        map[value] = data;
                        html = [];

                        html.push('<option value="');
                        html.push(value);
                        html.push('" ');

                        // 追加属性
                        for (var j = 0; j < option.attrField.length; j++) {
                            field = option.attrField[j];
                            value = data[field];
                            if( value !== void(0)) {
                                html.push(' data-' + field);
                                html.push('="' + value + '" ');
                            }
                        }
                        html.push('>' + title + '</option>');
                        $self.append(html.join(''));
                    }
                    $self.data('ChosenProductNet', map);

                    $self.val(option.defaultValue).trigger('chosen:updated');
                    $self.val(option.defaultValue).trigger('change');
                } else {
                    if (_isFun(option.error))
                        option.error();
                }
                $self.change(function () {
                    var value = $(this).val();
                    var map = $self.data('ChosenProductNet');
                    var data = map[value];
                    if (data) {
                        $self.trigger('chosen:change', [data]);
                    }
                });

            });
        }

        /**
         * 商品单位选择器组件单位的选择器
         * <pre>
         *
         *
         * @param option 操作
         * @constructor
         */
        function ProductUnit(option) {
            var defaultOption = {
                units: [], //单位集合
                nameField: 'name', //显示名称的字段
                valueFiled: 'productUnitUid',//值字段
                defaultValue: '',//默认选中的值
                baseUnitField: 'isBase', //基础单位的字段
                attrField: [] //需要显示属性的字段
            };
            var self = this;
            var $self = $(this);
            var $select = $self;
            option = $.extend(true, {}, defaultOption, option);
            var unitData;
            var html = [];
            var value, isBase, name, field;
            var selectValue;

            for (var i = 0; i < option.units.length; i++) {
                html = [];
                unitData = option.units[i];
                value = unitData[option.valueFiled];
                name = unitData[option.nameField];
                isBase = unitData[option.baseUnitField];
                html.push('<option value="');
                html.push(value);
                html.push('" ');
                // 判断是否选中
                if ((!option.defaultValue && isBase) || option.defaultValue == value) {
                    html.push(' selected ');
                }
                // 追加属性
                for (var j = 0; j < option.attrField.length; j++) {
                    field = option.attrField[j];
                    value = unitData[field];
                    if( value !== void(0)) {
                        html.push(' data-' + field);
                        html.push('="' + value + '" ');
                    }
                }
                html.push('>' + name + '</option>');
                $select.append(html.join(''));
            }
            // 追加显示

            return $select;
        }

        /**
         * 初始化Customer
         * @param option
         * @constructor
         */
        function ChosenPayAccount(option, chosenOption) {
            var url = ctx + '/pay/account/list';
            var data = {offset: 0, limit: 99999999};
            var defaultOption = {
                title: '(空)',
                showField: 'name', //显示的字段，
                valueField: 'uid',//值字段
                defaultSelect: {key: '(空)', value: ''},
                error: function () {
                    LayerUtils.error("网络出错了呦.....");
                }
            };
            ChosenProductNet.call(this, url, data, $.extend(true, defaultOption, option), chosenOption);
        }

        /**
         * BsSuggest组件
         * @param option
         * @constructor
         */
        function InputBsSuggestComponent(option) {
            var $input = $(this);
            var defaultOption = {
                effectiveFields: ['productName'],
                idField: 'productUid',
                keyField: 'productName',
                listAlign: 'auto',
                listStyle: {
                    "transition": null, "-webkit-transition": null, "-moz-transition": null, "-o-transition": null
                }
            };
            $input.bsSuggest($.extend(true, {}, defaultOption, option))
                .on("onSetSelectValue", function (e, keyword, rowData) {
                    $input.trigger('suggest:change', [e, keyword, rowData]);
                });
        }

        /**
         * 网络请求的BsSuggest组件
         * @param requestOption
         * @param option
         * @constructor
         */
        function InputBsSuggestNetComponent(requestOption, option) {
            var defaultOption = {
                url: null, //请求地址
                data: {}, //参数数据
                getData: function (res) { //获取相应数据的方式
                    return res.data;
                }
            };
            requestOption = $.extend(true, {}, defaultOption, requestOption);
            RequestUtils.ajaxPost(requestOption.url, requestOption.data, function (res) {
                var data = requestOption.getData(res);
                InputBsSuggestComponent.call(this, $.extend(true, {}, option, {data: {value: data}}));
            });
        }

        /**
         * 绑定显示组件，将需要绑定的组件绑定到制定Select上进行显示，显示选中的Option的data-title
         * @param option
         * @constructor
         */
        function ViewShotSelectTitle(option) {
            var $self = $(this);
            var defaultOption = {
                selectElem: '',
                showAttr: 'data-title',
                trigger: 'change',
                onChange: function (text) {

                }
            };
            option = $.extend(true, {}, defaultOption, option);
            var $select = $(option.select);
            $select.on(option.trigger, function () {
                var optionText = $select.find('option:selected').attr(option.showAttr);
                if (_isFun(option.onChange)) {
                    if (option.onChange.call($self, optionText)) {

                    } else {
                        $self.text(optionText)
                    }
                } else {
                    $self.text(optionText);
                }
            });
            $select.trigger('change');
        }


        /**
         * 显示帮助
         * @constructor
         */
        function ShowHelp() {
            console.log('Component使用方法,$("").component("组件名称",参数...)');
            console.log("当前所有的组件:");
            for (var name in component) {
                console.log('\t' + name)
            }
        }

        /**
         * 替换当前的元素
         * @constructor
         */
        function ViewReplace() {
            var $self = $(this);
            var $clone = $self.clone(true);
            var $div = $('<div></div>');
            $div.append($clone);
            $self.after($div.html());
            $self.remove();
            return $clone;
        }

        function ReCallCompoent() {
            var $self = $(this);
            var callComponentData = {
                callMap: {}
            };
            callComponentData = $.extend(true, {}, callComponentData, ($self.data('COMPONENT_DATA') || {}));
            var callArray;
            for (var name in callComponentData.callMap) {
                callArray[parseInt(name)] = callComponentData.callMap[name];
            }
            for (var i = 0; i < callArray.length; i++) {
                var callData = callArray[i];
                $self.compoent.apply($self, callData.args);
            }
        }

        function _isFun(fun) {
            return $.isFunction(fun);
        }

    }

    function cloneArray(array) {
        var a = [];
        for (var i = 0; i < array.length; i++) {
            a.push(array[i]);
        }
        return a;
    }


    function NameMethod(self, component) {
        var $self = $(self);


        this.init = function () {
            for (var names in component) {
                var nameArray = names.split(':');
                parseMethod(names, this, nameArray, 0)
            }
            return this;
        };

        function parseMethod(fullName, obj, nameArray, depth) {
            if (!nameArray || !nameArray.length) {
                return;
            }
            var name = nameArray[depth];
            // 判断是否是末尾
            if (depth >= nameArray.length -1) {
                parseNameMethod(name, fullName, obj);
            } else {
                obj[name] = obj[name] || {};
                if(typeof obj[name] === 'function'){
                    name = '$_' + name;
                    obj[name] = obj[name] || {};
                }
                parseMethod(fullName, obj[name], nameArray, depth + 1)
            }
        }

        function parseNameMethod(name, fullName, obj) {
            obj[name] = function () {
                $self.component(fullName, [].slice.call(arguments, 1));
            }
        }
    }
});

