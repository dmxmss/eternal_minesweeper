package entities

type WorldState struct {
	Seed uint64
	Chunks map[Coord]*Chunk
}
