$(document).ready(function () {
    $('#submit').click(function () {
        if ($("#submit").text() == 'Update') {
            $("#submit").text('Submit');
            $("*").removeAttr("disabled");
            return false;

        }
        if ($("input[name='title']").val().length == 0) {
            alert('标题不能为空！')
            $("input[name='title']").focus().select();
            return false;
        }
        $.ajax({
            url: 'uactivity',
            data: {
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
                    alert("修改活动标题为:" + data.title + "的活动信息成功！");
                    $("input[name='title']").val(data.title);
                    $("#submit").text('Update');
                    // window.location.reload();
                } else {
                    alert("修改活动标题为:" + data.title + "的活动信息失败！");
                }
            },
            error: function () {
                alert("网络异常！");
            }
        });
    });
});