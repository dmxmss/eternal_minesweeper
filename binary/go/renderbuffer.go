package binary

import "encoding/binary"

const (
	ProtocolVersion = "1.0.0"
	ChunkSize = 32

	HeaderSize = 8
	ItemSize   = 16 + ChunkSize*ChunkSize
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

type Chunk struct {
	WorldX int64
	WorldY int64
	Cells [ChunkSize*ChunkSize]CellState
}

type RenderBuffer struct {
	version uint32

	items []Chunk
	buf   []byte
}

func NewRenderBuffer(capacity int) *RenderBuffer {
	return &RenderBuffer{
		items: make([]Chunk, 0, capacity),
		buf:   make([]byte, HeaderSize, HeaderSize+capacity*ItemSize),
	}
}

func (r *RenderBuffer) Bytes() []byte {
	return r.buf
}

func (r *RenderBuffer) SetChunks(chunks []Chunk) {
	r.items = append(r.items[:0], chunks...)
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

	for i, chunk := range r.items {
		offset := HeaderSize + i*ItemSize

		binary.LittleEndian.PutUint64(
			r.buf[offset:offset+8],
			uint64(chunk.WorldX),
		)

		binary.LittleEndian.PutUint64(
			r.buf[offset+8:offset+16],
			uint64(chunk.WorldY),
		)

		for j, cell := range chunk.Cells {
			r.buf[offset+17+j] = uint8(cell)
		}
	}

	return r.buf
}
