$(document).ready(function () {
    $('h3').html($('h3').html().toUpperCase());
    var simplemde = new SimpleMDE();
    $('#submit').click(function () {
        if ($('#name').val().length == 0) {
            // $('#newsname').get(0).setCustomValidity("该字段不能为空！");
            // $('#title').focus().select();
            return false;
        }
        var formData = new FormData($('#form').get(0));
        $.ajax({
            url: 'addteam',
            data: formData,
            type: 'post',
            processData: false,  // 不处理数据
            contentType: false,   // 不设置内容类型
            cache: false,
            success: function (data) {
                // var jsonData = JSON.stringify(data);
                if (data.success) {
                    // $('#tips').html('');
                    alert("添加成员信息:" + $("input[name='name']") + "的记录成功！");
                    // window.location.reload();
                    $('#form').get(0).reset();
                } else {
                    alert("添加标题为:" + data.title$("input[name='name']") + "的记录失败！");
                }
            },
            error: function () {
                alert("网络异常！");
            }
        });
        return false;
    });
    // extend function
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
});