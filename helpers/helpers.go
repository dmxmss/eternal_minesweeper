package helpers

import (
	"syscall/js"
)

func Log(message string) {
	js.Global().Get("console").Call("log", message)
}
