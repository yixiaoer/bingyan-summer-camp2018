package controller

import (
	"net/http"
	"github.com/labstack/echo"
	"project/project2/model"
	"time"
	"crypto/md5"
	"encoding/hex"
	"fmt"
)

func Login(c echo.Context) error {
	userInfo := map[string]string{}
	c.Bind(&userInfo)

	h := md5.New()
	h.Write([]byte(userInfo["password"])) // 需要加密的字符串为密码
	has := hex.EncodeToString(h.Sum(nil)) // 输出加密结果
	userInfo["password"] = has
	fmt.Println(userInfo)

	var u map[string]string

	fmt.Println(u)
	if model.Login(userInfo) == 0 { //密码与账户匹配
		cookie := new(http.Cookie)
		cookie.Name = "username"
		cookie.Value = userInfo["name"]
		cookie.Expires = time.Now().Add(24 * time.Hour)
		cookie.Path = "/"
		//cookie.Domain = "localhost"
		//cookie.HttpOnly = true
		c.SetCookie(cookie)
		u = map[string]string{
			"status": "yes",
		}
		fmt.Println("login ok")
		fmt.Println(cookie.Value)
	} else if model.Login(userInfo) == 1 { //有name但是pw不匹配
		u = map[string]string{
			"status": "wrong pw",
		}
		fmt.Println("wrong password")
	} else if model.Login(userInfo) == 2 { //没有name
		u = map[string]string{
			"status": "no user",
		}
		fmt.Println("wrong user")
	}
	return c.JSON(http.StatusOK, u)
}

func SignUp(c echo.Context) error {
	//Request(c)
	userInfo := map[string]string{
		//"id":     "",在数据库中会自动分配一个id所以在注册时可以不需要设置id
		"password": "",
		"email":    "",
		"phone":    "",
		"name":     "",
	}
	c.Bind(&userInfo)
	fmt.Println(userInfo)
	//data := []byte(userInfo["password"])
	//has := md5.Sum(data)
	h := md5.New()
	h.Write([]byte(userInfo["password"])) // 需要加密的字符串为密码
	has := hex.EncodeToString(h.Sum(nil)) // 输出加密结果
	userInfo["password"] = has
	fmt.Println(userInfo)
	var u map[string]string
	if model.SignUp(userInfo) == 0 {
		u = map[string]string{
			"status": "yes",
		}

		fmt.Println("ok")

	} else if model.SignUp(userInfo) == 1 {
		u = map[string]string{
			"status": "already have",
		}
		fmt.Println("already have")
	} else if model.SignUp(userInfo) == 2 {
		u = map[string]string{
			"status": "incomplete data",
		}
		fmt.Println("wrong")
	}
	return c.JSON(http.StatusOK, u)
}

func UserInfo(c echo.Context) error {
	//var n string
	//cookie, err := c.Cookie("username")
	//if err != nil {
	//	return err
	//}
	//n = cookie.Value
	userInfo := map[string]string{
		"username": "",
	}
	c.Bind(&userInfo)
	//userInfo["name"] = n
    fmt.Println(userInfo)
	model.UserHits(userInfo)

	var user model.User
	user = model.UserInfo(userInfo)
	u := &user
	return c.JSON(http.StatusOK, u)
}
