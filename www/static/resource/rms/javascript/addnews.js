layui.config({
    base: '/static/resource/rms/component/custom/lib/' //place.js所在的目录
});
layui.use(['form', 'layedit', 'jquery', 'network'], function () {
    var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        $ = layui.jquery,
        network = layui.network,
        simplemde = new SimpleMDE();

    // 监听提交
    form.on('submit(addNews)', function (data) {
        let addnews = data.field,
            load = layer.load(1, {
                shade: [0.1, '#fff'] //0.1透明度的白色背景
            });
        addnews.article = simplemde.value();
        network.ajax($, '/rms/data/addnews', addnews, 'post', 'json', false, function (data) {
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
        });
        return false;
    });
});