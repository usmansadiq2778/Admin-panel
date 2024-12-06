/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoLight from "./../assets/logo-light.svg";
import LogoDark from "./../assets/logo-dark.svg";
import Ellips from "./../assets/icon-vertical-ellipsis.svg";
import ChevrownDown from "./../assets/icon-chevron-down.svg";
import ChvrownUp from "./../assets/icon-chevron-up.svg";
import Logomobile from "./../assets/logo-mobile.svg";
import Sidebar from "./Sidebar/Sidebar";
import Lighttheme from "./.././assets/icon-light-theme.svg";
import Darktheme from "./.././assets/icon-dark-theme.svg";

import {
  setCurrentBoard,
  setactive,
  toggleDarkMode,
  toggleSidebar,
  deleteBoard,
} from "../store/slice/boardSlices";

import BoardIcon from "./../assets/icon-board.svg?react";
import CreateNewBoard from "./Sidebar/CreateNewBoard";
import AddNewTask from "./AddNewTask";
import DeleteBoard from "./DeleteBoard";
import ThemeToggle from "./ThemeToggle";
import EditBoard from "./EditBoard";
function Navbar() {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEllipsisDropdownOpen, setIsEllipsisDropdownOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [openDeleteBoardDialog, setOpenDeleteBoardDialog] = useState(false);
  const [openEditeBoardDialog, setOpenEditBoardDialog] = useState(false);
  const [scroll, setScroll] = useState("paper");

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

  const {
    boards,
    currentBoard,
    isSidebarOpen,
    activeItem,
    isDarkMode,
    loading,
  } = useSelector((state) => state.board);
  const dropdownRef = useRef(null);
  const ellipsisRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleEllipsisDropdown = (event) => {
    setIsEllipsisDropdownOpen(!isEllipsisDropdownOpen);
  };

  const handleOpenDialog = (scrollType) => {
    setOpenDialog(true);
    setScroll(scrollType);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDeleteBoardDialog = () => {
    setOpenDeleteBoardDialog(true);
    setIsEllipsisDropdownOpen(false);
  };
  const handleOpenTaskBoard = () => {
    setOpenTaskDialog(true);
  };
  const handleCloseTaskDialog = () => {
    setOpenTaskDialog(false);
  };

  const handleOpenEditBoardDialog = (event) => {
    event.stopPropagation();
    setOpenEditBoardDialog(true);
    setIsEllipsisDropdownOpen(false);
  };

  const handleCloseDeleteBoardDialog = () => {
    setOpenDeleteBoardDialog(false);
  };
  const handleCloseEditBoardDialog = () => {
    setOpenEditBoardDialog(false);
  };
  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };
  const handleDeleteBoard = () => {
    dispatch(deleteBoard(currentBoard.id));
    setOpenDeleteBoardDialog(false);
  };
  const handleClick = (board) => {
    dispatch(setactive(board.id));
    dispatch(setCurrentBoard(board));
  };

  return (
    <div
      className={`flex  relative  items-center  ${
        isMobileView ? "h-[64px]" : "h-[97px] "
      } w-full`}
    >
      {isMobileView ? (
        <div className="relative  pl-[16px] pr-0 mr-0 ">
          <img className="w-[24px]  h-[25.22px]" alt="" src={Logomobile} />
        </div>
      ) : (
        <div className="relative flex sm:flex   text-center items-center pl-[34px]  w-[300px]">
          <img
            className=" w-[152.53px] h-[25.22px]"
            alt=""
            src={`${isDarkMode ? LogoLight : LogoDark}  `}
          />
        </div>
      )}

      <div
        className={` relative nav  h-[97px] flex-grow   p-[24px] text-center items-center flex justify-between `}
      >
        <div
          onClick={toggleDropdown}
          ref={dropdownRef}
          className={`heading-L flex text-center items-center ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          {isMobileView ? (
            <>
              <div className="dropdown">
                <button
                  onClick={toggleDropdown}
                  className="dropdown-toggle flex items-center text-center"
                >
                  {currentBoard?.name}
                  <img
                    className="w-3 h-2 ml-3"
                    src={isDropdownOpen ? ChvrownUp : ChevrownDown}
                    alt=""
                  />
                </button>

                {isDropdownOpen && (
                  <div
                    className={` absolute flex flex-col left-0 z-20   py-[20px]  mt-[35px]  w-[90%] ${
                      isDarkMode ? "bg-dark-grey" : " bg-white    "
                    } rounded-lg shadow-md  `}
                  >
                    <h2 className="heading-custom-color flex mx-[32px] heading-S my-0 ">{` ALL BOARDS ( ${boards?.length} )`}</h2>

                    <ul className="flex flex-col mt-[20px]">
                      {boards.map((board, i) => (
                        <li
                          className={` w-[90%] flex items-center gap-5 cursor-pointer  ${
                            isDarkMode
                              ? "Board  AddLightGrey  hover:text-main-purple "
                              : " hover:text-main-purple  Board   AddLightGrey  "
                          }  ${
                            activeItem === board.id ? "BoardA text-white" : " "
                          }  rounded-r-full h-[48px] px-[30px]   `}
                          key={i}
                          onClick={() => handleClick(board)}
                        >
                          <BoardIcon
                            className={`  w-[16px] h-[16px] ${
                              activeItem === board.id ? "BoardIcon " : " Board"
                            }`}
                          />

                          <span className="text-center heading-M">
                            {board.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div
                      className="flex items-center gap-5 cursor-pointer  w-[276px]  h-[48px] px-[30px] cureateBoard rounded-r-full  AddLightGrey "
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
                    <div
                      className={`flex gap-7      w-[80%] h-[48px] footer ${
                        isDarkMode
                          ? " bg-very-dark-grey-dark-bg"
                          : " LightGrey  "
                      } `}
                    >
                      <img
                        src={Lighttheme}
                        alt=""
                        className="w-[18.33px] h-[18.33px] "
                      />

                      <ThemeToggle
                        isChecked={isDarkMode}
                        onToggle={toggleTheme}
                      />

                      <img
                        src={Darktheme}
                        alt=""
                        className="w-[15px] h-[15px] "
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            `${currentBoard?.name} `
          )}
        </div>
        <div className="flex gap-5 items-center text-center">
          {isMobileView ? (
            <>
              <button
                onClick={handleOpenTaskBoard}
                className="bg-main-purple   AddbtnHover w-[48px] h-[34px]     text-white heading-M text-center items-center pb-1    rounded-full  "
              >
                +
              </button>
              <img
                ref={ellipsisRef}
                className=" w-[3.69px] h-[16px]"
                src={Ellips}
                alt=""
                onClick={toggleEllipsisDropdown}
              />
              {isEllipsisDropdownOpen && (
                <div
                  className={` absolute  flex text-left rounded-lg  right-5 p-[16px] top-[100px] ${
                    isDarkMode
                      ? "bg-lines-dark text-white "
                      : "bg-white text-medium-grey"
                  }   w-[192px]  shadow-md `}
                >
                  <ul>
                    <li
                      onClick={(e) => handleOpenEditBoardDialog(e)}
                      className={`Body-L cursor-pointer  mb-[23px] ${
                        isDarkMode ? " text-white " : " text-medium-grey"
                      }  `}
                    >
                      Edit Board
                    </li>
                    <li
                      onClick={handleOpenDeleteBoardDialog}
                      className="Body-L text-red-700  cursor-pointer "
                    >
                      Delete Board
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <div
                className="bg-main-purple  cursor-pointer flex justify-center   AddbtnHover w-[164px] h-[48px]     text-white heading-M text-center items-center    rounded-full  "
                onClick={handleOpenTaskBoard}
              >
                + Add New Task
              </div>

              <img
                className=" w-[4.62px] h-[20px] cursor-pointer"
                src={Ellips}
                alt=""
                // onClick={handleOpenDeleteBoardDialog}
                onClick={toggleEllipsisDropdown}
              />
              {isEllipsisDropdownOpen && (
                <div
                  className={` absolute  flex text-left rounded-lg  right-5 p-[16px] top-[100px] ${
                    isDarkMode
                      ? "bg-lines-dark text-white "
                      : "bg-white text-medium-grey"
                  }   w-[192px]  shadow-md `}
                >
                  <ul>
                    <li
                      onClick={(e) => handleOpenEditBoardDialog(e)}
                      className={`Body-L cursor-pointer  mb-[23px] ${
                        isDarkMode ? " text-white " : " text-medium-grey"
                      }  `}
                    >
                      Edit Board
                    </li>
                    <li
                      onClick={handleOpenDeleteBoardDialog}
                      className="Body-L text-red-700  cursor-pointer "
                    >
                      Delete Board
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <CreateNewBoard
        open={openDialog}
        scroll={"paper"}
        onClose={handleCloseDialog}
        isDarkMode={isDarkMode}
        board={boards}
      />
      <AddNewTask
        open={openTaskDialog}
        onClose={handleCloseTaskDialog}
        // onAdd={handleAddRow}
        isDarkMode={isDarkMode}
        board={boards}
      />
      <DeleteBoard
      title={'Board'}
        open={openDeleteBoardDialog}
        onClose={handleCloseDeleteBoardDialog}
        isDarkMode={isDarkMode}
        onDelete={handleDeleteBoard}
      />
      <EditBoard
        open={openEditeBoardDialog}
        onClose={handleCloseEditBoardDialog}
        isDarkMode={isDarkMode}
        currentBoard={currentBoard}
      />
    </div>
  );
}

export default Navbar;
