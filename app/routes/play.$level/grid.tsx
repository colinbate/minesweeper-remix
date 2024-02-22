import { useState } from "react";
import type { MouseEvent as RMouseEvent } from "react";
import { BOMB, clearSafeArea, createMinefield, fillInMines, gameState, setTileState } from "./field";
import { Level } from "./types";
import Tile from "./tile";


export default function Grid({ width, height, mines } : Level) {
  const [field, setField] = useState(createMinefield({ width, height, mines }));
  const [empty, setEmpty] = useState(true);
  const [game, setGame] = useState<'none' | 'win' | 'lose'>('none');
  const [flags, setFlags] = useState(0);

  function tileClick(ev: RMouseEvent<EventTarget, MouseEvent>, x: number, y: number) {
    ev.preventDefault();
    if (game !== 'none' || field[y][x].state === 'revealed') return;
    const newState = field[y][x].state === 'flagged' ? 'unknown' : (ev.shiftKey ? 'flagged' : 'revealed');
    let newField = field;
    if (newState === 'revealed') {
      if (empty) {
        newField = fillInMines(newField, [x, y], mines);
        setEmpty(false);
      }
      newField = clearSafeArea(newField, [x, y]);
      if (newField[y][x].value === BOMB) {
        setGame('lose');
      }
    } else {
      setFlags(flags + (newState === 'flagged' ? 1 : -1));
      newField = setTileState(newField, [x, y], newState);
    }
    setField(newField);
    setGame(gameState(newField, mines));
  }
  return (
    <div className="flex flex-col">
      <div className={`flex flex-col gap-px ${game === 'none' ? `` : `opacity-50`}`}>
        {field.map((row, y) => 
          <div key={y} className="flex gap-px">
            {row.map((cell, x) => 
              <Tile key={x} {...cell} onClick={(ev) => tileClick(ev, x, y)} />
            )}
          </div>
        )}
      </div>
      <div className="p-4 bg-gray-200 dark:bg-gray-800 flex justify-between">
        <span>Remaining mines: {mines - flags}</span>
        <span>{game !== 'none' ? `You ${game}.` : ''}</span>
      </div>
    </div>
  );
}