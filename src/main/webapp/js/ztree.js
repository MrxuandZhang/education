/**
  * zTree js 工具类
  */

(function (window , $) {


    function ZTree(option) {
        option = $.extend(true , {} , {
            elem : '',
            data : [],
            config : {},
            show : 'click',
            style:{
              child : '',   //单节点
              parent:'' ,   //包含子节点的节点
              node : '' , //不可打开的节点样式
              switchNode:'' , //默认节点样式
              openSwitch :'' //打开后的节点样式
            },
            init:function () {
                
            }
        } , option);
        this.option = option;
        // DOM
        this.elem = option.elem;   // elem对象 input select
        this.state = false; // 状态 false 隐藏
        // ZTREE
        this.data = option.data;   // zTree 数据
        this.config = option.config; // zTree 配置
        this.layout = null;   // zTree 所在的布局

        this.layoutHeader = null;
        this.layoutBody = null;
        this.layoutFoot = null;
        this.ztreeObj = null; // zTreeObj

        this.init();
        this.initTree();
        this.setStyle();
        this.initEvent();
    }

    ZTree.prototype = {
        constructor : ZTree,

        init:function () {
            var $elem = $(this.elem);
            var html='<div class="z-tree-select" style="display: none; position: absolute; z-index: 99999999999999999999999999999;"><div class="z-tree-select-layout tree-select-layout" >\
            <div class="z-tree-select-header"></div>\
            <div class="z-tree-select-body"><div id="zTree-select'+(new Date().getTime())+'"  class="ztree"></div></div>\
            <div class="z-tree-select-foot"></div>\
                <div></div>';
            $elem.after(html);
            this.layout = $elem.next();
            this.layoutHeader = this.layout.find("div.z-tree-select-header");
            this.layoutBody = this.layout.find("div.z-tree-select-body");
            this.layoutFoot = this.layout.find("div.z-tree-select-foot");
            if($.isFunction(this.option.init)){
                this.option.init(this.layout);
            }
            this.layout.data('Z_TREE_DATA' , this);
        },
        // 设置样式
        setStyle : function(){
            var $elem = $(this.elem);
            $elem.parent().css({position: 'relative'});
            var height = $elem.outerHeight();
            var width = $elem.outerWidth();
            this.layout.css({'top' : (height - 5) + 'px'});
        },
        // 初始化Tree
        initTree : function () {
            this.ztreeObj = $.fn.zTree.init(this.layoutBody.find(".ztree")  , this.config , this.data);

        },
        initEvent : function () {
            var self = this;
            $(self.elem).on(this.option.show,function () {
                self.reverse();
                return false;
            });
            $(document).click(function () {
                self.hide(self);
            });

            self.layout.on('click' , function () {
                return false;
            });

        },
        hide : function () {
            hide(this);
        },
        show : function () {
            $('.z-tree-select').each(function () {
               var self = $(this).data('Z_TREE_DATA');
               if(self){
                   hide(self);
               }
            });
            show(this);
        },
        reverse : function () {
            if(this.state){
                this.hide()
            }else{
                this.show();
            }
        }
    };
    
    function hide(self) {
        if(self.state){
            self.layout.slideUp(100);
            self.state = false;
        }
    }
    function show(self) {
        if(!self.state){
            self.layout.slideDown(100);
            self.layout.css('display' , '');
            self.state = true;
        }
    }

    window.ZTreeUtils =  new function () {
        this.init = function (option) {
            return new ZTree(option);
        }
    };
}(window , jQuery));



(function (window , $) {
    
    var defaultOption = {
        /* Element */
        elem:'',
        data:[],
        name:'JsTree',
        /* JsTree */
        isSaveStatus : true, //是否自动保存打开状态
        isChangeSearch : true,//Elem发生变化是否进行搜索
        icon:'fa fa-cube',
        /* Ajax */
        url:null,
        param : {},
        ajaxSuccess:function (res) {
            return [];
        } 
    };
    var defaultJsTreeOption = {
        core:{
            check_callback: false,// 不允许右键操作
            themes:{
                variant:'large'
            },
            data:[]
        },
        plugins:["search", "wholerow", "contextmenu"],
        contextmenu:{items:{}}
    };
    /**
     * 配置
     *
     * @param option 操作
     * @param jsTreeOption JsTreeOption配置
     * @constructor
     */
    function JsTree(option , jsTreeOption) {
        this.option = $.extend(true , {} , defaultOption ,option);
        this.jsTreeOption = $.extend(true , {} , defaultJsTreeOption , jsTreeOption);
        this.id = (new Date().getTime().toString() + (Math.random() * 10000));
        /* 初始化之后 */
        this.jsTree = null;
        this.$elem = null;
        /*  */
    }
    /* 方法区 */
    
    
    JsTree.prototype = {
        constructor : JsTree
        ,
        /**
         * 初始化
         */
        init:function () {
            var option = this.option;
            this.$elem = $(option.elem);
            this.$elem.jsTree();

            /* 判断是否为异步 */
            if(option.url){

            }else{
                this.initTree();
            }
        },
        /**
         * 初始化JsTree
         */
        initTree:function () {

        }
    };
    
    window.JsTreeUtils = new function () {
       this.initJsTree = function(option , jsTreeOption){
           var jsTree = new JsTree(option , jsTreeOption);
           return jsTree;
       };

       this.initTreeSelect = function (option , jsTreeOption) {

       };
    };
}(window , jQuery));