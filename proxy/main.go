package main

import (
	"os"

	"github.com/thuongtruong109/gouse/net"
)

func main() {
	// net.Proxy("3333", []string{"http://localhost:3000", "http://localhost:3001"})
	net.Proxy("3333", []string{os.Getenv("APP_1"), os.Getenv("APP_2")})
}
