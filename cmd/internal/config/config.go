package config

type httpConfig struct {
	Host string
	Port int
}

type uiConfig struct {
	UiPrefix string
}

type Config struct {
	Http httpConfig
	Ui   uiConfig
}

func Load() (Config, error) {
	return Config{
		Http: httpConfig{
			Host: "localhost",
			Port: 4300,
		},
	}, nil
}
