build:
	GOOS=js GOARCH=wasm go build -o main.wasm .

serve:
	python3 -m http.server 8000
