/* eslint-disable no-unused-vars */
// boardSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    boards: [],
    latestBoardId: 0,
    currentBoard: null,
    isSidebarOpen: true,
    isDarkMode: true,
    loading: true,
    activeItem: 0,
  },
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload;
    },
    setactive: (state, action) => {
      state.activeItem = action.payload;
    },
    setCurrentBoard: (state, action) => {
      state.currentBoard = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addBoard: (state, action) => {
      const newBoard = {
        id: state.latestBoardId + 1, // Use the latest board ID + 1 as the new board ID
        ...action.payload,
      };
      state.latestBoardId++;

      state.boards.push(newBoard);
    },
    deleteBoard(state, action) {
      const deletedBoardId = action.payload;
      state.boards = state.boards?.filter(
        (board) => board.id !== deletedBoardId
      );

      if (state.currentBoard?.id === deletedBoardId) {
        if (state.boards.length > 0) {
          // Check if there are any remaining boards
          const nextBoard = state.boards[0]; // Get the first board as the next board
          state.currentBoard = nextBoard;
          state.activeItem = nextBoard.id;
        } else {
          state.currentBoard = null; // Set current board to null if no boards remain
          state.activeItem = null; // Set active item to null as well
        }
      }
    },
    updateBoard: (state, action) => {
      const updatedBoard = action.payload;
      state.boards = state.boards.map((board) =>
        board.id === updatedBoard.id ? updatedBoard : board
      );
      state.currentBoard = updatedBoard;
    },
  },
});

export const {
  setBoards,
  setCurrentBoard,
  toggleSidebar,
  toggleDarkMode,
  setLoading,
  setactive,
  deleteBoard,
  updateBoard,
  addBoard,
} = boardSlice.actions;

export default boardSlice.reducer;
