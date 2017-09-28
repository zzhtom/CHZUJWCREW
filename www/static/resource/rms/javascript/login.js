layui.config({
	base : "javascript/"
}).use(['form','layer'], function () {
    var form = layui.form(),
        layer = layui.layer;
    // 监听提交
    form.on('submit(login)', function (data) {
        let userInfor = data.field;
        layer.msg(userInfor.username + " " + userInfor.password);
        // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        return false;
    });
});
