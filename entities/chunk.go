package entities

type Chunk struct {
	Position Coord
	size int
	cells []Cell
}

func NewChunk(position Coord, size int) *Chunk {
	return &Chunk{
		Position: position,
		size: size,
		cells: make([]Cell, size*size),
	}
}

func (c *Chunk) Get(x, y int) *Cell {
	if x < 0 || x > c.size || y < 0 || y > c.size {
		return nil
	}

	return &c.cells[x * c.size + y]
}

func (c *Chunk) Set(x, y int, cell Cell) {
	if x < 0 || x > c.size || y < 0 || y > c.size {
		return
	}

	c.cells[x * c.size + y] = cell
}

func (c *Chunk) GetSize() int {
	return c.size
}

func (c *Chunk) GetCells() []Cell {
	return c.cells
}
