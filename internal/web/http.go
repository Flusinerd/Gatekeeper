package web

import (
	"context"
	"fmt"
	"log/slog"
	"net"
	"net/http"
	"time"

	"eu.jan-krueger/gatekeeper/internal/config"
	sloghttp "github.com/samber/slog-http"
)

type HttpServer interface {
	Listen() error
	Shutdown(context.Context) error
}

type httpServer struct {
	s *http.Server
	l *slog.Logger
}

func NewHttpServer(
	ctx context.Context,
	c config.Config,
) HttpServer {
	logger := slog.Default()

	mux := http.NewServeMux()
	handler := sloghttp.Recovery(mux)
	handler = sloghttp.New(logger)(handler)
	// handler = middleware.SessionMiddleware(handler)
	// handler = session.Manager.LoadAndSave(handler)

	apiMux := http.NewServeMux()
	uiMux := http.NewServeMux()

	registerTestHandlers(apiMux)
	registerUiHandlers(uiMux)

	mux.Handle("/api/", http.StripPrefix("/api", apiMux))
	mux.Handle("/", uiMux)

	web := &http.Server{
		Addr:              fmt.Sprintf(":%d", c.Http.Port),
		BaseContext:       func(_ net.Listener) context.Context { return ctx },
		Handler:           handler,
		ReadHeaderTimeout: 10 * time.Second,
	}

	s := &httpServer{
		s: web,
		l: logger,
	}

	return s
}

func (w *httpServer) Listen() error {
	w.l.Info("Starting HTTP Server", slog.Any("Addr", w.s.Addr))
	return w.s.ListenAndServe()
}

func (w *httpServer) Shutdown(ctx context.Context) error {
	return nil
}
