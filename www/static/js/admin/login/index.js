
var form = $('.form');
var btn = $('#submit');
var topbar = $('.topbar');
var input = $('#password');
var article = $('.article');
var tries = 0;
var h = input.height();
$('.spanColor').height(h + 23);
$('#findpass').on('click', function () {
  $(this).text('this-is-soo-cool');
});
input.on('focus', function () {
  topbar.removeClass('error success');
  input.text('');
});
btn.on('click', function () {
  // if (tries <= 2) {
    var username = $('#username').val();
    var password = $('#password').val();
/*    if (password === '1') {
      setTimeout(function () {
        btn.text('Success!');
      }, 250);
      topbar.addClass('success');*/
      // window.location.href = '/admin/web/index/main?q=123';
      post("/admin/web/index/main",{'username':username,'password':password});
      // form.addClass('goAway');
      // article.addClass('active');
     /* tries = 0;
    }
    else {
      topbar.addClass('error');
      tries++;
      switch (tries) {
        case 0:
          btn.text('Login');
          break;
        case 1:
          setTimeout(function () {
            btn.text('You have 2 tries left');
          }, 300);
          break;
        case 2:
          setTimeout(function () {
            btn.text('Only 1 more');
          }, 300);
          break;
        case 3:
          setTimeout(function () {
            btn.text('Recover password?');
          }, 300);
          input.prop('disabled', true);
          topbar.removeClass('error');
          input.addClass('disabled');
          btn.addClass('recover');
          break;
          defaut:
          btn.text('Login');
          break;
      }
    }
  }
  else {
    topbar.addClass('disabled');
  }*/

});

$('.form').keypress(function (e) {
  if (e.keyCode == 13)
    submit.click();
});
input.keypress(function () {
  topbar.removeClass('success error');
});

/*函数区域*/
function post(URL, PARAMS) {
  var postForm = document.createElement("form");
  postForm.action = URL;
  postForm.method = "post";
  postForm.style.display = "none";
  for (var param in PARAMS) {
    var opt = document.createElement("textarea");
    opt.name = param;
    opt.value = PARAMS[param];
    // alert(opt.name)
    postForm.appendChild(opt);
  }
  document.body.appendChild(postForm);
  postForm.submit();
  return postForm;
}