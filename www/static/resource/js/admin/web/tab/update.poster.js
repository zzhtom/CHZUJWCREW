$(document).ready(function () {
    $('h3').html($('h3').html().toUpperCase());
    var spain = new mySpain();
    $('#submit').click(function () {
        if ($("#submit").text() == 'Update') {
            $("#submit").text('Submit');
            $("*").removeAttr("disabled");
            return false;

        }
        if ($("input[name='ntheme']").val().length == 0) {
            alert('主题不能为空！')
            $("input[name='ntheme']").focus().select();
            return false;
        }
        spain.showSpain();
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
                    if (spain.closeSpain()) {
                        spain.showPrompt("修改主题为:" + data.theme + "成功！",false);
                        $("input[name='ntheme']").val('');
                        $("input[name='otheme']").val(data.theme);
                        $("#submit").text('Update');
                    }
                    // window.location.reload();
                } else {
                    if (spain.closeSpain()) {
                        spain.showPrompt("修改标题为:" + data.theme + "的记录失败！",false);
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
});