import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slice/boardSlices";

const store = configureStore({
  reducer: {
    board: boardReducer,
  },
});

export default store;
