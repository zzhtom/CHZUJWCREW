layui.config({
    base: '/static/resource/rms/component/custom/lib/' //place.js所在的目录
}).extend({ //设定模块别名
    place: 'place' //如果place.js是在根目录，也可以不用设定别名
});
layui.use(['form', 'layedit', 'laydate', 'jquery', 'place'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , $ = layui.jquery
        , place = layui.place;
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
            form.render('select');
        } else if (name === 'city') {
            place.initPlace($("select[name='town']").get(0), data.value, places.towns);
        } else {
            return;
        }
        form.render('select');
    });
});