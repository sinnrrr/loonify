blah: dev

start:
	@go run .

dev:
	@air -c .air

docker:
	@docker-compose up --build

templates:
	@cd frontend
	@yarn generate

deploy: commit
	@git push heroku:master

push: commit
	@git push

commit:
	@git add .
	@git commit -am "makefile commit"