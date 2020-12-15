$.ajaxPrefilter(function(options) {
    // 优化根路径
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    // 优化请求头
    options.headers = {
        Authorization: localStorage.getItem("identify")
    };

})