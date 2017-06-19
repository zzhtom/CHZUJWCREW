
$(document).ready(function () {
    $('#allSelect').change(function () {
        if ($(this).prop( 'checked' )) {

            $("input[name='checkbox']").prop("checked", true);//全选 
        } else{
            $("input[name='checkbox']").prop("checked", false);//全选 
        }
        if ($.browser.msie) {
            $('input:checkbox').click(function () {
            this.blur();
            this.focus();
        })
    }
    });

    $('.singleDel').click(function () {
        //  var tr = $(this);
        //  $(this).remove();
        // $('#showActivity tr:first').remove();
        var $tr = $(this).parent().parent().parent();
        var $td = $tr.find("td");
        $.ajax({
            url: 'delactivity',
            data: {
                aid: $.trim($td.eq(1).text()),
                title: $.trim($td.eq(3).text()),
                mdname: $.trim($td.eq(4).text()),
            },
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (data) {
                // var jsonData = JSON.stringify(data);
                if (data.success) {
                    // $('#tips').html('');
                    alert("删除活动标题为:" + data.title + "的活动信息成功！");
                    $tr.remove();
                    // window.location.reload();
                } else {
                    alert("删除活动标题为:" + data.title + "的活动信息失败！");
                }
            },
            error: function () {
                alert("网络异常！");
            }
        });
    });
     $('.allDel').click(function () {
        //  var tr = $(this);
        //  $(this).remove();
        // $('#showActivity tr:first').remove();
//         var $tr = $(this).parent().parent();
        var $trs = $('input[name=checkbox]').parent().parent().parent();
        var $td = $tr.find("td");
        $.ajax({
            url: 'delactivity',
            data: {
                aid: $.trim($td.eq(1).text()),
                title: $.trim($td.eq(3).text()),
                mdname: $.trim($td.eq(4).text()),
            },
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (data) {
                // var jsonData = JSON.stringify(data);
                if (data.success) {
                    // $('#tips').html('');
                    alert("批量删除的活动信息成功！");
                    $tr.remove();
                    // window.location.reload();
                } else {
                    alert("批量删除的活动信息失败！");
                }
            },
            error: function () {
                alert("网络异常！");
            }
        });
    });
});
