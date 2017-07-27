$(document).ready(function () {
    $('h3').html($('h3').html().toUpperCase());
    $('#submit').click(function () {
        if ($("#submit").text() == 'Update') {
            $("#submit").text('Submit');
            $("*").removeAttr("disabled");
            return false;

        }
        if ($("input[name='stuno']").val().length != 10) {
            alert('当前学号错误');
            $("input[name='stuno']").focus().select();
            return false;
        }
        $.ajax({
            url: 'uteam',
            data: {
                model: $("input[name='model']").val(),
                id: $("input[name='id']").val(),
                name: $("input[name='name']").val(),
                stuno: $("input[name='stuno']").val(),
                major: $("input[name='major']").val(),
                mdname: $("input[name='mdname']").val(),
            },
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (data) {
                // var jsonData = JSON.stringify(data);
                if (data.success) {
                    // $('#tips').html('');
                    alert("修改成员为:" + data.team.name + "的记录成功！");
                    // $("input[name='name']").val(data.team.name);
                    $("input[name='name']").attr("disabled",true);
                    $("input[name='stuno']").attr("disabled",true);
                    $("input[name='major']").attr("disabled",true);
                    $("#submit").text('Update');
                    // window.location.reload();
                } else {
                    alert("修改标题为:" + data.team.name + "的记录失败！\n" + JSON.stringify(data.error));
                }
            },
            error: function () {
                alert("网络异常！");
            }
        });
    });
});