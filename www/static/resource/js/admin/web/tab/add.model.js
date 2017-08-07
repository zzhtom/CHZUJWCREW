$(document).ready(function () {
    $('h3').html($('h3').html().toUpperCase());
    var simplemde = new SimpleMDE();
    $('#submit').click(function () {
        if ($('#title').val().length == 0) {
            // $('#newsname').get(0).setCustomValidity("该字段不能为空！");
            $('#tips').html('<b>标题不能为空！</b>');
            $('#title').focus().select();
            return false;
        }
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
                    // $('#tips').html('');
                    alert("添加标题为:" + data.title + "的记录成功！");
                    window.location.reload();
                } else {
                    alert("添加标题为:" + data.title + "的记录失败！\n" + JSON.stringify(data.error));
                }
            },
            error: function () {
                alert("网络异常！");
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