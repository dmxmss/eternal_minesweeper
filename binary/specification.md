Render Buffer Protocol Version: 1.0.0

Byte order: Little Endian

The render buffer consists of a Header followed by zero or more Chunks.

Header:
    u32 buffer_version
    u32 item_count

Chunks:
    repeat item_count:
      i64 world_x
      i64 world_y
      uint8 cells[CHUNK_SIZE * CHUNK_SIZE]

Header size: 8 bytes
Item size:   16 + CHUNK_SIZE*CHUNK_SIZE bytes

# Entities
`buffer_version`:
  - initial value: 0
  - increments by 1 on successfull saves

`cells`:
  - uint8 array
  - each byte represents cell state

## cell states
0..8 = OPEN (Cell is open with the number of mines around the cell)
16   = FLAGGED
32   = MINE
