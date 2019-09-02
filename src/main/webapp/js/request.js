/**
 * ajax 二次封装
 * 表单提交封装
 */
+(function (window, $, layer, LayerUtils) {

    var RequestUtils = function () {
        /**
         * 异步请求
         * @param url
         * @param formData
         * @param successCallback
         */
        this.ajaxPost = function (url, formData, successCallback) {
            formData = formData || {};
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: formData,
                beforeSend: function () {
                    layer.load({shade: [0.1, '#fff']});
                },
                complete: function () {
                    layer.closeAll('loading');
                },
                success: function (res) {
                    if (!res.success) {
                        LayerUtils.error(res.message);
                        return;
                    }
                    if (successCallback && typeof (successCallback) == 'function') {
                        successCallback(res);
                    }
                },
                error: function () {
                    LayerUtils.error('系统异常,操作失败');
                }
            });
        };
        /**
         * Post提交数据
         * @param url url
         * @param formData
         * @param successCallback
         */
        this.postData = function (url, formData, successCallback) {

            formData = formData || {};
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                data: formData,
                beforeSend: function () {
                    layer.load({shade: [0.1, '#fff']});
                },
                complete: function () {
                    layer.closeAll('loading');
                },
                success: function (res) {
                    if (!res.success) {
                        LayerUtils.error(res.message);
                        return;
                    }
                    if (successCallback && typeof (successCallback) == 'function') {
                        successCallback(res);
                    }
                },
                error: function () {
                    LayerUtils.error('系统异常,操作失败');
                }
            });
        };

        this.submitForm = function (options) {
            var $submitBtn = options.submitBtn;
            var url = options.url;
            var successCallback = options.successCallback;
            var formData = options.formData || {};
            var contentType = options.contentType;
            $.ajax({
                url: url,
                type: 'post',
                contentType: contentType,
                dataType: 'json',
                data: formData,
                beforeSend: function () {
                    if ($submitBtn) {
                        $submitBtn.attr('disabled', true);
                    }
                    layer.load({shade: [0.1, '#fff']});
                },
                complete: function () {
                    layer.closeAll('loading');
                },
                success: function (res) {
                    if (!res.success) {
                        if ($submitBtn) {
                            $submitBtn.attr('disabled', false);
                        }
                        LayerUtils.error(res.message);
                        return;
                    }
                    if (successCallback && typeof (successCallback) == 'function') {
                        successCallback(res);
                    }
                    // 由于关闭layer有延迟所以判断按钮是否来自表单
                    if ($submitBtn && !$submitBtn.parents('form')) {
                        $submitBtn.attr('disabled', false);
                    }
                },
                error: function () {
                    if ($submitBtn) {
                        $submitBtn.attr('disabled', false);
                    }
                    LayerUtils.error('系统异常,操作失败');
                }
            });
        };

        /**
         * 上传图片
         * @param url
         * @param fileName
         * @param uploadId
         * @param successCallback
         */
        this.uploadImage = function (url, fileName, uploadId, successCallback) {
            if (!isImage(fileName)) {
                LayerUtils.error("图片格式不正确!");
                return;
            }
            var array = [".jpg", ".jpeg", ".bmp", ".png", ".gif"];
            var accept = array.join(",");
            var completeCallback = function () {
                $('#' + uploadId).replaceWith('<input type="file" id="' + uploadId + '" accept="' + accept + '" name="file">');
            };
            upload(url, uploadId, successCallback, completeCallback);
        };

        this.uploadAttachment = function (url, fileName, uploadId, successCallback) {
            if (!isAttachment(fileName)) {
                LayerUtils.error("文件格式不正确!");
                return;
            }
            var array = [".jpg", ".jpeg", ".bmp", ".png", ".gif", ".doc", ".docx", ".pdf", ".xls", ".xlsx", ".zip", ".rar", ".txt"];
            var accept = array.join(",");
            var completeCallback = function () {
                $('#' + uploadId).replaceWith('<input type="file" id="' + uploadId + '" accept="' + accept + '" name="file">');
            };
            upload(url, uploadId, successCallback, completeCallback);
        };

        this.uploadExcel = function (url, fileName, uploadId, successCallback) {
            if (!isExcel(fileName)) {
                LayerUtils.error("文件格式不正确!");
                return;
            }
            var array = [".xls", ".xlsx"];
            var accept = array.join(",");
            var completeCallback = function () {
                $('#' + uploadId).replaceWith('<input type="file" id="' + uploadId + '" accept="' + accept + '" name="file">');
            };
            upload(url, uploadId, successCallback, completeCallback);
        };

        /**
         * 判断文件是否为图片
         * @param fileName
         * @returns {boolean}
         */
        var isImage = function (fileName) {
            var array = [".jpg", ".jpeg", ".bmp", ".png", ".gif"];
            return checkFile(fileName, array);
        };

        /**
         * 判断附件文件格式
         * @param fileName
         * @returns {boolean}
         */
        var isAttachment = function (fileName) {
            var array = [".jpg", ".jpeg", ".bmp", ".png", ".gif", ".doc", ".docx", ".pdf", ".xls", ".xlsx", ".zip", ".rar", ".txt"];
            return checkFile(fileName, array);
        };

        var isExcel = function (fileName) {
            var array = [".xls", ".xlsx"];
            return checkFile(fileName, array);
        };

        function checkFile(fileName, suffixArray) {
            var result = false;
            while (fileName.indexOf("\\") != -1) {
                fileName = fileName.slice(fileName.indexOf("\\") + 1);
            }
            var ext = fileName.slice(fileName.lastIndexOf(".")).toLowerCase();
            for (var i = 0; i < suffixArray.length; i++) {
                if (suffixArray[i] == ext) {
                    result = true;
                    break;
                }
            }
            return result;
        }

        function upload(url, uploadId, successCallback, completeCallback) {
            $.ajaxFileUpload({
                url: url,
                secureuri: false,
                fileElementId: [uploadId],
                dataType: 'json',
                success: function (res) {
                    if (res.success) {
                        if (successCallback && typeof (successCallback) == 'function') {
                            successCallback(res.data);
                        }
                        LayerUtils.success("上传成功");
                        return;
                    }
                    LayerUtils.error(res.message);
                },
                complete: function () {
                    if (completeCallback && typeof (completeCallback) == 'function') {
                        completeCallback();
                    } else {
                        $('#' + uploadId).replaceWith('<input type="file" id="' + uploadId + '" name="file">');
                    }
                },
                error: function (data, status, e) {
                    LayerUtils.error("服务器异常，上传失败！");
                }
            });
        }

    };

    window.RequestUtils = new RequestUtils();

})(window, jQuery, layer, LayerUtils);