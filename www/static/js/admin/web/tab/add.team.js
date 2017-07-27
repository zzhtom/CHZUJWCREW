$(document).ready(function () {
    $('h3').html($('h3').html().toUpperCase());
    $("input[name='stuno']").bind("input propertychange", function () {
        $("input[name='entrance']").val($(this).val().substring(0, 4));
    });
    $('#submit').click(function () {
        if ($("input[name='stuno']").val().length != 10) {
            alert('当前学号错误');
            return false;
        }
        var formData = new FormData($('#contact').get(0));
        $.ajax({
            url: 'addteam',
            data: formData,
            type: 'post',
            processData: false,  // 不处理数据
            contentType: false,   // 不设置内容类型
            cache: false,
            success: function (data) {
                if (data.success) {
                    alert("添加成员信息:" + data.team.name + "的记录成功！");
                    // window.location.reload();
                    $('#contact').get(0).reset();
                } else {
                    alert("添加成员为:" + data.team.name + "的记录失败！\n" + JSON.stringify(data.error));
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