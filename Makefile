include .env

blah: dev

start:
	@go run .

dev: dependencies swagger ent
	@go run github.com/cosmtrek/air -c ${AIR_FILE}

docker:
	@docker-compose up --build

dependencies:
	@go mod download
	@go get ./...
	@go mod tidy

swagger:
	@go run github.com/swaggo/swag/cmd/swag init

ent:
	@go generate ./ent

commit: dependencies swagger ent
	@git add .
	@git commit -am ${COMMIT_MESSAGE}

deploy: commit
	@git push heroku develop:master

push: commit
	@git push