$(document).ready(function () {
    $('h3').html($('h3').html().toUpperCase());
    var simplemde = new SimpleMDE();
    var spain = new mySpain();
    $('#submit').click(function () {
        if ($('#title').val().length == 0) {
            // $('#newsname').get(0).setCustomValidity("该字段不能为空！");
            $('#tips').html('<b>标题不能为空！</b>');
            $('#title').focus().select();
            return false;
        }
        spain.showSpain();
        $.ajax({
            url: 'addmodel',
            data: {
                model: getUrlParam('model'),
                title: $('#title').val(),
                content: simplemde.value(),
            },
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (data) {
                // var jsonData = JSON.stringify(data);
                if (data.success) {
                    if (spain.closeSpain()) {
                        spain.showPrompt("添加标题为:<" + data.title + ">的记录成功！", true);
                    }
                } else {
                    if (data.title === undefined) {
                        if (spain.closeSpain()) {
                            spain.showPrompt("服务器异常，请检查相关日志！", false);
                        }
                    } else {
                        if (spain.closeSpain()) {
                            spain.showPrompt("添加标题为:" + data.title + "的记录失败！" + JSON.stringify(data.error), false);
                        }
                    }

                }
            },
            error: function () {
                if (spain.closeSpain()) {
                    spain.showPrompt("网络异常！", false);
                }
            }
        });
    });
    // extend function
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
});