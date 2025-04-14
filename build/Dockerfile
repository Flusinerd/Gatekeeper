# syntax=docker/dockerfile:1-labs
FROM golang:1.24-alpine AS builder-backend

WORKDIR /app

COPY go.mod go.sum* ./
RUN go mod download

COPY --exclude=ui . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -o main ./cmd/main.go

FROM node:lts-alpine AS builder-ui

WORKDIR /ui

COPY ui/package.json ui/package-lock.json ./
RUN npm install

COPY ui/ ./
RUN npm run build

FROM gcr.io/distroless/static:nonroot

COPY --from=builder-backend /app/main /main
COPY --from=builder-ui /ui/dist /public

EXPOSE 80

USER nonroot:nonroot

WORKDIR /
ENTRYPOINT ["/main"]
