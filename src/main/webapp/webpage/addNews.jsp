<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<%@include file="./head-meta.jsp" %>
<%@include file="./form-meta.jsp" %>
<head>
    <title>添加新闻</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="发布动态">
    <meta http-equiv="description" content="This is my page">
</head>

<body class="white-bg">
<div class="wrapper wrapper-content">
    <div class="form-content">
        <form id="form" class="form-horizontal">
            <div class="form-group">
                <label class="control-label col-sm-2"> 动态标题</label>
                <div class="col-sm-4">
                    <input class="form-control " name="title" placeholder="title">
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-sm-2 required">是否推荐</label>
                <div class="col-sm-4 radio i-checks" style="margin-left: 15px;">
                    <input type="radio" name="isNew" value="1" checked/>推荐
                    <input type="radio" name="isNew" value="0"/>不推荐
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-sm-2"> 动态正文</label>
                <div class="col-sm-4">
                    <textarea rows="20" cols="80" name="content"></textarea>
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-sm-2">新增时间</label>
                <div class="col-sm-4 layui-input-inline">
                    <input type="text" class="laydate-icon form-control layui-input" id="create_Time"
                           name="createTime">
                </div>
            </div>

            <div class="form-group fixed">
                <div class="col-sm-10" style="margin-left: 460px;">
                    <input class="btn btn-primary" type="submit"
                           data-url="${ctx}/news/save"
                           value="确定"/>
                    <input class="btn btn-primary" type="submit"
                           data-url="${ctx}/news/saveDraft"
                           value="保存草稿"/>
                    <button class="btn btn-white" type="button" id="form-cancel-btn">取消</button>
                </div>
            </div>
        </form>
    </div>
</div>
</body>
<script type="text/javascript">
  $(function () {
      initForm();
      var $paymentTable = $('#create_Time');
      $paymentTable.val(DateUtils.format(new Date()));
      $paymentTable.datetimepicker({
          lang: 'ch',
          hours12: false,
          timepicker: true,
          allowBlank: true,
          format: 'Y-m-d H:m:s'
      });
  });
    function initForm() {
        FormUtils.init({
            contentType: 'application/json;charset=utf-8',
            validForm: function (data) {
                if (!data.title) {
                    LayerUtils.errorTips("请填写标题");
                    return false;
                }
                if (!data.content) {
                    LayerUtils.errorTips("请填写内容");
                    return false;
                }
                return true;
            },successCallback:function (res) {
                console.log(res);
            }
        });
        var bindEvent = function () {
            $('input[type="submit"]').click(function () {
                $('#form').attr('data-url', $(this).attr('data-url'));
            });
        };
        bindEvent();
    }
</script>
</html>
