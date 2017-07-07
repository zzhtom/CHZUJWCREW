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
            url: 'uposter',
            data: {
                model: $("input[name='model']").val(),
                ntheme: $("input[name='ntheme']").val(),
                otheme: $("input[name='otheme']").val(),
            },
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (data) {
                // var jsonData = JSON.stringify(data);
                if (data.success) {
                    // $('#tips').html('');
                    alert("修改主题为:" + data.theme + "成功！");
                    $("input[name='ntheme']").val(data.theme);
                    $("input[name='otheme']").val(data.theme);
                    $("#submit").text('Update');
                    // window.location.reload();
                } else {
                    alert("修改标题为:" + data.theme + "的记录失败！");
                }
            },
            error: function () {
                alert("网络异常！");
            }
        });
    });
});