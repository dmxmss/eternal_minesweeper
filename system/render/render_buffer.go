package render

import (
	"github.com/dmxmss/eternal_minesweeper/entities"
	"github.com/dmxmss/eternal_minesweeper/binary/go"
)

type RenderBufferManager struct {
	renderBuffer *binary.RenderBuffer
}

func NewRenderBufferManager(renderBuffer *binary.RenderBuffer) *RenderBufferManager {
	return &RenderBufferManager{
		renderBuffer,
	}
}

func (r *RenderBufferManager) Bytes() []byte {
	return r.renderBuffer.Bytes()
}

func (r *RenderBufferManager) SetCells(cells []entities.Cell) error {
	var binaryCells []binary.Cell

	for _, cell := range cells {
		binaryCell := binary.CellToBinary(cell)
		binaryCells = append(binaryCells, binaryCell)
	}

	r.renderBuffer.SetCells(binaryCells)

	return nil
}

func (r *RenderBufferManager) Save() error {
	r.renderBuffer.Save()

	return nil
}
