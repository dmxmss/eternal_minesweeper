Render Buffer Protocol Version: 1.0.0

Byte order: Little Endian

The render buffer consists of a Header followed by zero or more Items.

Header:
    u32 buffer_version
    u32 item_count

Item:
    i64 world_x
    i64 world_y
    u8  type
    u8  state

Header size: 8 bytes
Item size:   18 bytes

# Entities
`buffer_version`:
  - initial value: 0
  - increments by 1 on successfull saves

# Item types
0 = CELL

## CELL states
0..8 = Number of mines around the cell
16   = FLAGGED
32   = MINE

# Item types
0 = CELL

## CELL states
0..8 = Number of mines around the cell
16   = FLAGGED
32   = MINE
