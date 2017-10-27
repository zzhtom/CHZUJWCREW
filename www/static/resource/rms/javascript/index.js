layui.use(['element', 'jquery'], function () {
    var element = layui.element,
        $ = layui.jquery;
    //返回登录页面
    $('.signOut').on('click', function () {
        window.location.href = "/rms/login?action=signOut"
    });
    //iframe自适应
    $(window).on('resize', function () {
        var $right_body = $('.right-body');
        $right_body.height($(this).height() - 145);
        $right_body.find('iframe').each(function () {
            $(this).height($right_body.height());
        });
    }).resize();
    //添加tab
    var $title = $('.tab-title'); //tab标题
    var $tabContainers = $('.tab-content'); //tab 内容块
    var $sideNav = $('.side-nav'); //侧边导航
    //给nav绑定事件
    $('.layui-nav .layui-nav-item .layui-nav-child dd> a').each(function () {
        var $nav = $(this);
        var url = $nav.data('url'); //tab内容的地址
        //获取设定的url
        if (url !== undefined) {
            $nav.on('click', function () {
                var tabTitle = $nav.html();
                var count = 0;
                var tabId = $title.find('li:last-child').attr('lay-id');
                $title.find('li').each(function (i, e) {
                    if ($(this).find('span').text() === $nav.text()) {
                        count++;
                        tabId = $(this).attr('lay-id');
                    };
                });
                if (count === 0) {
                    //添加删除样式
                    tabTitle += '<i class="layui-icon layui-unselect layui-tab-close">&#x1006;</i>';
                    //添加tab
                    element.tabAdd('main_tab', {
                        title: tabTitle,
                        content: '<iframe src="' + url + '"></iframe>',
                        id: tabId + 1
                    });
                    tabId = $title.find('li:last-child').attr('lay-id');
                    //iframe 自适应
                    var $content = $('.layui-tab-content');
                    $content.find('iframe').each(function () {
                        $(this).height($content.height());
                    });
                    //点击tab li切换导航，切换侧边导航的layui-this
                    var $li = $title.find('li');
                    $li.on('click', function () {
                        var thisPage = $(this).find('span').text(); //当前显示页的标题
                        var sidePage = $sideNav.find('dd.layui-this').find('a').text(); //当前侧面导航显示的标题
                        if (thisPage != sidePage) {
                            $sideNav.find('dd').each(function () {
                                if ($(this).find('a').text() === thisPage) {
                                    $sideNav.find('.layui-nav-child >dd').removeClass('layui-this');
                                    $(this).addClass('layui-this');
                                }
                            })
                            if (thisPage == '首页') { //始终留置一个tab
                                $sideNav.find('.layui-nav-child >dd').removeClass('layui-this');
                            }
                        }
                    })
                    //给tab-nav绑定关闭事件
                    $li.eq($li.length - 1).children('i.layui-tab-close').on('click', function () {
                        element.tabDelete('main_tab', tabId);
                        var thisPage = $title.find('li.layui-this').find('span').text(); //当前显示页的标题
                        var sidePage = $sideNav.find('dd.layui-this').find('a').text(); //当前侧面导航显示的标题
                        if (thisPage != sidePage) {
                            $sideNav.find('dd').each(function () {
                                if ($(this).find('span').text() == thisPage) {
                                    $sideNav.find('.layui-nav-child >dd').removeClass('layui-this');
                                    $(this).addClass('layui-this');
                                }
                            })
                            if (thisPage == '首页') { //始终留置一个tab
                                $sideNav.find('.layui-nav-child >dd').removeClass('layui-this');
                            }
                        }
                    });
                    //获取焦点
                    element.tabChange('main_tab', tabId);
                } else {
                    //切换tab
                    element.tabChange('main_tab', tabId);
                }
            });
        }
    });
    /**
     * 功能： 删除选项卡
     * 说明： 删除全部，删除其他
     * 时间： 2017年09月30日
     */
    element.on('nav(close_tab)', function (elem) {
        // console.log(elem); //得到当前点击的DOM对象
        var apply = $(elem).attr('apply');
        if (apply === 'closePageOther') {
            $('.tab-title li').each(function () {
                if ($(this).attr('lay-id') === '0' || $(this).attr('class') === 'layui-this') {
                    return;
                } else {
                    element.tabDelete('main_tab', $(this).attr('lay-id'));
                }
            });
        } else if (apply === 'closePageAll') {
            $('.tab-title li').each(function () {
                if ($(this).attr('lay-id') === '0') {
                    element.tabChange('main_tab', $(this).attr('lay-id'));
                    $('.layui-nav-child >dd').removeClass('layui-this');
                } else {
                    element.tabDelete('main_tab', $(this).attr('lay-id'));
                }
            });
        }
    });

});