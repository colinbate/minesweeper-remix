import type { Point, Vector } from './types';
export const DIRECTIONS = [
	[0, -1],
	[1, -1],
	[1, 0],
	[1, 1],
	[0, 1],
	[-1, 1],
	[-1, 0],
	[-1, -1]
] satisfies Vector[];

export const toToken = ([x, y]: Point) => `${x}|${y}`;

export function movePoint(x: number, y: number, delta: Vector) {
	return [x + delta[0], y + delta[1]] as Point;
}

function isInBounds(grid: unknown[][], [x, y]: Point) {
	return x >= 0 && y >= 0 && y < grid.length && x < grid[y].length;
}

export function update2DGrid<T>(grid: T[][], [x, y]: Point, newVal: T) {
  if (grid[y][x] === newVal) return grid;
  return [
    ...grid.slice(0,y), 
    [
      ...grid[y].slice(0, x),
      newVal,
      ...grid[y].slice(x + 1)
    ],
    ...grid.slice(y + 1)];
}

function step<T>(grid: T[][], nodes: Point[], visit: (x: T) => [boolean, T], visited: Set<string>) {
	while (nodes.length) {
		const first = nodes.shift();
		if (!first) return grid;
		const [x, y] = first;
		const [proceed, altered] = visit(grid[y][x]);
    grid = update2DGrid(grid, first, altered);
		const token = toToken([x, y]);
		visited.add(token);
		const nextUp = proceed
			? DIRECTIONS.reduce((p, c) => {
					const next = movePoint(x, y, c);
					const t = toToken(next);
					if (!visited.has(t) && isInBounds(grid, next)) {
						p.push(next);
					}
					return p;
				}, [] as Point[])
			: [];
		nodes.push(...nextUp);
  }
  return grid;
}
export function bfwalk<T>(grid: T[][], start: Point, visit: (x: T) => [boolean, T]) {
	const visited = new Set<string>();
	return step(grid, [start], visit, visited);
}