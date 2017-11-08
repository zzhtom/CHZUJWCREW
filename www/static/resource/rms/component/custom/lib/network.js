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
    },
    ajax: function (jquery, url, data, type, datatype, cache, callback) {
      if(jquery === undefined || jquery === '' || jquery === null){
        console.error('jquery 参数不能为空！');
        return;
      }
      if(url === undefined || url === '' || url === null){
        console.error('URL 参数不能为空！');
        return;
      }
      if(!callback instanceof Function){
        console.error('callback 参数必须为函数');
        return;
      }
      var t = (type === undefined || type === '' || type === null ) ? 'post' : type
      var dt = (datatype === undefined || datatype === '' || datatype === null ) ? 'json' : datatype
      var c = !cache ? false : cache
      jquery.ajax({
        url: url,
        data: data,
        type: t,
        cache: c,
        dataType: dt,
        success: function (data) {
          callback(data);
        },
        error: function (XHR, textStatus, errorThrown) {
          var data = XHR.responseText;
          callback(data);
        }
      });
    }
  };
  exports('network', myFunc);
});