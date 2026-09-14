package core

import (
	"github.com/dmxmss/eternal_minesweeper/entities"
)

type Game struct {
	World *entities.WorldState
	ChunkSize int
	mineGenerator MineGenerator
	renderBuffer RenderBufferInterface
}

func (g *Game) Start() {

}

func NewGame(chunkSize int, seed uint64, mineGenerator MineGenerator, renderBuffer RenderBufferInterface) *Game {
	chunks := make(map[entities.Coord]*entities.Chunk)
	world := entities.WorldState{
		Seed: seed,
		Chunks: chunks,
	}

	return &Game{
		&world,
		chunkSize,
		mineGenerator,
		renderBuffer,
	}
}

func (g *Game) getContainingChunk(cellPos entities.Coord) (entities.Coord, entities.Coord) {
	var chunkPos entities.Coord

	chunkPos.X = floorDiv(cellPos.X, int64(g.ChunkSize))
	chunkPos.Y = floorDiv(cellPos.Y, int64(g.ChunkSize))

	var localCellPos entities.Coord
	localCellPos.X = cellPos.X - chunkPos.X * int64(g.ChunkSize)
	localCellPos.Y = cellPos.Y - chunkPos.Y * int64(g.ChunkSize)

	return chunkPos, localCellPos
}

func (g *Game) getOrCreateChunk(chunkPos entities.Coord) *entities.Chunk {
	chunk, ok := g.World.Chunks[chunkPos]
	if !ok {
		chunk = entities.NewChunk(chunkPos, g.ChunkSize)
		g.World.Chunks[chunkPos] = chunk
	}

	return chunk
}

func (g *Game) OpenCell(x, y int64) entities.GameState {
	chunkPos, localCellPos := g.getContainingChunk(entities.Coord{X: x, Y: y})
	chunk := g.getOrCreateChunk(chunkPos)

	cell := chunk.Get(int(localCellPos.X), int(localCellPos.Y))

	if cell.State.Type != entities.CellClosed {
		return entities.GamePlaying
	}

	isMine := g.mineGenerator.IsMine(x, y)	
	if isMine {
		cell.State.Type = entities.CellMine
		chunk.Set(int(localCellPos.X), int(localCellPos.Y), *cell)

		g.renderBuffer.SetChunks([]entities.Chunk{*chunk})
		g.renderBuffer.Save()

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

	cell.State.Type = entities.CellOpen
	cell.State.Value = minesAround

	chunk.Set(int(localCellPos.X), int(localCellPos.Y), *cell)

	g.renderBuffer.SetChunks([]entities.Chunk{*chunk})
	g.renderBuffer.Save()

	return entities.GamePlaying
}

func (g *Game) RenderBuffer() []byte {
	return g.renderBuffer.Bytes()
}

func floorDiv(a int64, b int64) int64 {
	q := a / b
	if a%b != 0 && (a < 0) != (b < 0) {
		q--
	}
	return q
}
