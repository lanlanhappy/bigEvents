$(function() {
    //点击“去注册”
    $("#toLogin").click(function() {
        $(".login").hide();
        $(".register").show();
    })

    //点击“去登录”
    $("#toRegister").click(function() {
        $(".login").show();
        $(".register").hide();
    })


    //表单验证
    form = layui.form;
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function(value, item) {
            if (value !== $(".passIpt").val()) {
                return '两次输入的密码不一致';
            }
        }
    });


    // 注册
    $("#regForm").submit(function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        // console.log(data);
        $.ajax({
            url: "http://ajax.frontend.itheima.net/api/reguser",
            type: "POST",
            data,
            success: function(res) {
                // console.log(res);
                var layer = layui.layer;
                if (res.status !== 0) {
                    return layer.msg('用户名被占用，请更换其他用户名');
                }
                layer.msg('注册成功');
                $("#toRegister").click();
            }
        })
    })

    // 登录
    $("#logForm").submit(function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        // console.log(data);
        $.ajax({
            url: "http://ajax.frontend.itheima.net/api/login",
            type: "POST",
            data,
            success: function(res) {
                // console.log(res);
                var layer = layui.layer;
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // layer.msg("登录成功，即将跳转首页");
                layer.msg('登录成功，即将跳转首页', {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function() {
                    location.href = "../../home/index.html";
                });

            }
        })
    })






})