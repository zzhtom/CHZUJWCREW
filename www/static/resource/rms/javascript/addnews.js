layui.use(['form', 'layedit', 'jquery'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , $ = layui.jquery;
    form.on('select', function (data) {
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