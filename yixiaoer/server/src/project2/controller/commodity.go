package controller

import (
	"github.com/labstack/echo"
	"project/project2/model"
	"net/http"
	"fmt"
)

func ShowCategory(c echo.Context) error {
	CommodityCategory := map[string]string{
		"category": "",
	}
	c.Bind(&CommodityCategory)
	fmt.Println(CommodityCategory)
	var commodity []model.Commodity
	commodity = model.ShowCategory(CommodityCategory)
	u := &commodity
	fmt.Println(commodity)
	return c.JSON(http.StatusOK, u)
}

func ShowLocation(c echo.Context) error {
	CommodityCategory := map[string]string{
		"location": "",
	}
	c.Bind(&CommodityCategory)
	var commodity []model.Commodity
	commodity = model.ShowLocation(CommodityCategory)
	u := &commodity
	return c.JSON(http.StatusOK, u)
}

func AllCommodities(c echo.Context) error {

	var commodities []model.Commodity
	commodities = model.AllCommodities()
	u := &commodities
	return c.JSON(http.StatusOK, u)
}

func CommodityInfo(c echo.Context) error {
	commodityInfo := map[string]string{
		"id": "",
		//"图片":"",
	}
	c.Bind(&commodityInfo)

	var commodity model.Commodity
	commodity = model.CommodityInfo(commodityInfo)
	u := &commodity
	fmt.Println(commodity)
	return c.JSON(http.StatusOK, u)
}

func PopluarityRank(c echo.Context) error {

	var commodity []model.Commodity

	commodity = model.PopularRank()
	u := &commodity
	return c.JSON(http.StatusOK, u)
}
