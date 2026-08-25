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
	CellMines CellStateType = iota
	CellFlagged
	CellMine
)
