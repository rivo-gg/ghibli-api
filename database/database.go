package db

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/rivo-gg/ghibli-api/config"
)

var Conn *pgx.Conn

func Init() error {
	var err error

	Conn, err = pgx.Connect(context.Background(), config.Conf.DatabaseUrl)
	if err != nil {
		return fmt.Errorf("unable to connect to database: %w", err)
	}
	fmt.Println("Connected to the database")
	return nil
}
