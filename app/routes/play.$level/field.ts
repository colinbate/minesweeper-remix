import { DIRECTIONS, bfwalk, movePoint, toToken, update2DGrid } from './bfwalk';
import { getRandom2DIndex } from './random';
import type { Level, Minefield, Point, Square } from './types';

export const BOMB = -1;
export const CLEAR = 0;

function getNMines(level: Level, exclude: string) {
	const mines = new Set<string>();
	while (mines.size < level.mines) {
		const pt = getRandom2DIndex(level.width, level.height);
		const token = toToken(pt);
		if (mines.has(token) || token === exclude) continue;
		mines.add(token);
	}
	return mines;
}

function getNearbyMineCount(mines: Set<string>, x: number, y: number) {
	let total = 0;
	for (const dir of DIRECTIONS) {
		const neighbour = movePoint(x, y, dir);
		if (mines.has(toToken(neighbour))) {
			total += 1;
		}
	}
	return total;
}

export function createMinefield(level: Level) {
	const field: Minefield = [];

	for (let y = 0; y < level.height; y += 1) {
		field.push([]);
		for (let x = 0; x < level.width; x += 1) {
			const tile = {
				state: 'unknown',
				value: 0
			} as Square;
			field[y].push(tile);
		}
	}
	return field;
}

export function fillInMines(field: Minefield, pt: Point, mines: number) {
	const height = field.length;
	const width = field[0].length;
	const placed = getNMines({ mines, height, width }, toToken(pt));
  return field.map((row, y) => row.map((cell, x) => ({
    ...cell,
    value: placed.has(toToken([x, y])) ? BOMB : getNearbyMineCount(placed, x, y),
  })));
}

export function clearSafeArea(field: Minefield, [x, y]: Point) {
	return bfwalk(field, [x, y], (sq) => ([sq.value === CLEAR, {...sq, state: 'revealed'} satisfies Square]));
}

export function setTileState(field: Minefield, [x, y]: Point, state: Square['state']) {
  if (field[y][x].state === state) return field;
  return update2DGrid(field, [x, y], {...field[y][x], state});
}

export function flagCount(field: Minefield) {
	const height = field.length;
	const width = field[0].length;
	let flags = 0;

	for (let y = 0; y < height; y += 1) {
		for (let x = 0; x < width; x += 1) {
			if (field[y][x].state === 'flagged') flags += 1;
		}
	}
	return flags;
}

export function gameState(field: Minefield, mines: number) {
	const height = field.length;
	const width = field[0].length;
	let safe = 0;

	for (let y = 0; y < height; y += 1) {
		for (let x = 0; x < width; x += 1) {
			if (field[y][x].state === 'revealed') {
				if (field[y][x].value === BOMB) return 'lose';
			} else {
				safe += 1;
			}
		}
	}
	return safe === mines ? 'win' : 'none';
}