package binary

import "github.com/dmxmss/eternal_minesweeper/entities"

func CellToBinary(cell entities.Cell) Cell {
	var state CellState

	switch cell.State.Type {
	case entities.CellMines:
		switch cell.State.Mines {
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
	}

	return Cell{
		WorldX: cell.Position.X,
		WorldY: cell.Position.Y,
		State: state,
	}
}
