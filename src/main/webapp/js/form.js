
$(function(){

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });

});
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [ o[this.name] ];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


(function(window, $, layer, LayerUtils, RequestUtils){

    $.validator.setDefaults({
        errorElement: "span",
        errorPlacement: function (error, element) {
            if (element.is(":radio") || element.is(":checkbox")) {
                error.appendTo(element.parent().parent().parent());
            } else {
                error.appendTo(element.parent());
            }
        },
        errorClass: "error"
    });

    var FormUtils = function(){

        var self = this;

        this.init = function(options){
            bindCancelBtn();

            options = options || {};
            var formId = options.form || 'form';
            formId = '#' + formId;
            var rules = options.rules || {};
            var messages = options.messages || {};
            var contentType = options.contentType || 'application/x-www-form-urlencoded;charset=utf-8';
            var $submitBtn = $(formId).find('input[type="submit"]');
            var successCallback = options.successCallback;

            self.bindValidate({
                formId: formId,
                rules: rules,
                messages: messages,
                contentType: contentType,
                submitBtn: $submitBtn,
                validForm: options.validForm,
                formData: options.formData,
                successCallback: function(res){
                    if(successCallback && typeof(successCallback) == 'function'){
                        successCallback(res);
                    }
                    LayerUtils.success('保存成功', function(){parent.location.reload(true)});
                }
            });
        };

        this.bindValidate = function(options) {
            var formId = options.formId;
            var rules = options.rules || {};
            var messages = options.messages || {};
            var contentType = options.contentType || 'application/x-www-form-urlencoded;charset=utf-8';
            var $submitBtn = options.submitBtn;
            var successCallback = options.successCallback;
            $(formId).validate({
                ignore: '',
                rules: rules,
                messages: messages,
                submitHandler:function(form){
                    var url = $(form).attr('data-url');
                    var valid = true;
                    var formData = $(form).serializeObject();
                    var option = {
                        url: url,
                        contentType: contentType,
                        formData: formData
                    };

                    if(options.validForm && typeof(options.validForm) == 'function'){
                        valid = options.validForm(formData ,option);
                    }
                    if(!valid) return false;
                    if(options.formData && typeof(options.formData) == 'function'){
                        formData = options.formData(formData);
                    }

                    RequestUtils.submitForm({
                        submitBtn: $submitBtn,
                        url: option.url,
                        contentType: option.contentType,
                        formData: formData,
                        successCallback: successCallback
                    });
                    return false;
                }
            });
        };

        function bindCancelBtn(){
            $('#form-cancel-btn').click(function(){
                closeLayer();
            });
        }

        function closeLayer(){
            if(parent && parent.layer){
                parent.layer.closeAll();
            }else{
                window.history.go(-1);
            }
        }

    };

    window.FormUtils = new FormUtils();

})(window, jQuery, layer, LayerUtils, RequestUtils);