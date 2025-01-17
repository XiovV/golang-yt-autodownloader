package config

import (
	"errors"
	"os"

	"github.com/ilyakaznacheev/cleanenv"
)

type Config struct {
	Port        string `env:"PORT" env-default:"5432"`
	Environment string `env:"ENVIRONMENT" env-default:"PRODUCTION"`
	SQLiteDir   string `env:"SQLITE_DIR"`
}

func New() (*Config, error) {
	var cfg Config

	if _, err := os.Stat(".env"); errors.Is(err, os.ErrNotExist) {
		err := cleanenv.ReadEnv(&cfg)
		if err != nil {
			return nil, err
		}

		return &cfg, err
	}

	err := cleanenv.ReadConfig(".env", &cfg)
	if err != nil {
		return nil, err
	}

	return &cfg, err
}
