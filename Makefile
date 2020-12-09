include .env

blah: dev

start:
	@go run .

dev: dependencies
	@air -c ./build/${AIR_FILE}

docker:
	@docker-compose up --build

dependencies:
	@go mod download
	@go get ./...
	@go mod tidy

commit: dependencies
	@git add .
	@git commit -am ${COMMIT_MESSAGE}

deploy: commit
	@git push heroku develop:master

push: commit
	@git push