layui.use(['layer', 'table', 'form'], function () {
    var $ = layui.jquery,
        layer = layui.layer,
        table = layui.table,
        form = layui.form;

    //触发事件
    var active = {
        addUser: function () {
            var that = this;
            //多窗口模式，层叠置顶
            layer.open({
                type: 2 //此处以iframe举例
                    ,
                title: '添加用户',
                area: [$(window).width() / 2 + 'px', $(window).height() * 9.5 / 10 + 'px'],
                shade: 0,
                maxmin: true,
                offset: [
                    // $(window).height() / 2 - 250
                    2, $(window).width() / 4
                ],
                content: 'adduser',
                yes: function () {
                        $(that).click();
                    }

                    ,
                zIndex: layer.zIndex //重点1
                    ,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                }
            });
        }
    };

    $('#optionGlobal .add-btn').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
    });
    //监听工具条
    table.on('tool(userlist)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            ,layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'detail') {
            layer.msg('查看操作');
        } else if (layEvent === 'del') {
            layer.confirm('确定删除此条记录?', function (index) {
                obj.del(); //删除对应行（tr）的DOM结构
                layer.close(index);
                //向服务端发送删除指令
            });
        } else if (layEvent === 'edit') {
            layer.msg('编辑操作');
        }
    });
});