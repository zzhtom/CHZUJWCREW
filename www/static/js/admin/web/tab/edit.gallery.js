$(document).ready(function () {
    $('h3').html($('h3').html().toUpperCase());
    var simplemde = new SimpleMDE();
    $('.zoom_pic').elevateZoom({
        zoomType: "lens",
        lensShape: "round",
        lensSize: 150
    });
    // $('.zoom_pic').elevateZoom({ scrollZoom: true });
    $('#submit').click(function () {
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
                    alert("修改图片:" + data.name + "故事成功！");
                    window.location.reload();
                } else {
                    alert("修改图片:" + data.name + "故事失败！\n" + data.error);
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