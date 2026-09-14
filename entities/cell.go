package entities

type Cell struct {
	Position Coord
	State CellState
}

type CellState struct {
	Type CellStateType
	Value int
}

type CellStateType int

const (
	CellClosed CellStateType = iota
	CellOpen 	
	CellFlagged
	CellMine
)
