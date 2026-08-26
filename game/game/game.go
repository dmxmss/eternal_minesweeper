package game

import (
	"github.com/dmxmss/eternal_minesweeper/entities"
)

type Game struct {
	World *entities.WorldState
	mineGenerator MineGenerator
	renderBuffer RenderBufferInterface
}

func (g *Game) Start() {

}

func New(mineGenerator MineGenerator, renderBuffer RenderBufferInterface) *Game {
	world := entities.WorldState{
		Seed: 123,
	}

	return &Game{
		&world,
		mineGenerator,
		renderBuffer,
	}
}

func (g *Game) OpenCell(x, y int64) entities.GameState {
	_, isOpen := g.World.Opened[entities.Coord{X: x, Y: y}]
	
	if isOpen {
		return entities.GamePlaying
	}

	_, isFlagged := g.World.Flags[entities.Coord{X: x, Y: y}]
	
	if isFlagged {
		return entities.GamePlaying
	}

	isMine := g.mineGenerator.IsMine(x, y)	
	if isMine {
		return entities.GameOver
	}

	minesAround := 0
	for i := int64(-1); i <= 1; i++ {
		for j := int64(-1); j <= 1; j++ {
			if i == 0 && j == 0 {
				continue
			}

			if g.mineGenerator.IsMine(x+i, y+j) {
				minesAround++
			}
		}
	}

	g.renderBuffer.SetCells([]entities.Cell{
		{
			Position: entities.Coord{X: x, Y: y},
			State: entities.CellState{
				Type: entities.CellMines,
				Mines: minesAround,	
			},
		},
	})

	g.renderBuffer.Save()

	return entities.GamePlaying
}
