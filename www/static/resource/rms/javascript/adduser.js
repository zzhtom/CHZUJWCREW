layui.config({
    base: '/static/resource/rms/component/custom/lib/' //place.js所在的目录
}).extend({ //设定模块别名
    place: 'place' //如果place.js是在根目录，也可以不用设定别名
});
layui.use(['form', 'layedit', 'laydate', 'jquery', 'place', 'network'], function () {
    var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery,
        place = layui.place,
        network = layui.network;
    var places = place.places();
    laydate.render({
        elem: '#birthday' //指定元素
    });

    place.initProvince($("select[name='province']").get(0), places.provinces);
    form.render('select');
    form.on('select', function (data) {
        // console.log(data.elem); //得到select原始DOM对象
        // console.log(data.value); //得到被选中的值
        // console.log(data.othis); //得到美化后的DOM对象
        var name = $(data.elem).attr('name');
        if (name === 'province') {
            $("select[name='town']").get(0).options.length = 1;
            place.initPlace($("select[name='city']").get(0), data.value, places.cities);
        } else if (name === 'city') {
            place.initPlace($("select[name='town']").get(0), data.value, places.towns);
        }
        form.render('select');
    });
    // 监听提交
    form.on('submit(addUser)', function (data) {
        let adduser = data.field,
            load = layer.load(1, {
                shade: [0.1, '#fff'] //0.1透明度的白色背景
            });
        adduser.province = $("select[name='province']").find("option:selected").text();
        adduser.city = $("select[name='city']").find("option:selected").text();
        adduser.town = $("select[name='town']").find("option:selected").text();
        network.ajax($, '/rms/data/addadmin', adduser, 'post', 'json', false, function (data) {
            if (data.success) {
                layer.close(load);
                layer.msg(data.msg, {
                    icon: 6
                });
                $('.layui-form').get(0).reset();
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
        // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        return false;
    });
});