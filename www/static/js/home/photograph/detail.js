var photos = JSON.parse($('#photos').html());
if ($('.zoom_pic').attr('ratio') == 0) {
    $('#preview').addClass('vertical');
}
// $.getScript("/static/js/home/photograph/detail.elevatezoom.js");
$('.previous').click(function () {
    let name = $('.zoom_pic').attr('name');
    for (var i = 0; i < photos.length; i++) {
        // $('script[src="/static/js/home/jquery.elevatezoom.js"]').remove();
        if (photos[i].name == name) {
            if (i == 0) {
                if (photos[photos.length - 1].ratio == 0) {
                    $('#preview').addClass('vertical');
                } else {
                    $('#preview').removeClass('vertical');
                }
                $('.zoom_pic').attr('name', photos[photos.length - 1].name);
                $('.zoom_pic').attr('src', "/static/gallery/" + photos[photos.length - 1].mdname + '/' + photos[photos.length - 1].name);
                $('.zoom_pic').attr('data-zoom-image', "/static/gallery/" + photos[photos.length - 1].mdname + '/' + photos[photos.length - 1].name);
                getMarkdown(photos[photos.length - 1].mdname);
                break;
            }
            if (photos[i - 1].ratio == 0) {
                $('#preview').addClass('vertical');
            } else {
                $('#preview').removeClass('vertical');
            }
            $('.zoom_pic').attr('name', photos[i - 1].name);
            $('.zoom_pic').attr('src', "/static/gallery/" + photos[i - 1].mdname + '/' + photos[i - 1].name);
            $('.zoom_pic').attr('data-zoom-image', "/static/gallery/" + photos[i - 1].mdname + '/' + photos[i - 1].name);
            getMarkdown(photos[i - 1].mdname);
            break;
        }
    }
    // $.getScript("/static/js/home/photograph/detail.elevatezoom.js");
});
$('.next').click(function () {
    let name = $('.zoom_pic').attr('name');
    for (var i = 0; i < photos.length; i++) {
        if (photos[i].name == name) {
            if (i == (photos.length - 1)) {
                if (photos[0].ratio == 0) {
                    $('#preview').addClass('vertical');
                } else {
                    $('#preview').removeClass('vertical');
                }
                $('.zoom_pic').attr('name', photos[0].name);
                $('.zoom_pic').attr('src', "/static/gallery/" + photos[0].mdname + '/' + photos[0].name);
                $('.zoom_pic').attr('data-zoom-image', "/static/gallery/" + photos[0].mdname + '/' + photos[0].name);
                getMarkdown(photos[0].mdname);
                break;
            }
            if (photos[i + 1].ratio == 0) {
                $('#preview').addClass('vertical');
            } else {
                $('#preview').removeClass('vertical');
            }
            $('.zoom_pic').attr('name', photos[i + 1].name);
            $('.zoom_pic').attr('src', "/static/gallery/" + photos[i + 1].mdname + '/' + photos[i + 1].name);
            $('.zoom_pic').attr('data-zoom-image', "/static/gallery/" + photos[i + 1].mdname + '/' +photos[i + 1].name);
            getMarkdown(photos[i + 1].mdname);
            break;
        }
    }
});
// function
var getMarkdown = function (mdname) {
    $.ajax({
        url: 'getmarkdown',
        data: {
            mdname: mdname,
        },
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                $('.mdcontent').html(data.markdown);
            } else {
                alert(data.error);

                $('.mdcontent').html('');
            }
        },
        error: function () {
            $('.mdcontent').html('请求信息失败，请检查网络是否畅通...');
        }
    });
}