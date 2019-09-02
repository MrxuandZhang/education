
$(function(){

    $('.number-input').each(function(){
        var $self = $(this);
        var value = $self.val() * 1;
        $self.val(value.toFixed(3));
    });

    $('.decimal-input').each(function(){
        var $self = $(this);
        var value = $self.val() * 1;
        $self.val(value.toFixed(2));
    });

    $(document).on('input', '.number-input', function(){
        var $self = $(this);
        var value = $self.val();

        // 清除"数字"和"."以外的字符
        value= value.replace(/[^\d.]/g, '');
        // 验证第一个字符是数字
        value = value.replace(/^\./g, '');
        // 0开头的整数 清除第一个0
        value = value.replace(/^(0)([\d])/g, '$2');
        // 只保留第一个, 清除多余的
        value = value.replace(/\.{2,}/g, '.');
        value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
        // 只能输入两个小数
        value = value.replace(/^(\-)*(\d+)\.(\d*).*$/, '$1$2.$3');

        $self.val(value);
    });

    $(document).on('blur', '.number-input', function(){
        var $self = $(this);
        var value = $self.val() * 1;
        /*var minValue = $self.attr('data-min')*1;
        var maxValue = $self.attr('data-max')*1;
        if(!minValue){
            minValue = 0;
        }
        if(!value){
            value = minValue;
        }
        if(value < minValue){
            value = minValue;
        }
        if(maxValue && value > maxValue){
            value = maxValue;
        }*/
        // value = parseFloat(value);
        // $self.val(value.toFixed(3));
        value = parseFloat(value);
        $self.val(isNaN(value) ? 0 : value);
    });

    $(document).on('input', '.decimal-input', function(){
        var $self = $(this);
        var value = $self.val();
        var t = value.charAt(0);

        // 清除"数字"和"."以外的字符
        value= value.replace(/[^\d\.]/g, '');
        // 0开头的整数 清除开头连续的0
        value = value.replace(/^(0+)([\d])/g, '$2');
        //value = value.replace(/^(\.+)([\d])/g, '$2');
        // 只保留第一个, 清除多余的
        value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
        // 只能输入两个小数
        value = value.replace(/^(\-)*(\d+)\.(\d{1,2}).*$/, '$1$2.$3');
        if(t == '-'){
            value = '-' + value;
        }

        /*var minValue = $self.attr('min-value');
        if(minValue){
        }
        if(!value){
            value = minValue;
        }
        if(value < minValue){
            value = minValue;
        }*/
        $self.val(value);
    });

    $(document).on('blur', '.decimal-input', function(){
        var $self = $(this);
        var value = $self.val() * 1;
        if(value == '-'){
            value = 0;
        }
        value = parseFloat(value);
        $self.val(value.toFixed(2));
    });

    $('form input').attr('autocomplete', 'off');

});

var CommonUtils = CommonUtils || {};

/**
 * 初始化时间控件
 */
CommonUtils.initDateTimePicker = function(startDateInput, endDateInput){
    var $startDateInput = $(startDateInput);
    var $endDateInput = $(endDateInput);
    var options = {
        lang:'ch',
        timepicker:false,
        allowBlank:true,
        format:'Y-m-d'
    };

    // 开始时间
    options.onShow = function( ct ) {
        this.setOptions({
            maxDate: $endDateInput.val() ? $endDateInput.val().replace(/-/g,"/") : '-1970/01/02'
        });
    };
    $startDateInput.datetimepicker(options);

    // 结束时间
    options.onShow = function( ct ) {
        this.setOptions({
            minDate: $startDateInput.val() ? $startDateInput.val().replace(/-/g,"/") : false
        });
    };
    $endDateInput.datetimepicker(options);
};

CommonUtils.formatDecimal = function(demcimal){
    return demcimal ? parseFloat(demcimal).toFixed(2) : '0.00';
};


CommonUtils.formatStockDecimal = function(demcimal){
    return demcimal ? parseFloat(demcimal).toFixed(3) : '0.000';
};





(function($){
    /**
     * 序列化
     * @returns {{}}
     */
    $.fn.serializeObject = function(){
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);


(function (window) {
    function NumberUtils() {
        /**
         * 转换为float
         * @param val
         * @param error
         * @return {*}
         */
        this.float = function (val , error) {
            error = parseFloat(error);
            error = isNaN(error) ? 0 : error;
            val = parseFloat(val);
            if(isNaN(val)){
                return error;
            }
            return val;
        };
        /**
         * 转换为Int
         * @param val
         * @param error
         * @return {*}
         */
        this.int = function (val , error) {
            error = parseInt(error);
            error = isNaN(error) ? 0 : error;
            val = parseInt(val);
            if(isNaN(val)){
                return error;
            }
            return val;
        };

        this.num = function (num) {
            if(isNaN(num + 1)){
                return '-'
            }
            return num;
        }
    }

    window.NumberUtil = new NumberUtils();
}(window));


function bindAttachmentUpload(element, attachmentList){

    var defaultHtml =
        '<div class="attachment-upload">\
            <input type="file" id="attachment-upload-input" name="file" accept=".jpg,.jpeg,.bmp,.png,.JPG,.BMP,.JPEG,.PNG,.gif,.doc,.docx,.pdf,.xls,.xlsx,.zip,.rar,.txt">\
            <a class="attachment-upload-btn">\
                <i class="iconfont icon-fujian"></i>\
                <span>添加附件</span>\
            </a>\
            <span>（单个附件最大支持20M，支持格式：PDF、Word、Excel、Txt、JPG、PNG、BMP、GIF、RAR、ZIP）</span>\
        </div>\
        <div class="attachment-upload-list">\
        </div>';

    $(element).append(defaultHtml);

    if(attachmentList && attachmentList.length > 0){
        var attachment;
        for(var i=0; i<attachmentList.length; i++){
            attachment = attachmentList[i];
            $('.attachment-upload-list').append(getAttachmentItemHtml(attachment.attachmentUrl, attachment.name, attachment.size));
        }
    }else{
        $(element).append('<div class="attachment-upload-none">暂无附件</div>');
    }

    $('.attachment-upload-btn').click(function(){
        $('#attachment-upload-input').click();
    });

    $(document).on('change', '#attachment-upload-input', function(){
        var fileName = $(this).val();
        var url = ctx + '/oss/upload?type=1';
        RequestUtils.uploadAttachment(url, fileName, 'attachment-upload-input', function(data){
            $('.attachment-upload-list').siblings('.attachment-upload-none').remove();
            $('.attachment-upload-list').append(getAttachmentItemHtml(data.saveName, data.originalName, data.size));
        });
    });

    function getAttachmentItemHtml(saveName, originalName, size){
        // encodeURIComponent 转义通过url传输的特殊字符
        var downloadUrl = ctx + '/attachment/download?attachmentName=' + encodeURIComponent(saveName) + '&downloadName=' + encodeURIComponent(originalName);
        var html = '<div class="attachment-upload-item">\
                        <a target="_blank" href="'+ downloadUrl +'">\
                            <i class="iconfont '+ getFileIconClass(saveName) +'"></i>\
                            <span title="'+ originalName +'" data-url="'+ saveName +'" data-size="'+ size +'">'+ originalName +'</span>\
                        </a>\
                        <i class="fa fa-trash action-delete"></i>\
                    </div>';
        return html;
    }

    function getFileIconClass(fileName){
        var suffix = fileName.slice(fileName.lastIndexOf('.'));
        suffix = suffix.toLowerCase();
        if($.inArray(suffix, [".jpg",".jpeg",".bmp", ".png", ".gif"]) > -1){
            return 'icon-img';
        }
        if($.inArray(suffix, ['.doc', '.docx']) > -1){
            return 'icon-word';
        }
        if($.inArray(suffix, ['.xls', '.xlsx']) > -1){
            return 'icon-excel';
        }
        if('.pdf' === suffix){
            return 'icon-pdf';
        }
        if('.txt' === suffix){
            return 'icon-txt';
        }
        if($.inArray(suffix, ['.zip', '.rar']) > -1){
            return 'icon-zip';
        }
    }

    // 删除
    $(document).on('click', '.attachment-upload-item .action-delete', function(){
        $(this).parents('.attachment-upload-item').remove();
        if($('.attachment-upload-item').length <= 0){
            $('.attachment-upload-list').after('<div class="attachment-upload-none">暂无附件</div>');
        }
    });
}

function initAttachment(element, attachmentList){

    var defaultHtml = '<div class="attachment-upload-list" style="margin-top: 0"></div>';

    $(element).append(defaultHtml);

    if(attachmentList && attachmentList.length > 0){
        var attachment;
        for(var i=0; i<attachmentList.length; i++){
            attachment = attachmentList[i];
            $('.attachment-upload-list').append(getAttachmentItemHtml(attachment.attachmentUrl, attachment.name, attachment.size));
        }
    }

    function getAttachmentItemHtml(saveName, originalName, size){
        // encodeURIComponent 转义通过url传输的特殊字符
        var downloadUrl = ctx + '/attachment/download?attachmentName=' + encodeURIComponent(saveName) + '&downloadName=' + encodeURIComponent(originalName);
        var html = '<div class="attachment-upload-item">\
                        <a target="_blank" href="'+ downloadUrl +'">\
                            <i class="iconfont '+ getFileIconClass(saveName) +'"></i>\
                            <span title="'+ originalName +'" data-url="'+ saveName +'" data-size="'+ size +'">'+ originalName +'</span>\
                        </a>\
                    </div>';
        return html;
    }

    function getFileIconClass(fileName){
        var suffix = fileName.slice(fileName.lastIndexOf('.'));
        suffix = suffix.toLowerCase();
        if($.inArray(suffix, [".jpg",".jpeg",".bmp", ".png", ".gif"]) > -1){
            return 'icon-img';
        }
        if($.inArray(suffix, ['.doc', '.docx']) > -1){
            return 'icon-word';
        }
        if($.inArray(suffix, ['.xls', '.xlsx']) > -1){
            return 'icon-excel';
        }
        if('.pdf' === suffix){
            return 'icon-pdf';
        }
        if('.txt' === suffix){
            return 'icon-txt';
        }
        if($.inArray(suffix, ['.zip', '.rar']) > -1){
            return 'icon-zip';
        }
    }
}

/**
 * 获取附件信息
 * @param $sele
 */
function getAttachment($sele) {
    var files = [];
    $sele.each(function(){
        var name = $(this).attr('title');
        var size = $(this).attr('data-size');
        var attachmentUrl = $(this).attr('data-url');
        files.push({
            name: name,
            size: size * 1,
            attachmentUrl: attachmentUrl
        });
    });

    return files;
}

function getUnitRelate(unitList){
    if(unitList.length == 1){
        return '-';
    }
    var len = unitList.length;
    var unitNames = [];
    var baseUnitName;
    for(var i=0; i<len; i++){
        if(unitList[i].rate == 1){
            baseUnitName = unitList[i].unitName;
        }
    }
    for(var j=0; j<len; j++){
        if(unitList[j].rate != 1){
            unitNames.push(unitList[j].unitName + '(' + unitList[j].rate + baseUnitName +')');
        }else{
            unitNames.push(unitList[j].unitName);
        }
    }
    return unitNames.join('/');
}

/**
 * 公共方法
 * @constructor
 */
var Public = function() {

    /**
     * 初始化客户输入搜索框
     */
    this.initCustomerSearchInput = function(){
        $('#search-customer').bsSuggest({
            url: ctx + '/basedata/customer/list?search=',
            getDataMethod: "url",
            effectiveFields: ['companyName'],
            keyField: 'companyName',
            listAlign: 'auto',
            listStyle: {
                "transition": null, "-webkit-transition": null, "-moz-transition": null, "-o-transition": null
            },
            fnAdjustAjaxParam: function(){
                return {
                    type : 'POST'
                };
            },
            fnProcessData: function(res){
                return {value: res.data.list};
            }
        }).on('onSetSelectValue', function (e, data, rowData) {
            $('#customer').val(rowData.uid);
        });

        $('#select-customer').on('click', function(e){
            e.preventDefault();
            layer.open({
                content:ctx + '/basedata/customer/to/search',
                type:2,
                title:'选择客户',
                area:['800px' , '600px'],
                btn:['确认' , '取消'],
                success:function($layer){

                },
                yes:function (index , $layer) {
                    var childWindow = $layer.find('iframe')[0].contentWindow;
                    var rows = childWindow.getSelectItem();
                    if(rows.length < 1){
                        LayerUtils.errorTips("请选择一个客户");
                        return;
                    }
                    $('#customer').val(rows[0].uid);
                    $('#search-customer').val(rows[0].companyName);
                    layer.close(index);
                }
            });
        });
    };

    /**
     * 初始化供应商输入搜索框
     */
    this.initSupplierSearchInput = function(){
        $('#search-supplier').bsSuggest({
            url: ctx + '/basedata/supplier/list?search=',
            getDataMethod: "url",
            effectiveFields: ['companyName'],
            keyField: 'companyName',
            listAlign: 'auto',
            listStyle: {
                "transition": null, "-webkit-transition": null, "-moz-transition": null, "-o-transition": null
            },
            fnAdjustAjaxParam: function(){
                return {
                    type : 'POST'
                };
            },
            fnProcessData: function(res){
                return {value: res.data.list};
            }
        }).on('onSetSelectValue', function (e, data, rowData) {
            $('#supplier').val(rowData.uid);
        });

        $('#select-supplier').on('click', function(e){
            e.preventDefault();
            layer.open({
                content:ctx + '/basedata/supplier/to/search',
                type:2,
                title:'选择供应商',
                area:['800px' , '600px'],
                btn:['确认' , '取消'],
                success:function($layer){

                },
                yes:function (index , $layer) {
                    var childWindow = $layer.find('iframe')[0].contentWindow;
                    var rows = childWindow.getSelectItem();
                    if(rows.length < 1){
                        LayerUtils.errorTips("请选择一个供应商");
                        return;
                    }
                    $('#supplier').val(rows[0].uid);
                    $('#search-supplier').val(rows[0].companyName);
                    layer.close(index);
                }
            });
        });
    };

    /**
     * 初始化选择商品输入框
     * @param url
     * @param $input
     * @param callback
     */
    this.initProductSearchInput = function (url, $input, callback){
        $input.bsSuggest({
            url: ctx + '/product/listForOrder',
            getDataMethod: "url",
            effectiveFields: ['showName'],
            keyField: 'showName',
            listAlign: 'auto',
            listStyle: {
                "transition": null, "-webkit-transition": null, "-moz-transition": null, "-o-transition": null
            },
            fnAdjustAjaxParam: function(search){
                var ajaxParam = {};
                var supplierUid = $('#supplier').val();
                var customerUid = $('#customer').val();
                var warehouseUid = $('#warehouse-select').val();
                if(supplierUid){
                    ajaxParam.data = {
                        supplierUid: supplierUid
                    }
                }
                if(customerUid){
                    ajaxParam.data = {
                        customerUid: customerUid
                    }
                }
                if(warehouseUid){
                    ajaxParam.data = {
                        warehouseUid: warehouseUid
                    }
                }

                ajaxParam.data = ajaxParam.data || {};
                ajaxParam.data.search = search;
                ajaxParam.data.offset = 0;
                ajaxParam.data.limit = 500;

                ajaxParam.type = 'POST';
                return ajaxParam;
            },
            fnProcessData: function(res){
                if(!res.data || res.data.length == 0){
                    return false;
                }
                return {value: res.data.list};
            }
        }).on('onSetSelectValue', function (e, data, rowData) {
            var $tr = $(e.target).parents('tr');
            callback($tr, rowData);
            if($('#product-table tr.product-input').length == 0){
                $tr.find('.icon-plus').trigger('click');
            }
        }).on('onShowDropdown' , function (e, data) {

        });

        $input.siblings('.select-product').on('click', function(e){
            e.preventDefault();
            var $tr = $(this).parents('tr');
            var selectProductCallBack = function(products){
                $tr.removeClass("product-input");
                $tr.addClass("product");
                if(!products || products.length <=0){
                    return;
                }
                for(var i=0; i<products.length; i++){
                    var rowData = products[i];
                    callback($tr, rowData);
                    $tr.find('.icon-plus').trigger('click');
                    $tr = $tr.next();
                }
            };
            selectProducts(selectProductCallBack);
        });
    };

    function selectProducts(yesCallback){
        layer.open({
            content:ctx + '/product/to/search',
            type:2,
            title:'选择商品',
            area:['80%' , '600px'],
            btn:['确认' , '取消'],
            success:function($layer){
            },
            yes:function (index , $layer) {
                var childWindow = $layer.find('iframe')[0].contentWindow;
                var selectedProduct = childWindow.selectedProduct;
                var products = [];

                for(var uid in selectedProduct){
                    products.push(selectedProduct[uid]);
                }
                if(yesCallback && typeof yesCallback === 'function'){
                    yesCallback(products);
                }
                layer.close(index);
            }
        });
    }

    this.initDatePanel = function(callback){
        var ONE_DAY_TIMESTAMP = 60 * 60 * 24 * 1000;
        var startDateStr, endDateStr;
        // 今日
        $('.btn.today').click(function(){
            startDateStr = DateUtils.getTodayDate();
            endDateStr = startDateStr;
            callback(startDateStr, endDateStr);
        });

        // 昨日
        $('.btn.yesterday').click(function(){
            var date = new Date();
            // 计算本周开始的日期
            var startDate = new Date(date.getTime()- ONE_DAY_TIMESTAMP);
            startDateStr = DateUtils.formatYYYYMMDD(startDate.getTime());
            endDateStr = startDateStr;
            callback(startDateStr, endDateStr);
        });

        // 本周
        $('.btn.this-week').click(function(){
            var date = new Date();
            // 计算本周开始的日期
            var day = date.getDay();
            // 判断是否为周日 date.getDay()等于0 为周日
            if(day !== 0){
                day = day - 1;
            } else {
                day = 6;
            }
            var startDate = new Date(date.getTime()- day * ONE_DAY_TIMESTAMP);
            startDateStr = DateUtils.formatYYYYMMDD(startDate.getTime());
            // 今天的时间日期
            endDateStr = DateUtils.getTodayDate();
            callback(startDateStr, endDateStr);
        });

        // 本月
        $('.btn.this-month').click(function(){
            var date = new Date();
            // 本月第一天
            var startDate = new Date(date.getFullYear(), date.getMonth(), 1);
            startDateStr = DateUtils.formatYYYYMMDD(startDate.getTime());
            // 今天的时间日期
            endDateStr = DateUtils.getTodayDate();
            callback(startDateStr, endDateStr);
        });

        // 上月
        $('.btn.last-month').click(function(){
            var date = new Date();
            // 上月第一天
            var year = date.getFullYear();
            var month = date.getMonth();
            if(month === 0){
                month = 12;
                year = year - 1;
            }

            var startDate = new Date(year, (month-1), 1);
            startDateStr = DateUtils.formatYYYYMMDD(startDate.getTime());
            // 上月最后一天
            var endDate = new Date(year, month, 0);
            endDateStr = DateUtils.formatYYYYMMDD(endDate.getTime());
            callback(startDateStr, endDateStr);
        });

        // 本年
        $('.btn.this-year').click(function(){
            var date = new Date();
            // 本年第一天
            var year = date.getFullYear();
            var startDate = new Date(year, 0, 1);
            startDateStr = DateUtils.formatYYYYMMDD(startDate.getTime());
            // 今天的时间日期
            endDateStr = DateUtils.getTodayDate();
            callback(startDateStr, endDateStr);
        });

    }

};

var PUBLIC = new Public();




