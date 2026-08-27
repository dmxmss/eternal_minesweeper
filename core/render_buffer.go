package core

import "github.com/dmxmss/eternal_minesweeper/entities"

type RenderBufferInterface interface {
	Bytes() []byte
	SetCells([]entities.Cell) error
	Save() error
}
