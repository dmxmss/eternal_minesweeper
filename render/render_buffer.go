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

func (r *RenderBufferManager) SetCells([]entities.Cell) error {
}

func (r *RenderBufferManager) Save() error {

}
