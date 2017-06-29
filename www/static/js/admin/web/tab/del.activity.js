
$(document).ready(function () {
    var model = getUrlParam('model');
    $('#firstPage').click(function () {
        $(this).attr('href', 'show'+model+'?page=1&model='+model);
    });
    $('#lastPage').click(function () {
        $(this).attr('href', 'show'+model+'?page=' + $('#totalPages').text()+'&model='+model);
    });
    $('#backPage').click(function () {
        var dirPage = $('#currentPage').text() - 1;
        if (dirPage <= 0) {
            alert('目前已是第一页');
            return false;
        }
        $(this).attr('href', 'show'+model+'?page=' + dirPage + '&model=' + model);
    });
    $('#nextPage').click(function () {
        var dirPage = $('#currentPage').text() * 1 + 1 * 1;
        var lastPage = $('#totalPages').text();
        if (dirPage > lastPage) {
            alert('目前已是最后一页');
            return false;
        }
        $(this).attr('href', 'show'+model+'?page=' + dirPage + '&model=' + model);
    });
    $('#jumpPage').click(function () {
        if (isNaN($('#jumpNum').val())) {
            alert('输入页码无效！');
            return false;
        }
        if ($('#jumpNum').val() == null || $('#jumpNum').val() == undefined || $('#jumpNum').val() == '') {
            alert('页码不能为空！');
            return false;
        }
        if ($('#jumpNum').val() > $('#totalPages').text() || $('#jumpNum').val() < 1) {
            alert('页码不在有效范围内！')
            return false;
        }
        $(this).attr('href', 'show'+model+'?page=' + $('#jumpNum').val() + '&model=' + model);
    });
    $('#allSelect').change(function () {
        if ($(this).prop('checked')) {

            $("input[name='checkbox']").prop("checked", true);//全选 
        } else {
            $("input[name='checkbox']").prop("checked", false);
        }
        if ($.browser.msie) {
            $('input:checkbox').click(function () {
                this.blur();
                this.focus();
            })
        }
    });
    $("input[name='checkbox']").change(function () {
        if (!$(this).prop('checked')) {
            $("input[name='batchSelect']").prop("checked", false);//全选 
        }
    });
    $('.updateActivity').click(function () {
        if ($("input[name='checkbox']:checked").size() == 0) {
            alert('所选项不能为空！');
            return false;
        }
        var $td = $("input[name='checkbox']:checked").first().parent().parent().parent().find('td');
        window.open('u'+model+'?aid=' + $.trim($td.eq(1).text()) + "&title=" + $.trim($td.eq(3).text()), 'I1');
    });
    $('.singleDel').click(function () {
        //  var tr = $(this);
        //  $(this).remove();
        // $('#showActivity tr:first').remove();
        let result = confirm('确定删除这条数据吗?');
        if (!result)
            return false;
        var $tr = $(this).parent().parent().parent();
        var $td = $tr.find("td");
        $.ajax({
            url: 'del'+model,
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
                    // $tr.remove();
                    if ($("input[name='checkbox']").size() != 1) {
                        window.location.reload();
                        return;
                    }
                    if ($('#currentPage').text() != 1) {
                        var backPage = $('#currentPage').text() - 1;
                        window.open('show'+model+'?page=' + backPage + '&model=' + model, 'I1');
                    } else {
                        alert('暂时无数据！')
                    }
                } else {
                    alert("删除活动标题为:" + data.title + "的活动信息失败！");
                }
            },
            error: function () {
                alert("网络异常！");
            }
        });
    });
    $('.batchDel').click(function () {
        //  var tr = $(this);
        //  $(this).remove();
        // $('#showActivity tr:first').remove();
        // var $tr = $(this).parent().parent();
        if ($("input[name='checkbox']:checked").size() == 0) {
            alert('所选项不能为空！');
            return false;
        }
        let result = confirm('确定批量删除所选数据吗?');
        if (!result)
            return false;
        var _lsit = $(':checked').parent().parent().parent().map(function () {
            var $td = $(this).find("td");
            if ($td.eq(1).text() == null || $td.eq(1).text() == undefined || $td.eq(1).text() == '') {
                return null;
            }
            return {
                aid: $.trim($td.eq(1).text()),
                mdname: $.trim($td.eq(4).text())
            };
        }).get();
        $.ajax({
            url: 'batchdel'+model,
            data: {
                data: JSON.stringify(_lsit)
            },
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (data) {
                // var jsonData = JSON.stringify(data);
                if (data.success) {
                    // $('#tips').html('');
                    alert("批量删除的活动信息成功！");
                    // $tr.remove();
                    if ($("input[name='batchSelect']:checked").size() != 0) {
                        if ($('#currentPage').text() != 1) {
                            var backPage = $('#currentPage').text() - 1;
                            window.open('show'+model+'?page=' + backPage + '&model=' + model, 'I1');
                        } else {
                            alert('暂时无数据！')
                        }
                        return;
                    }
                    window.location.reload();
                } else {
                    alert("批量删除的活动信息失败！");
                }
            },
            error: function () {
                alert("网络异常！");
            }
        });
    });
    // extend function
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
});
