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

func (r *RenderBufferManager) SetChunks(chunks []entities.Chunk) error {
	var bChunks []binary.Chunk
	for _, chunk := range chunks {
		bChunk, err := binary.ChunkToBinary(&chunk)	
		if err != nil {
			return err
		}

		bChunks = append(bChunks, *bChunk)
	}

	r.renderBuffer.SetChunks(bChunks)

	return nil
}

func (r *RenderBufferManager) Save() error {
	r.renderBuffer.Save()

	return nil
}
