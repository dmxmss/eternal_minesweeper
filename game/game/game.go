package game

import (
	"github.com/dmxmss/eternal_minesweeper/entities"
)

type Game struct {
	World *entities.WorldState
	Viewport *entities.Viewport
	Camera *entities.Camera
}

func (g *Game) Start() {

}

func New() *Game {
	world := entities.WorldState{
		Seed: 123,
	}

	viewport := entities.Viewport{
		Height: 10,
		Width: 10,
	}

	camera := entities.Camera{
		Coord: entities.Coord{X: 0, Y: 0},
		Zoom: 1,
	}

	return &Game{
		&world,
		&viewport,
		&camera,
	}
}
