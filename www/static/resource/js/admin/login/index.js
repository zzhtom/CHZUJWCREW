
var btn = $('#submit');
$('#username').focus();
btn.on('click', function () {
  var username = $('#username').val();
  var password = $('#password').val();
  // post("/admin/web/index/main", { 'username': username, 'password': password });
  if (username === '' || username === null) {
    layer.tips('用户名不能为空', '#username', {
      tips: [1, '#c00']
    });
    $('#username').focus();
    return;
  }
  if (password === '' || password === null) {
    layer.tips('密码不能为空', '#password', {
      tips: [1, '#c00']
    });
    $('#password').focus();
    return;
  }
  layer.load();
  $.ajax({
    url: 'login',
    data: {
      username: username,
      password: password,
    },
    type: 'post',
    cache: false,
    dataType: 'json',
    success: function (data) {
      if (data.success) {
        layer.closeAll('loading');
        post(data.url, data.auth);
      } else {
        layer.closeAll('loading');
        if (data.error === undefined) {
          layer.msg('数据库初始化失败，请检查！！', { icon: 5 });
        } else {
          layer.msg(data.error, { icon: 5 });
        }
      }

    },
    error: function () {
      layer.closeAll('loading');
      layer.msg('网络错误！', { icon: 5 })
    }
  });

});

$('.form').keypress(function (e) {
  if (e.keyCode == 13)
    submit.click();
});

/*post请求函数区域*/
function post(url, auth) {
  var postForm = document.createElement("form");
  postForm.action = url;
  postForm.method = "post";
  postForm.style.display = "none";
  // for (var param in PARAMS) {
  var opt = document.createElement("input");
  opt.type = 'text';
  opt.name = 'auth';
  opt.value = auth;
  // opt.value = PARAMS[param];
  postForm.appendChild(opt);
  // }
  document.body.appendChild(postForm);
  postForm.submit();
  // return postForm;
}