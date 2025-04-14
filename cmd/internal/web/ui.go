package web

import (
	"net/http"
	"os"
	"path/filepath"
)

func registerUiHandlers(mux *http.ServeMux) {
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		distPath := "./public"
		absPath, err := filepath.Abs(distPath)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		path := filepath.Join(absPath, r.URL.Path)
		_, err = os.Stat(path)

		if os.IsNotExist(err) {
			http.ServeFile(w, r, filepath.Join(absPath, "index.html"))
			return
		} else if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		http.FileServer(http.Dir(absPath)).ServeHTTP(w, r)
	})
}
