ifneq (,$(wildcard ./.env))
    include ./.env
endif

SERVICE := gatekeeper
DOCKER_REGISTRY ?= ghcr.io/flusinerd
GIT_HASH ?= $(shell git log --format="%h" -n 1)
ROOT_DIR := $(shell git rev-parse --show-toplevel)

.PHONY: dev dev-frontend run test build push release

# Run in development mode using air
dev:
	@echo "Starting $(SERVICE) in dev mode..."
	@air serve

dev-frontend:
	@echo "Starting frontend in dev mode..."
	@cd ${ROOT_DIR}/ui && npm run dev

# Run the service
run:
	@echo "Running $(SERVICE)..."
	@go run cmd/main.go

# Run tests
test:
	@echo "Running tests for $(SERVICE)..."
	@go test ./...

# Build Docker image
build:
	@echo "Building Docker image for $(SERVICE)..."
	@cd ${ROOT_DIR} && docker build -t ${DOCKER_REGISTRY}/$(SERVICE):${GIT_HASH} -f build/Dockerfile .

# Push Docker image
push:
	@echo "Pushing Docker image for ${Service} ..."
	@docker push ${DOCKER_REGISTRY}/$(SERVICE):${GIT_HASH}

# Retag image as latest
release:
	@docker pull ${DOCKER_REGISTRY}/$(SERVICE):${GIT_HASH}
	@docker tag ${DOCKER_REGISTRY}/$(SERVICE):${GIT_HASH} ${DOCKER_REGISTRY}/$(SERVICE):latest
	@docker push ${DOCKER_REGISTRY}/$(SERVICE):latest
