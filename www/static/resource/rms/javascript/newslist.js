 layui.use(['layer', 'table', 'form'], function () {
     var $ = layui.jquery,
         layer = layui.layer,
         table = layui.table,
         form = layui.form;

     //触发事件
     var active = {
         addArticle: function () {
             var that = this;
             //多窗口模式，层叠置顶
             layer.open({
                 type: 2 //此处以iframe举例
                     ,
                 title: '添加新闻',
                 area: [$(window).width() / 2 + 'px', $(window).height() * 9.5 / 10 + 'px'],
                 shade: 0,
                 maxmin: true,
                 offset: [ //为了演示，随机坐标
                     // $(window).height() / 2 - 250
                     2, $(window).width() / 4
                 ],
                 content: 'addnews',
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

 });