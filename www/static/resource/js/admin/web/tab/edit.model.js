$(document).ready(function () {
    $('h3').html($('h3').html().toUpperCase());
    var simplemde = new SimpleMDE();
    var spain = new mySpain();
    $('#submit').click(function () {
        spain.showSpain();
        $.ajax({
            url: 'editmodel',
            data: {
                model: getUrlParam('model'),
                title: $('#title').val(),
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
                    if (spain.closeSpain()) {
                        spain.showPrompt("修改标题为:" + data.title + "的记录成功！",true);
                    }
                } else {
                    if (spain.closeSpain()) {
                        spain.showPrompt("修改标题为:" + data.title + "的记录失败！",false);
                    }
                }
            },
            error: function () {
                if (spain.closeSpain()) {
                    spain.showPrompt("网络异常！",false);
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