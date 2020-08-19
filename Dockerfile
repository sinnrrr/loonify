FROM golang

# Move to working directory /build
WORKDIR /build

# Copy and download dependency using go mod
COPY go.mod .
COPY go.sum .

RUN go mod download
RUN go get -u github.com/cosmtrek/air

# Copy the code into the container
COPY . .

RUN alias air='~/.air'

# Build the application
RUN air -c .air