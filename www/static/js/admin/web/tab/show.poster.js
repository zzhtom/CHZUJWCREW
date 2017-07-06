
$(document).ready(function () {
    var model = getUrlParam('model');

    $("input[name='show']").each(function () {
        if ($(this).val() == 1)
            $(this).prop("checked", true);
    });
    $('#firstPage').click(function () {
        $(this).attr('href', 'showposter?page=1&model=' + model);
    });
    $('#lastPage').click(function () {
        $(this).attr('href', 'showposter?page=' + $('#totalPages').text() + '&model=' + model);
    });
    $('#backPage').click(function () {
        var dirPage = $('#currentPage').text() - 1;
        if (dirPage <= 0) {
            alert('目前已是第一页');
            return false;
        }
        $(this).attr('href', 'showposter?page=' + dirPage + '&model=' + model);
    });
    $('#nextPage').click(function () {
        var dirPage = $('#currentPage').text() * 1 + 1 * 1;
        var lastPage = $('#totalPages').text();
        if (dirPage > lastPage) {
            alert('目前已是最后一页');
            return false;
        }
        $(this).attr('href', 'showposter?page=' + dirPage + '&model=' + model);
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
        $(this).attr('href', 'showposter?page=' + $('#jumpNum').val() + '&model=' + model);
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
    $("input[name='show']").change(function () {
        let $tr = $(this).parent().parent().parent();
        let $td = $tr.find("td");
        if (!$(this).prop('checked')) {
            if (confirm('确定取消本海报在首页显示吗？')) {
                var show = $(this);
                $.ajax({
                    url: 'setposter',
                    data: {
                        model: model,
                        theme: $.trim($td.eq(2).text()),
                        reason: 'cancel',
                    },
                    type: 'post',
                    cache: false,
                    dataType: 'json',
                    success: function (data) {
                        // var jsonData = JSON.stringify(data);
                        if (data.success) {
                            alert("首页展示设置取消成功！");
                        } else {
                            alert("首页展示设置取消失败！");
                            $(show).prop("checked", true);
                        }
                    },
                    error: function () {
                        alert("网络或服务器异常！");
                    }
                });
            } else {
                $(this).prop("checked", true);
            }

        }
        if ($(this).prop('checked')) {
            var show = $(this);
            if (confirm('确定本海报在首页显示吗？')) {
                $.ajax({
                    url: 'setposter',
                    data: {
                        model: model,
                        theme: $.trim($td.eq(2).text()),
                        reason: 'setting',
                    },
                    type: 'post',
                    cache: false,
                    dataType: 'json',
                    success: function (data) {
                        if (data.success) {
                            alert("首页展示设置成功！");
                            $("input[name='show']").prop("checked", false);
                            $(show).prop("checked", true);
                            return;
                        } else {
                            alert("首页展示设置失败！");
                            $(show).prop("checked", false);
                            return;
                        }
                    },
                    error: function () {
                        alert("网络或服务器异常！");
                    }
                });
            } else {
                $(this).prop("checked", false);
            }

        }
    });
    $('.updateModel').click(function () {
        if ($("input[name='checkbox']:checked").size() == 0) {
            alert('所选项不能为空！');
            return false;
        }
        var $td = $("input[name='checkbox']:checked").first().parent().parent().parent().find('td');
        window.open('uposter?theme=' + $.trim($td.eq(2).text()) + '&model=' + model, 'I1');
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
            url: 'delposter',
            data: {
                model: model,
                theme: $.trim($td.eq(2).text()),
                mdname: $.trim($td.eq(3).text()),
                pname: $.trim($td.eq(4).text()),
            },
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (data) {
                // var jsonData = JSON.stringify(data);
                if (data.success) {
                    // $('#tips').html('');
                    alert("删除主题为:" + data.theme + "的海报记录成功！");
                    // $tr.remove();
                    if ($("input[name='checkbox']").size() != 1) {
                        window.location.reload();
                        return;
                    }
                    if ($('#currentPage').text() != 1) {
                        var backPage = $('#currentPage').text() - 1;
                        window.open('showposter?page=' + backPage + '&model=' + model, 'I1');
                    } else {
                        alert('暂时无数据！');
                        window.location.reload();
                    }
                } else {
                    alert("删除主题为:" + data.theme + "的海报记录失败！");
                }
            },
            error: function () {
                alert("网络或服务器异常！");
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
                id: $.trim($td.eq(1).text()),
                mdname: $.trim($td.eq(4).text())
            };
        }).get();
        $.ajax({
            url: 'batchdelmodel',
            data: {
                model: model,
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
                            window.open('showposter?page=' + backPage + '&model=' + model, 'I1');
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
