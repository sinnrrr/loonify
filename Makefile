include .env

blah: dev

start:
	@go run .

dev: dependencies swagger
	@air -c ${AIR_FILE}

docker:
	@docker-compose up --build

redis:
	@redis-cli -h ${REDIS_HOST} -p ${REDIS_PORT} -a ${REDIS_PASSWORD}

dependencies:
	@go mod download
	@go get ./...
	@go mod tidy

swagger:
	@swag init

commit: swagger
	@git add .
	@git commit -am ${COMMIT_MESSAGE}

deploy: commit
	@git push heroku develop:master

push: commit
	@git push