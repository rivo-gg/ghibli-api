package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rivo-gg/ghibli-api/config"
)

func main() {
	config.Parse()

	router := gin.Default()
	
	if (config.Conf.Production) {
		gin.SetMode(gin.ReleaseMode)
	}

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	router.POST("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	router.Use(config.CorsConfig())
	router.Run(":" + config.Conf.Port)

}
