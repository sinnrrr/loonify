FROM golang

# Move to working directory /build
WORKDIR /build

# Copy and download dependency using go mod
COPY ../go.mod .
COPY ../go.sum .

# Download dependencies using go modules
RUN go mod download

# Copy the code into the container
COPY .. .

# Build the application
RUN go build -o loonify .

# Move to /dist directory as the place for resulting binary folder
WORKDIR /dist

# Copy binary from build to main folder
RUN cp /build/loonify .

# Running app using the compiled binary
CMD ["/dist/loonify"]

# Changing directory for app access
WORKDIR /build