/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, ToggleButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import LogoLight from "../../assets/logo-light.svg";
import LogoDark from "./../../assets/logo-dark.svg";

import Lighttheme from "./../../assets/icon-light-theme.svg";
import Darktheme from "./../../assets/icon-dark-theme.svg";
import BoardIcon from "./../../assets/icon-board.svg?react";
import ThemeToggle from "../ThemeToggle";
import HideSidebar from "./HideSidebar";
import CreateNewBoard from "./CreateNewBoard";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDarkMode,
  toggleSidebar,
  setactive,
  setCurrentBoard,
} from "./../../store/slice/boardSlices";
// CreateNewBoard
function Sidebar() {
  const dispatch = useDispatch();
  // const [activeItem, setActiveItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const {
    boards,
    currentBoard,
    isSidebarOpen,
    activeItem,
    isDarkMode,
    loading,
    deleteBoardById,
  } = useSelector((state) => state.board);
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

  useEffect(() => {
    // Assuming the default board id is 1
    // dispatch(setCurrentBoard(1));

    // dispatch(setactive(1));
    const defaultBoard = boards.find((board) => board.id === 1);
    if (defaultBoard) {
      dispatch(setCurrentBoard(defaultBoard));
      dispatch(setactive(1));
    }
  }, [dispatch, boards]);

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClick = (board) => {
    dispatch(setactive(board.id));
    dispatch(setCurrentBoard(board));
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div
      className={`relative hidden sm:flex  flex-col  w-[300px]   ${
        isDarkMode ? " border-r border-gray-700 " : " border-r border-gray-200"
      }  container
       ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}  `}
    >
      <div className="flex-grow flex flex-col  w-[300px]">
        <div className="flex flex-col mt-[55px] left-0 flex-grow  ">
          <h2 className="heading-custom-color mx-[32px] heading-S my-0 ">{` ALL BOARDS ( ${boards?.length} )`}</h2>

          <div className=" flex w-[276px] ">
            <ul className="flex flex-col mt-[20px] ">
              {boards.map((board, i) => (
                <li
                  className={`flex items-center gap-5 cursor-pointer sidebaritem w-[276px] rounded-r-full h-[48px] px-[30px]   ${
                    isDarkMode
                      ? "Board  AddLightGrey  hover:text-main-purple "
                      : " hover:text-main-purple  Board   AddLightGrey  "
                  }  ${activeItem === board.id ? "BoardA text-white" : " "}   `}
                  key={i}
                  onClick={() => handleClick(board)}
                >
                  <BoardIcon
                    className={`  w-[16px] h-[16px] ${
                      activeItem === board.id ? "BoardIcon " : " Board"
                    }`}
                  />

                  <span className="text-center heading-M">{board?.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="flex items-center gap-5 cursor-pointer  h-[48px] px-[30px] cureateBoard rounded-r-full  AddLightGrey "
            onClick={handleOpenDialog}
          >
            <BoardIcon
              className={`  w-[16px] h-[16px] ${" board"} cureateBoard`}
            />

            <span className="text-center heading-M cureateBoard">
              {" "}
              + Create New Board
            </span>
          </div>
        </div>
        <footer
          className={`absolute flex flex-col bottom-[32px] left-0 w-full `}
        >
          <div
            className={`flex gap-7      w-[251px] h-[48px] footer ${
              isDarkMode ? " bg-very-dark-grey-dark-bg" : " LightGrey  "
            } `}
          >
            <img src={Lighttheme} alt="" className="w-[18.33px] h-[18.33px] " />

            <ThemeToggle isChecked={isDarkMode} onToggle={toggleTheme} />

            <img src={Darktheme} alt="" className="w-[15px] h-[15px] " />
          </div>
          <div
            className={`flex  gap-4  mt-2 ml-0 w-[276px]  rounded-r-full px-[31px] cursor-pointer   h-[48px] align-middle items-center ${
              isDarkMode ? "  " : "hidehover"
            }`}
            onClick={handleToggleSidebar}
          >
            <HideSidebar />

            <span className="heading-M text-medium-grey  ">Hide Sidebar </span>
          </div>
        </footer>
      </div>
      <CreateNewBoard
        open={openDialog}
        onClose={handleCloseDialog}
        // onAdd={handleAddRow}
        isDarkMode={isDarkMode}
        board={boards}
      />
    </div>
  );
}
export default Sidebar;
