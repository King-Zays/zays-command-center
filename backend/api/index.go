package handler

import (
	"net/http"
	"zays-berkuasa-backend/app"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	app.Handler(w, r)
}
