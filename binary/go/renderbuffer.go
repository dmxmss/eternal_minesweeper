package renderbuffer

import "encoding/binary"

const (
	ProtocolVersion = "1.0.0"

	HeaderSize = 8
	ItemSize   = 18
)

type ItemType uint8

const (
	TypeCell ItemType = 0
)

type CellState uint8

const (
	CellMines0 CellState = 0
	CellMines1 CellState = 1
	CellMines2 CellState = 2
	CellMines3 CellState = 3
	CellMines4 CellState = 4
	CellMines5 CellState = 5
	CellMines6 CellState = 6
	CellMines7 CellState = 7
	CellMines8 CellState = 8

	CellFlagged CellState = 16
	CellMine    CellState = 32
)

type Cell struct {
	WorldX int64
	WorldY int64
	State  CellState
}

type RenderBuffer struct {
	version uint32

	items []Cell
	buf   []byte
}

func New(capacity int) *RenderBuffer {
	return &RenderBuffer{
		items: make([]Cell, 0, capacity),
		buf:   make([]byte, HeaderSize, HeaderSize+capacity*ItemSize),
	}
}

func (r *RenderBuffer) SetCells(cells []Cell) {
	r.items = append(r.items[:0], cells...)
}

func (r *RenderBuffer) Save() []byte {
	r.version++

	itemCount := len(r.items)

	size := HeaderSize + itemCount*ItemSize

	if cap(r.buf) < size {
		r.buf = make([]byte, HeaderSize, size)
	}

	r.buf = r.buf[:size]

	binary.LittleEndian.PutUint32(
		r.buf[0:4],
		r.version,
	)

	binary.LittleEndian.PutUint32(
		r.buf[4:8],
		uint32(itemCount),
	)

	for i, cell := range r.items {
		offset := HeaderSize + i*ItemSize

		binary.LittleEndian.PutUint64(
			r.buf[offset:offset+8],
			uint64(cell.WorldX),
		)

		binary.LittleEndian.PutUint64(
			r.buf[offset+8:offset+16],
			uint64(cell.WorldY),
		)

		r.buf[offset+16] = uint8(TypeCell)
		r.buf[offset+17] = uint8(cell.State)
	}

	return r.buf
}
