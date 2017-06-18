$(document).ready(function () {
    var simplemde = new SimpleMDE();
    $('#submit').click(function () {
        if ($('#newsname').val().length == 0) {
            // $('#newsname').get(0).setCustomValidity("该字段不能为空！");
            $('#tips').html('<b>标题不能为空！</b>');
            $('#newsname').focus().select();
            return false;
        }
        if ($('#mdname').val().length == 0) {
            // $('#newsname').get(0).setCustomValidity("该字段不能为空！");
            $('#tips').html('<b>文件名称不能为空！</b>');
            $('#mdname').focus().select();
            return false;
        }
        $.ajax({
            url: 'news',// 跳转到 action  
            data: {
                newsname: $('#newsname').val(),
                mdname: $('#mdname').val(),
                content: simplemde.value(),
            },
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (data) {
                // var jsonData = JSON.stringify(data);
                if (data.success) {
                    $('#tips').html('');
                    alert("添加新闻标题为:"+ data.title +"的新闻信息成功！");
                    window.location.reload();
                } else {
                    alert("添加标题为:"+ data.title +"的新闻信息失败！");
                }
            },
            error: function () {
                alert("网络异常！");
            }
        });
    });
});