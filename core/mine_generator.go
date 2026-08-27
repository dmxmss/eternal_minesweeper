package core

type MineGenerator interface {
	IsMine(x, y int64) bool
}
