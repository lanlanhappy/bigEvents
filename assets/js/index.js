getUserInfo();

function getUserInfo() {
    $.ajax({
        url: "/my/userinfo",
        type: "GET",
        // headers: {
        //     Authorization: localStorage.getItem("identify")
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return;
            }
            let name = res.data.nickname || res.data.username;
            $(".hello").text("欢迎  " + name);
            let firstWord = name[0].toUpperCase();
            // console.log(firstWord);
            if (res.data.user_pic === null) {
                $(".textAvatar").show().text(firstWord);
                $(".layui-nav-img").hide();
            } else {
                $(".layui-nav-img").show();
                $(".textAvatar").hide();
            }
        },
        complete: function(res) {
            // console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败") {
                location.href = "../../home/login.html";
                localStorage.removeItem("identify");
            }
        }
    })
}
let layer = layui.layer;
$("#logout").click(function() {
    layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
        //do something
        localStorage.removeItem("identify");
        location.href = "../../home/login.html";
        layer.close(index);
    });
})