package main

import (
	"github.com/labstack/echo"
	"project/project2/controller"
)

func main() {
	e := echo.New()

	e.POST("/api/v1/login", controller.Login)
	e.POST("/api/v1/sign-up", controller.SignUp)
	e.POST("api/v1/page",controller.AllCommodities)
	e.POST("/api/v1/page/categories", controller.ShowCategory)
	e.POST("/api/v1/page/location", controller.ShowLocation)
	e.POST("/api/v1/page/commodities", controller.CommodityInfo)
	e.POST("/api/v1/page/popularity", controller.PopluarityRank)
	e.POST("/api/v1/page/homepage",controller.UserInfo)

	e.Logger.Fatal(e.Start(":3001"))
}