/**
 * 弹出窗口显示
 * @param title 弹窗的标题
 * @param width 弹窗的宽度
 * @param height 弹窗的高度
 * @param url 弹窗的URL
 * @param successCallBack 弹窗成功后回调函数
 * @param endCallBack 弹窗成功后关闭时回调函数
 * type: layer提供了5种层类型。可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
 */
(function(window, $, layer){

    var LayerUtils = function () {
        /**
         * 成功提示弹窗
         * @param msg
         * @param callback
         */
        this.success = function(msg, callback){
            layer.msg(msg, {icon: 1, time: 1000}, function() {
                if(callback && typeof callback == 'function'){
                    callback();
                }
            });
        };

        /**
         * 错误提示弹窗
         * @param msg
         */
        this.error = function(msg){
            layer.alert(msg, {
                skin: 'layui-layer-red',
                shift: 0,
                icon:2
            });
        };

        this.openFrame = function(options){
            var width = options.width || '100%';
            var height = options.height || '100%';
            var maxmin = options.maxmin || false;
            var end = options.end || function(){};
            var yes = options.yes || function(){};
            var button = options.btn || [];

            var layerOption = {};
            layerOption.type = 2;
            layerOption.title = options.title;
            layerOption.content = options.url;
            layerOption.shade = 0.2;
            layerOption.maxmin = maxmin;
            layerOption.area = [width , height];
            layerOption.yes = yes;
            layerOption.end = end;
            if(button.length > 0){
                layerOption.btn = button;
            }
            return layer.open(layerOption);
        };

        /**
         * 提示弹窗
         * @param msg
         */
        this.errorTips = function(msg){
            layer.msg(msg, {icon: 0, time: 3000}, function() {

            });
        };
    };

    window.LayerUtils = new LayerUtils();

})(window, jQuery, layer);