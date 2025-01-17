package main

import (
	"log"

	"github.com/XiovV/Golty/pkg/config"
	"github.com/XiovV/Golty/pkg/db"
	zapLogger "github.com/XiovV/Golty/pkg/logger"
	"github.com/XiovV/Golty/pkg/server"
)

func main() {
	logger, err := zapLogger.New()
	if err != nil {
		log.Fatalln("logger init error:", err)
	}

	c, err := config.New()
	if err != nil {
		logger.Fatalln("config error", "error", err)
	}

	db, err := db.New(c.SQLiteDir, logger)
	if err != nil {
		logger.Fatalln("could not initialize database", "error", err)
	}

	server := server.New(c, logger, db)

	err = server.Bootstrap()
	if err != nil {
		logger.Fatalln("could not bootstrap the server", "error", err)
	}

	err = server.Start()
	if err != nil {
		logger.Fatalln("could not start server", "error", err)
	}
}
