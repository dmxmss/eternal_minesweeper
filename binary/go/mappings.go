package binary

import (
	"errors"

	"github.com/dmxmss/eternal_minesweeper/entities"
)

func CellToBinary(cell entities.Cell) CellState {
	var state CellState

	switch cell.State.Type {
	case entities.CellOpen:
		switch cell.State.Value {
		case 0:
			state = CellMines0
		case 1:
			state = CellMines1
		case 2:
			state = CellMines2
		case 3:
			state = CellMines3
		case 4:
			state = CellMines4
		case 5:
			state = CellMines5
		case 6:
			state = CellMines6
		case 7:
			state = CellMines7
		case 8:
			state = CellMines8
		}

	case entities.CellMine:
		state = CellMine

	case entities.CellFlagged:
		state = CellFlagged

	case entities.CellClosed:
		state = CellClosed
	}

	return state
}

func ChunkToBinary(chunk *entities.Chunk) (*Chunk, error) {
	if chunk.GetSize() != ChunkSize {
		return nil, errors.New("binary chunk's size and given chunk's size do not match")
	}

	var bCells [ChunkSize*ChunkSize]CellState
	for i, cell := range chunk.GetCells() {
		bCell := CellToBinary(cell)
		bCells[i] = bCell
	}	

	return &Chunk{
		WorldX: chunk.Position.X,
		WorldY: chunk.Position.Y,
		Cells: bCells,
	}, nil
}
