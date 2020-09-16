include .env

blah: dev

start:
	@go run .

dev: dependencies docs
	@air -c ${AIR_FILE}

docker:
	@docker-compose up --build

redis:
	@redis-cli -h ${REDIS_HOST} -p ${REDIS_PORT} -a ${REDIS_PASSWORD}

dependencies:
	@go mod download
	@go get ./...

docs:
	@swag init

commit: docs
	@git add .
	@git commit -am ${COMMIT_MESSAGE}

deploy: commit
	@git push heroku develop:master

push: commit
	@git push