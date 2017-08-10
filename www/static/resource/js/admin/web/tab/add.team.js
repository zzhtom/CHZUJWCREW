$(document).ready(function () {
    $('h3').html($('h3').html().toUpperCase());
    $("input[name='stuno']").bind("input propertychange", function () {
        $("input[name='entrance']").val($(this).val().substring(0, 4));
    });
    var spain = new mySpain();
    $('#submit').click(function () {
        if ($("input[name='stuno']").val().length != 10) {
            alert('当前学号错误');
            return false;
        }
        var formData = new FormData();
        formData.append("name", $("input[name='name']").val());
        formData.append("stuno", $("input[name='stuno']").val());
        formData.append("major", $("input[name='major']").val());
        formData.append("entrance", $("input[name='entrance']").val());
        formData.append("model", $("input[name='model']").val());
        formData.append("photo", $("input[name='photo']").get(0).files[0]);

        // JavaScript file-like 对象
        // var content = '<a id="a"><b id="b">hey!</b></a>'; // 新文件的正文...
        // var blob = new Blob([content], { type: "text/xml" });
        // formData.append("webmasterfile", blob);
        spain.showSpain();
        $.ajax({
            url: 'addteam',
            data: formData,
            type: 'post',
            processData: false,  // 不处理数据
            contentType: false,   // 不设置内容类型
            cache: false,
            success: function (data) {
                if (data.success) {
                    // alert("添加成员信息:" + data.team.name + "的记录成功！");
                    if(spain.closeSpain()){
                        // window.location.reload();
                        spain.showPrompt("添加成员信息:" + data.team.name + "的记录成功！", true);
                    }
                    // window.location.reload();
                    // $('#contact').get(0).reset();
                } else {
                    if (data.team.name === undefined && spain.closeSpain()){
                        // alert('访问数据库异常！');
                        spain.showPrompt("访问数据库异常！",false);
                        return;
                    }else{
                        if (spain.closeSpain()) {
                            spain.showPrompt("添加成员为:" + data.team.name + "的记录失败！<br>" + JSON.stringify(data.error),false);
                        }
                    }
                }
            },
            error: function () {
                if(spain.closeSpain()){
                    // alert("网络异常！");
                    spain.showPrompt("网络异常！",false);
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