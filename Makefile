include .env

blah: dev

start:
	@go run .

dev:
	@air -c ${AIR_FILE}

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
	@git commit -am ${COMMIT_MESSAGE}

deploy: commit
	@git push heroku develop:master

push: commit
	@git push