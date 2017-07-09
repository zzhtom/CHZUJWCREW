var photos = JSON.parse($('#photos').html());
// $.getScript("/static/js/home/photograph/detail.elevatezoom.js");
$('.previous').click(function () {
    let name = $('.zoom_pic').attr('name');
    for (var i = 0; i < photos.length; i++) {
        // $('script[src="/static/js/home/jquery.elevatezoom.js"]').remove();
        if (photos[i].name == name) {
            if (i == 0) {
                if (photos[photos.length - 1].ratio == 0) {
                    $.addClass('vertical');
                } else {
                    $.removeClass('vertical');
                }
                $('.zoom_pic').attr('name', photos[photos.length - 1].name);
                $('.zoom_pic').attr('src', "/static/img/photograph/images/" + photos[photos.length - 1].name);
                $('.zoom_pic').attr('data-zoom-image', "/static/img/photograph/images/" + photos[photos.length - 1].name);
                break;
            }
            if (photos[i - 1].ratio == 0) {
                $('#preview').addClass('vertical');
            } else {
                 $('#preview').removeClass('vertical');
            }
            $('.zoom_pic').attr('name', photos[i - 1].name);
            $('.zoom_pic').attr('src', "/static/img/photograph/images/" + photos[i - 1].name);
            $('.zoom_pic').attr('data-zoom-image', "/static/img/photograph/images/" + photos[i - 1].name);
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
                $('.zoom_pic').attr('src', "/static/img/photograph/images/" + photos[0].name);
                $('.zoom_pic').attr('data-zoom-image', "/static/img/photograph/images/" + photos[0].name);
                break;
            }
            if (photos[i + 1].ratio == 0) {
                 $('#preview').addClass('vertical');
            } else {
                 $('#preview').removeClass('vertical');
            }
            $('.zoom_pic').attr('name', photos[i + 1].name);
            $('.zoom_pic').attr('src', "/static/img/photograph/images/" + photos[i + 1].name);
            $('.zoom_pic').attr('data-zoom-image', "/static/img/photograph/images/" + photos[i + 1].name);
            break;
        }
    }
});