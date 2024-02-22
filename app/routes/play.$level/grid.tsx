import { useState } from "react";
import type { MouseEvent as RMouseEvent, ChangeEvent as RChangeEvent } from "react";
import { BOMB, clearSafeArea, createMinefield, fillInMines, gameState, setTileState } from "./field";
import { Level } from "./types";
import Tile from "./tile";

function Toggle({ onToggle }: { onToggle: (value: boolean) => void}) {
  function handle(ev: RChangeEvent<HTMLInputElement>) {
    const value = ev.target.checked;
    onToggle(value);
  }
  return (
    <label className="relative flex justify-between items-center">
      Flag Mode
      <input type="checkbox" onChange={handle} className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" />
      <span className="w-14 h-8 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-indigo-600 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6"></span>
    </label>
  )
}


export default function Grid({ width, height, mines } : Level) {
  const [field, setField] = useState(createMinefield({ width, height, mines }));
  const [empty, setEmpty] = useState(true);
  const [game, setGame] = useState<'none' | 'win' | 'lose'>('none');
  const [flags, setFlags] = useState(0);
  const [flagMode, setFlagMode] = useState(false);

  function toggleFlagMode(value: boolean) {
    setFlagMode(value);
  }

  function tileClick(ev: RMouseEvent<EventTarget, MouseEvent>, x: number, y: number) {
    ev.preventDefault();
    if (game !== 'none' || field[y][x].state === 'revealed') return;
    const newState = field[y][x].state === 'flagged' ? 'unknown' : (ev.shiftKey || flagMode ? 'flagged' : 'revealed');
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
    <div className="flex flex-col relative">
      {game !== 'none' ? <div className="absolute inset-0 flex items-center justify-center font-bold text-3xl z-10">You {game}.</div> : ''}
      <div className={`flex flex-col gap-px ${game === 'none' ? `` : `opacity-50`}`}>
        {field.map((row, y) => 
          <div key={y} className="flex gap-px">
            {row.map((cell, x) => 
              <Tile key={x} {...cell} onClick={(ev) => tileClick(ev, x, y)} />
            )}
          </div>
        )}
      </div>
      <div className="p-4 bg-gray-200 dark:bg-gray-800 flex justify-between items-center">
        <span>Mines: {mines - flags}</span>
        <span>
          <Toggle onToggle={toggleFlagMode} />
        </span>
      </div>
    </div>
  );
}