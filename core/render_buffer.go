package core

import "github.com/dmxmss/eternal_minesweeper/entities"

type RenderBufferInterface interface {
	Bytes() []byte
	SetChunks([]entities.Cell) error
	Save() error
}
