/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBoards,
  setCurrentBoard,
  toggleSidebar,
  toggleDarkMode,
  setLoading,
  addBoard,
} from "./store/slice/boardSlices";
import data from "./data.json";
import Sidebar from "./Components/Sidebar/Sidebar";
import Board from "./Components/Board/Board";
import HideSidebar from "./Components/Sidebar/HideSidebar";
import Navbar from "./Components/Navbar";

function App() {
  const dispatch = useDispatch();
  const { boards, currentBoard, isSidebarOpen, isDarkMode, loading } =
    useSelector((state) => state.board);

  useEffect(() => {
    // Simulating loading data from an API
    const boardsWithIds = data.boards.map((board, index) => ({
      id: index + 1, // Assuming IDs start from 1
      ...board,
    }));
    setTimeout(() => {
      dispatch(setBoards(boardsWithIds));
      dispatch(setCurrentBoard(data.boards[0]));
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  return (
    <div
      className={`App    ${
        isDarkMode ? "bg-dark-grey" : "light"
      } h-screen w-full`}
    >
      <>
        <Navbar />
        <div className="flex ">
          <Sidebar />
          <Board />
        </div>
      </>
      {/* )} */}
    </div>
  );
}

export default App;
