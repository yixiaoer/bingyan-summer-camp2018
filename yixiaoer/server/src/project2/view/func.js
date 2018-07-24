function postData1(url, data) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var text = xmlhttp.responseText;

            //  通过eval() 方法将json格式的字符串转化为js对象，并进行解析获取内容
            var result = eval("(" + text + ")");
            if (result.status === "yes") {
                console.log("ok")
                console.log(document.cookie)
                alert("登录成功！即将跳转页面！")
                setTimeout("window.location.reload()", 3000);
                location.href = '/page.html';
            } else if (result.status === "wrong pw") {
                alert("密码错误!请重新输入！");
                location.href = './';
            } else {
                alert("用户不存在!请重新输入");
                location.href = './';
            }
            console.log("ok")
        }
    };

    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");

    var data_json = JSON.stringify(data);
    xmlhttp.send(data_json);
}

function login() {

    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    var mapData = {
        "name": name,
        "password": password,
    };
    // var data = JSON.stringify(mapData)

    postData1("/api/v1/login", mapData);
    return false;
}

function postData2(url, data) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var text = xmlhttp.responseText;

            //  通过eval() 方法将json格式的字符串转化为js对象，并进行解析获取内容
            var result = eval("(" + text + ")");
            if (result.status === "yes") {
                alert("注册成功，即将跳转登录页面登录")
                setTimeout("window.location.reload()", 3000);
                location.href = './';
            } else if (result.status === "already have") {
                alert("用户名重复，请更换");
            } else {
                alert("信息不完整")
            }
            console.log("ok")
        }
    };

    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");

    var data_json = JSON.stringify(data);
    xmlhttp.send(data_json);
}

function sign() {

    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var name = document.getElementById("name").value;

    var mapData = {
        "password": password,
        "email": email,
        "phone": phone,
        "name": name,
    };

    postData2("/api/v1/sign-up", mapData);
    return false;
}


function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;
}

function homepage() {
    var xmlhttp;
    var name = document.getElementById("name");
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");
    var hits = document.getElementById("hits");
    name=getCookie("username");
    var mapData = {
        "name": name,
    };
    // var data = JSON.stringify(mapData)

    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var text = xmlhttp.responseText;

            //  通过eval() 方法将json格式的字符串转化为js对象，并进行解析获取内容
            var result = eval("(" + text + ")");

            name = result.name;
            phone = result.phone;
            email = result.email;
            hits = result.hits;
        }
        xmlhttp.open("POST","/api/v1/page/homepage" , true);
        xmlhttp.setRequestHeader("Content-type", "application/json");

        var data_json = JSON.stringify(mapData);
        xmlhttp.send(data_json);
    }
    return false;
}

function page() {

    var xmlhttp;
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var text = xmlhttp.responseText;
            //  通过eval() 方法将json格式的字符串转化为js对象，并进行解析获取内容
            var result = eval("(" + text + ")");
            var i;
            var len = result.length;
            for (i = 0; i < len; i++) {
                var div = document.createElement("div");
                div.id = result[i].id;
                div.style = "background-color: #f0f4f9;\n" +
                    "            width: 700px;\n" +
                    "            height: 100px;\n" +
                    "            padding: 25px;\n" +
                    "            margin: 25px;";
                document.getElementById("id").appendChild(div);

                var pic = document.createElement("img");
                pic.style = "width:95px; height:95px";
                pic.innerHTML = result[i].picture;
                div.appendChild(pic);

                var title = document.createElement("h3");
                title.innerText = result[i].title;
                div.appendChild(title);

                var info = document.createElement("h3");
                info.innerText = result[i].info;
                div.appendChild(info);

                var price = document.createElement("h3");
                price.innerText = result[i].price;
                div.appendChild(price);

                var category = document.createElement("h3");
                title.innerText = result[i].category;
                div.appendChild(category);

                var location = document.createElement("h3");
                title.innerText = result[i].location;
                div.appendChild(location);

                var hits = document.createElement("h3");
                title.innerText = result[i].hits;
                div.appendChild(hits);
            }
        }
        xmlhttp.open("POST", "/api/v1/page", true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send();
    };
    return false;
}

