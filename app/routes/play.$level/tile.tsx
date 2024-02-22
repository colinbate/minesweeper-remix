import type { MouseEventHandler } from "react";
import type { Square } from "./types";


export default function Tile({ state, value, onClick } : Square & { onClick: MouseEventHandler<EventTarget> }) {

  return (
    <button onClick={onClick} className={`size-8 flex items-center justify-center ${state === 'revealed' ? `bg-gray-300 dark:bg-gray-600` : `bg-indigo-600`}`}>
      {state === 'flagged' ?
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="size-5" fill="currentColor"><path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352H424c13.3 0 24-10.7 24-24c0-5.2-1.7-10.2-4.8-14.4L352 192 443.2 70.4c3.1-4.2 4.8-9.2 4.8-14.4c0-13.3-10.7-24-24-24H64z"/></svg>
      : (state === 'unknown' ? ''
        : (value === -1 ?
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="size-6" fill="#dc2626"><path d="M256 0l56.8 118.8L437 75 393.2 199.2 512 256 393.2 312.8 437 437 312.8 393.2 256 512 199.2 393.2 75 437l43.8-124.2L0 256l118.8-56.8L0 0 199.2 118.8 256 0z"/></svg>
          : (value === 0 ? '' : value)
          )
      )}
    </button>
  );
}