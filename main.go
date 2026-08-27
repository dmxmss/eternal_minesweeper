package main

import (
	"syscall/js"

	binary "github.com/dmxmss/eternal_minesweeper/binary/go"
	"github.com/dmxmss/eternal_minesweeper/core"
	"github.com/dmxmss/eternal_minesweeper/system/mine_generator"
	"github.com/dmxmss/eternal_minesweeper/system/render"
)

var g *core.Game

func main() {
	renderBuffer := binary.NewRenderBuffer(1024)

	mineGenerator := &mine_generator.MineGeneratorV1{}
	renderBufferManager := render.NewRenderBufferManager(renderBuffer)

	g = core.NewGame(mineGenerator, renderBufferManager)

	api := js.Global().Get("Object").New()

	api.Set(
		"openCell",
		js.FuncOf(openCell),
	)

	api.Set(
		"getRenderBuffer",
		js.FuncOf(getRenderBuffer),
	)

	js.Global().Set("game", api)

	select {}
}

func openCell(this js.Value, args []js.Value) interface{} {
	if len(args) != 2 {
		panic("openCell expects 2 arguments")
	}

	x := int64(args[0].Int())
	y := int64(args[1].Int())

	_ = g.OpenCell(x, y)

	return nil
}

func getRenderBuffer(this js.Value, args []js.Value) interface{} {
	data := g.RenderBuffer()

	result := js.Global().
			Get("Uint8Array").
			New(len(data))

	js.CopyBytesToJS(result, data)

	return result
}
