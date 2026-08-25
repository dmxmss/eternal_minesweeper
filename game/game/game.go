package game

import (
	"github.com/dmxmss/eternal_minesweeper/entities"
)

type Game struct {
	World *entities.WorldState
	renderBuffer RenderBufferInterface
}

func (g *Game) Start() {

}

func New(renderBuffer RenderBufferInterface) *Game {
	world := entities.WorldState{
		Seed: 123,
	}

	return &Game{
		&world,
		renderBuffer,
	}
}
