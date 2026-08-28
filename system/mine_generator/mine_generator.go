package mine_generator

type MineGeneratorV1 struct {
	seed uint64
	threshold uint64
}

func NewMineGeneratorV1(seed, threshold uint64) *MineGeneratorV1 {
	return &MineGeneratorV1{
		seed,
		threshold,
	}
}

func (g *MineGeneratorV1) IsMine(x, y int64) bool {
	h := g.seed

	h = mix(h ^ uint64(x))
	h = mix(h ^ uint64(y))

	return h < g.threshold
}

func mix(x uint64) uint64 {
	x += 0x9e3779b97f4a7c15
  x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9
  x = (x ^ (x >> 27)) * 0x94d049bb133111eb
  return x ^ (x >> 31)
}
