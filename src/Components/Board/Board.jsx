/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Showsidebar from "./../../assets/icon-show-sidebar.svg";
import Lighttheme from "./../../assets/icon-light-theme.svg";
import Darktheme from "./../../assets/icon-dark-theme.svg";
import Ellips from "./../../assets/icon-vertical-ellipsis.svg";
import {
  setBoards,
  setCurrentBoard,
  toggleSidebar,
  toggleDarkMode,
  setLoading,
  addBoard,
} from "./../../store/slice/boardSlices";

import { useDispatch, useSelector } from "react-redux";
import Columns from "../Columns";
import EmptyColumn from "../EmptyColumn";

function Board() {
  const dispatch = useDispatch();
  const { boards, currentBoard, isSidebarOpen, isDarkMode, loading } =
    useSelector((state) => state.board);
  const [isMobileView, setIsMobileView] = useState(false);
  const handleResize = () => {
    setIsMobileView(window.innerWidth < 640); // Adjust this threshold as needed
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log("Boards => ", boards);
  console.log("Current Board ", currentBoard);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div
      className={` flex-grow flex-col  w-full  overflow-scroll h-full  ${
        isDarkMode
          ? "BoardTaskDark  text-white"
          : " bg-blue-50 BoardTaskLight   "
      }    `}
    >
      <div
        className={`flex-grow   ${
          isDarkMode
            ? "BoardTaskDark  text-white"
            : " bg-blue-50 BoardTaskLight   "
        }`}
      >
        <div className="w-full  overflow-x-auto">
          {!currentBoard ||
          !currentBoard.columns ||
          currentBoard.columns.length === 0 ? (
            <EmptyColumn />
          ) : (
            <Columns />
          )}
        </div>
      </div>
      <div>
        {!isSidebarOpen && (
          <footer
            className={`absolute flex flex-col bottom-[32px] left-0 w-full `}
          >
            {!isMobileView ? (
              <div className=" rounded-r-full h-[48px] w-[56px] bg-main-purple justify-center items-center flex ">
                <button
                  onClick={handleToggleSidebar}
                  className="cursor-pointer"
                >
                  <img
                    src={Showsidebar}
                    className={`w-[16px] h-[10.22px]`}
                    alt="Show Sidebar"
                  />
                </button>
              </div>
            ) : (
              ""
            )}
          </footer>
        )}
      </div>
    </div>
  );
}

export default Board;
