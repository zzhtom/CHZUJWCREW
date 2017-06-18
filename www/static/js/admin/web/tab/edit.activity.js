$(document).ready(function () {
    var simplemde = new SimpleMDE();
    $('#submit').click(function () {
        $.ajax({
            url: 'editactivity',
            data: {
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
                    alert("修改活动标题为:"+ data.title +"的活动信息成功！");
                    window.location.reload();
                } else {
                    alert("修改活动标题为:"+ data.title +"的活动信息失败！");
                }
            },
            error: function () {
                alert("网络异常！");
            }
        });
    });
});