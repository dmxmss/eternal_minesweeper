package game

import "github.com/dmxmss/eternal_minesweeper/entities"

type RenderBufferInterface interface {
	SetCells([]entities.Cell)	error
	Save() error
}
