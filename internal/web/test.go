package web

import "net/http"

func registerTestHandlers(mux *http.ServeMux) {
	// Register test handlers here
	mux.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Test endpoint"))
	})
}
