getUserInfo();

function getUserInfo() {
    $.ajax({
        url: "/my/userinfo",
        type: "GET",
        headers: {
            Authorization: localStorage.getItem("identify")
        },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return;
            }
            let name = res.data.nickname || res.data.username;
            $(".hello").text("欢迎  " + name);
            let firstWord = name[0];
            // console.log(firstWord);
            if (res.data.user_pic === null) {
                $(".textAvatar").show().text(firstWord);
                $(".layui-nav-img").hide();
            } else {
                $(".layui-nav-img").show();
                $(".textAvatar").hide();

            }
        }
    })
}