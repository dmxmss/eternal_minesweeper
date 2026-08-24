package entities

type WorldState struct {
	Seed uint64
	Opened map[Coord]struct{}
	Flags map[Coord]struct{}
}
