$(document).ready(function () {
    $('h3').html($('h3').html().toUpperCase());
    var simplemde = new SimpleMDE();
    var spain = new mySpain();
    $('.zoom_pic').elevateZoom({
        zoomType: "lens",
        lensShape: "round",
        lensSize: 150
    });
    // $('.zoom_pic').elevateZoom({ scrollZoom: true });

    $('#submit').click(function () {
        spain.showSpain();
        $.ajax({
            url: 'editgallery',
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
                    if (spain.closeSpain()) {
                        spain.showPrompt("修改图片:" + data.name + "故事成功！", true);
                    }
                } else {
                    if (spain.closeSpain()) {
                        spain.showPrompt("修改图片:" + data.name + "故事失败！<br>" + JSON.stringify(data.error), false);
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