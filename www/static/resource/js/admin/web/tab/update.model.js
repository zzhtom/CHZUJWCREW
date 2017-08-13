$(document).ready(function () {
    $('h3').html($('h3').html().toUpperCase());
    var spain = new mySpain();
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
        spain.showSpain();
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
                    if (spain.closeSpain()) {
                        spain.showPrompt("修改标题为:" + data.title + "的记录成功！", false);
                        $("input[name='title']").val(data.title);
                        $("input[name='title']").attr('disabled',true);
                        $("#submit").text('Update');
                    }
                    // window.location.reload();
                } else {
                    if (spain.closeSpain()) {
                        spain.showPrompt("修改标题为:" + data.title + "的记录失败！", false);
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
});