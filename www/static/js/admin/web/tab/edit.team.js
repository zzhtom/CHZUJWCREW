$(document).ready(function () {
    $('h3').html($('h3').html().toUpperCase());
    var simplemde = new SimpleMDE();
    $('#submit').click(function () {
        $.ajax({
            url: 'editteam',
            data: {
                model: getUrlParam('model'),
                name: $('#name').val(),
                mdname: $('#mdname').val(),
                content: simplemde.value(),
            },
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (data) {
                // var jsonData = JSON.stringify(data);
                if (data.success) {
                    // $('#tips').html('');
                    alert("修改标题为:" + data.team.name + "的记录成功！");
                    window.location.reload();
                } else {
                    alert("修改标题为:" + data.team.name + "的记录失败！\n" + JSON.stringify(data.error));
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