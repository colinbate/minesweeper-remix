import { useLoaderData, type ClientLoaderFunctionArgs, type MetaFunction } from "@remix-run/react";
import Grid from "./grid";

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  if (params.level === 'easy') {
    return { width: 9, height: 9, mines: 10 };
  }
  if (params.level === 'medium') {
    return { width: 10, height: 13, mines: 20 };
  }
  return { width: 12, height: 16, mines: 30 };
};

export const meta: MetaFunction = () => {
  return [
    { title: "Minesweeper" },
    { name: "description", content: "Play Minesweeper in Remix!" },
  ];
};

export default function Play() {
  const data = useLoaderData<typeof clientLoader>();
  return (
    <div className="flex items-center justify-center flex-col gap-8">
      <div className="overflow-hidden bg-white dark:bg-gray-700 shadow-lg dark:shadow-gray-400/20 sm:rounded-lg w-min max-w-full">
        <Grid {...data} />
      </div>

      <div className="text-gray-500">Shift-click to set a flag.</div>
    </div>
  );
}