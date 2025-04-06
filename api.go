package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rivo-gg/ghibli-api/config"
	"github.com/rivo-gg/ghibli-api/database"
)

func main() {
	config.Parse()

	router := gin.Default()
	
	if (config.Conf.Production) {
		gin.SetMode(gin.ReleaseMode)
	}

	if err := db.Init(); err != nil {
		log.Fatalf("Error initializing database: %v", err)
	}

	router.GET("/ping", )
	router.Use(config.CorsConfig())
	router.Run(":" + config.Conf.Port)

}
