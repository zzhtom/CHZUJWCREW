layui.use(['form', 'layedit', 'jquery'], function () {
    var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        $ = layui.jquery,
        simplemde = new SimpleMDE();

    // 监听提交
    form.on('submit(addNews)', function (data) {
        let addnews = data.field,
            load = layer.load(1, {
                shade: [0.1, '#fff'] //0.1透明度的白色背景
            });
        addnews.article = simplemde.value();
        $.ajax({
            url: '/rms/data/addnews',
            data: addnews,
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    layer.close(load);
                    layer.msg(data.msg, {
                        icon: 6
                    });
                    $('.layui-form').get(0).reset();
                    simplemde.value('');
                } else {
                    layer.close(load);
                    if (data.success === undefined) {
                        layer.msg('数据库连接失败，请告知管理人员检查！！', {
                            icon: 5
                        });
                    } else {
                        layer.alert(data.msg, {
                            icon: 5
                        });
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