
($(function () {

    var icon = "";
    $.extend($.validator.messages, {
        required: icon + "必填",
        remote: icon + "请修正此栏位",
        email: icon + "电子邮箱格式不正确",
        url: icon + "网址格式不正确",
        date: icon + "日期格式不正确",
        dateISO: icon + "请填写有效的日期 (YYYY-MM-DD)",
        number: icon + "请填写正确的数字",
        digits: icon + "只能填写数字",
        creditcard: icon + "信用卡号格式不正确",
        equalTo: icon + "你的输入不相同",
        extension: icon + "请输入有效的后缀",
        maxlength: $.validator.format(icon + "最多填写 {0} 个字符"),
        minlength: $.validator.format(icon + "最少填写 {0} 个字"),
        rangelength: $.validator.format(icon + "请输入长度为 {0} 至 {1} 之间的字串"),
        range: $.validator.format(icon + "请输入 {0} 至 {1} 之间的数值"),
        max: $.validator.format(icon + "请输入不大于 {0} 的数值"),
        min: $.validator.format(icon + "请输入不小于 {0} 的数值")
    });

    // 手机号码验证
    $.validator.addMethod("mobile", function (value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "手机号码格式不正确");

    // 固定电话验证
    jQuery.validator.addMethod("tel", function(value, element) {
        var phone = /(^(\d{3,4}-)?\d{6,8}$)|(^(\d{3,4}-)?\d{6,8}(-\d{1,5})?$)|(\d{11})/;
        return this.optional(element) || (phone.test(value));
    }, "固定电话格式不正确");

}));