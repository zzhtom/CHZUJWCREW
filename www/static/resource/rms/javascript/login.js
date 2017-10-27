layui.config({
    base: "/static/resource/rms/component/custom/lib/"
}).use(['form', 'layer', 'jquery', 'network'], function () {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.jquery,
        network = layui.network;
    // 监听提交
    form.on('submit(login)', function (data) {
        let userInfor = data.field,
        load = layer.load(),
        username = userInfor.username,
        password = userInfor.password;
        $.ajax({
            url: '/rms/login/index',
            data: {
                username: username,
                password: password,
            },
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    layer.close(load);
                    network.vFormPost(data.url, data.auth);
                } else {
                    layer.close(load);
                    if (data.success === undefined) {
                        layer.msg('数据库初始化失败，请检查！！', {
                            icon: 5
                        });
                    } else {
                        layer.msg(data.msg, {
                            icon: 5
                        });
                        $('input[name="password"]').val('');
                        $('input[name="username"]').focus();
                    }
                }

            },
            error: function () {
                layer.close(load);
                layer.msg('网络错误！', {
                    icon: 5
                });
            }
        });
        // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        return false;
    });
});