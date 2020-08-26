blah: dev

start:
	@go run .

dev:
	@air -c .air

docker:
	@docker-compose up --build

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