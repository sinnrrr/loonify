include .env

blah: dev

start:
	@go run .

dev:
	@air -c .air

docker:
	@docker-compose up --build

redis:
	@redis-cli -h ${REDIS_HOST} -p ${REDIS_PORT} -a ${REDIS_PASSWORD}

templates:
	@cd frontend && yarn generate

dependencies:
	@echo "Installing go dependencies..."
	@go get ./...
	@echo "Installing nuxt dependencies..."
	@cd frontend && yarn install

commit:
	@git add .
	@git commit -am "makefile commit"

deploy: commit
	@git push heroku develop:master

push: commit
	@git push