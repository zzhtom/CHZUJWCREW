$(document).ready(function () {
    $('h3').html($('h3').html().toUpperCase());
    $('#submit').click(function () {
        if ($("#submit").text() == 'Update') {
            $("#submit").text('Submit');
            $("*").removeAttr("disabled");
            return false;

        }
        if ($("input[name='ntheme']").val().length == 0) {
            alert('标题不能为空！')
            $("input[name='ntheme']").focus().select();
            return false;
        }
        $.ajax({
            url: 'umodel',
            data: {
                model: $("input[name='model']").val(),
                id: $("input[name='id']").val(),
                title: $("input[name='title']").val(),
            },
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (data) {
                // var jsonData = JSON.stringify(data);
                if (data.success) {
                    // $('#tips').html('');
                    alert("修改标题为:" + data.title + "的记录成功！");
                    $("input[name='title']").val(data.title);
                    $("#submit").text('Update');
                    // window.location.reload();
                } else {
                    alert("修改标题为:" + data.title + "的记录失败！");
                }
            },
            error: function () {
                alert("网络异常！");
            }
        });
    });
});