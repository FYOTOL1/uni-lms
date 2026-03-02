import type { Dispatch, SetStateAction } from "react";
import { Link } from "react-router";

type Props = {
  pathsBarIsActive: boolean;
  setPathsBarIsActive: Dispatch<SetStateAction<boolean>>;
};

const PathsBar = ({ pathsBarIsActive, setPathsBarIsActive }: Props) => {
  const pathsList = [
    {
      name: "dashboard",
      path: "/admin/dashboard",
      icon: "fa-solid fa-chart-line",
    },
    {
      name: "subjects",
      path: "/admin/subjects",
      icon: "fa-solid fa-book-bookmark",
    },
    {
      name: "calendars",
      path: "/admin/calendars",
      icon: "fa-solid fa-calendar",
    },
    {
      name: "lectures",
      path: "/admin/lectures",
      icon: "fa-solid fa-graduation-cap",
    },
    {
      name: "sections",
      path: "/admin/sections",
      icon: "fa-solid fa-file-zipper",
    },
    {
      name: "assignments",
      path: "/admin/assignments",
      icon: "fa-solid fa-list-check",
    },
  ];

  return (
    <>
      <div
        className={`h-screen ${pathsBarIsActive && "absolute left-0 bottom-0 top-0 w-full md:w-1/3 z-30 px-4" } bg-gray-50 shadow-sm outline-2 outline-zinc-100`}
      >
        <header
          className={`flex items-center ${pathsBarIsActive ? "justify-between" : "justify-center"} h-16 w-full`}
        >
          {pathsBarIsActive && (
            <div className="flex items-center">
              <div className="flex items-center justify-center size-8 text-[17px] text-white bg-purple-500 p-3 rounded-full">
                <i className="fa-solid fa-building-columns"></i>
              </div>
            </div>
          )}
          <button
            onClick={() => setPathsBarIsActive(!pathsBarIsActive)}
            className="text-lg size-8 rounded-sm transition-all cursor-pointer hover:text-gray-700"
          >
            {pathsBarIsActive ? (
              <i className="fa-solid fa-bars-staggered" />
            ) : (
              <i className="fa-solid fa-bars" />
            )}
          </button>
        </header>

        {/* Paths */}
        <div
          className={`flex flex-col mx-auto gap-3 ${pathsBarIsActive ? "w-full" : "w-fit px-1"} mt-8`}
        >
          {pathsList.map((e) => (
            <>
              <Link
                to={e.path}
                className="flex items-center gap-4 w-full p-2 px-3 rounded-md bg-zinc-100 outline outline-gray-300 shadow-sm transition-all hover:bg-white"
              >
                <div className="flex items-center justify-center size-7 rounded-md outline outline-gray-200">
                  <i className={`${e.icon} text-blue-500`} />
                </div>

                <h1 className={`${pathsBarIsActive ? "capitalize" : "hidden"}`}>
                  {e.name}
                </h1>
              </Link>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default PathsBar;
