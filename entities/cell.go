package entities

type Cell struct {
	Position Coord
	State CellState
}

type CellState struct {
	Type CellStateType
	Mines int
}

type CellStateType int

const (
	CellClosed CellStateType = iota
	CellMines 	
	CellFlagged
	CellMine
)
