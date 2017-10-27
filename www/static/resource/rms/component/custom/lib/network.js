layui.define(function (exports) {
  var myFunc = {
    vFormPost: function post(url, auth) {
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
  };
  exports('network', myFunc);
});