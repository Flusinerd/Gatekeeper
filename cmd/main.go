package main

import (
	"context"
	"log/slog"
	"os"
	"os/signal"

	"eu.jan-krueger/gatekeeper/cmd/internal/config"
	"eu.jan-krueger/gatekeeper/cmd/internal/web"
)

func main() {
	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)
	defer cancel()

	c, err := config.Load()
	if err != nil {
		panic(err)
	}

	httpServer := web.NewHttpServer(ctx, c)

	srvErr := make(chan error)
	go func() {
		err := httpServer.Listen()
		if err != nil {
			srvErr <- err
		}
	}()

	select {
	case err = <-srvErr:
		slog.Error("HTTP Server error", err)
	case <-ctx.Done():
		slog.Info("Shutting down HTTP Server")
		err = httpServer.Shutdown(ctx)
		if err != nil {
			slog.Error("HTTP Server shutdown error", err)
		}
	}
}
