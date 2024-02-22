import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Minesweeper" },
    { name: "description", content: "Play Minesweeper in Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex items-center justify-center">
      <div className="overflow-hidden bg-white dark:bg-gray-700 shadow sm:rounded-lg w-full max-w-96">
        <div className="px-4 py-5 sm:p-6 flex flex-col gap-6">
          <Link
            to="/play/easy"
            className="rounded-md text-center bg-indigo-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Easy
          </Link>
          <Link
            to="/play/medium"
            className="rounded-md text-center bg-indigo-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Medium
          </Link>
          <Link
            to="/play/hard"
            className="rounded-md text-center bg-indigo-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Hard
          </Link>
        </div>
      </div>

    </div>

  );
}
