FROM golang:1.14.2 as build

WORKDIR /go/src/app
COPY . .

ENV CGO_ENABLED=0

RUN go get -d -v ./...
RUN go install -v ./...
RUN go build -v -o go-app

FROM alpine:3.11 as prod
COPY --from=build go/src/app/ app/
CMD ["./app/go-app"]