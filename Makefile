# METADATA
VERSION=v0.1.0

# CMD
BIN_DIR=build

# DOCKER
IMAGE_NAME=landing_site_2021

.PHONY: all build clean-bin format

all: build

build: clean-bin
	npm run build

clean-bin:
	if [ -d $(BIN_DIR) ]; then rm -r $(BIN_DIR); fi

serve:
	./server.sh

format:
	npx prettier --write --arrow-parens always --single-quote --trailing-comma all --no-bracket-spacing "src/**/*.js"
	npx prettier --write --arrow-parens always --single-quote --trailing-comma all --no-bracket-spacing "src/**/*.scss"

## gen
.PHONY: gen

gen:
	./servicedef-gen.sh

## docker
DOCKER_IMAGE_NAME=landing_site_2021
DOCKER_VERSION=v0.1.0
DOCKER_FILE=./Dockerfile
.PHONY: build-docker produp proddown
build-docker:
	docker build -f $(DOCKER_FILE) -t $(DOCKER_IMAGE_NAME):$(DOCKER_VERSION) -t $(DOCKER_IMAGE_NAME):latest .

produp:
	docker-compose -f dc.main.yaml -f dc.compose.yaml up -d

proddown:
	docker-compose -f dc.main.yaml -f dc.compose.yaml down

## service
SERVICE_STACK=landing_site_2021
SERVICE_DEF_DIR=defs
SERVICE_DEF_NAME=$(SERVICE_DEF_DIR)/dc.$(SERVICE_STACK).yaml
.PHONY: service launch danger-land
service:
	./servicedef-gen.sh $(SERVICE_DEF_DIR) $(SERVICE_DEF_NAME)

launch:
	docker stack deploy -c $(SERVICE_DEF_NAME) $(SERVICE_STACK)

danger-land:
	docker stack rm $(SERVICE_STACK)
