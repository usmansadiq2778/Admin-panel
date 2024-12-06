/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import DeleteBoard from "./DeleteBoard";

function getStatusColorClass(index) {
  switch (index) {
    case 0:
      return "bg-main-purple"; // Change to your desired color class for index 0
    case 1:
      return "Todobg"; // Change to your desired color class for index 1
    case 2:
      return "bgdone"; // Change to your desired color class for index 2
    default:
      return "";
  }
}

function Columns() {
  const {
    boards,
    currentBoard,
    isSidebarOpen,
    activeItem,
    isDarkMode,
    loading,
  } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const [openTaskDialog, setOpenTasDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const ulKey = uuidv4();
  const handleOpenTaskBoard = (task) => {
    setOpenTasDialog(true);
    setSelectedTask(task);
    console.log('Selected task:', task);
   
  };
  const handleCloseTaskDialog = () => {
    setOpenTasDialog(false);
  };
  return (
    <div className="flex px-[20px]">
      {currentBoard?.columns?.map((column, index) => (
        <div
          key={index}
          className="flex flex-col mx-[10px] w-[280px] my-[30px]  "
        >
          <div className="flex text-center items-center gap-2 ">
            <h6
              className={`rounded-full w-[15px] h-[15px]  ${getStatusColorClass(
                index
              )} `}
            ></h6>
            <h1 className="heading-S uppercase   text-medium-grey    ">
              {column.name} ({column.tasks.length})
            </h1>
          </div>
          <div
            className="Task  w-[280px]   gap-3  "
           
          >
            <ul className="flex flex-col mt-[20px]   ">
              {column?.tasks?.map((task, taskIndex) => (
                <>
                  <li
                    // key={taskIndex}
                    key={uuidv4()}
                    className={`list-none flex-col items-center hover:text-main-purple cursor-pointer ${
                      isDarkMode ? "bg-dark-grey" : "bg-white"
                    }  mt-[20px]   w-[280px] px-[16px] py-[22px] rounded-lg  `}
                    onClick={() =>handleOpenTaskBoard(task)} ///////////////////////// ya new changing ha
                  >
                    <h3 className="heading-M ">{task.title}</h3>
                    <p className="Body-M text-medium-grey mt-1 ">
                      {
                        task.subtasks.filter((subtask) => subtask.isCompleted)
                          .length
                      }{" "}
                      of {task.subtasks.length} subtasks
                    </p>
                  </li>
                </>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <div
        className={` flex  justify-center items-center text-center ${
          isDarkMode ? "bg-dark-grey " : "bg-white"
        } rounded-lg ml-3 mt-[85px] min-h-[500px]  mr-3 pr-4   `}
      >
        <button className="w-[280px] heading-L  text-medium-grey  ">
          + New Column{" "}
        </button>
      </div>
      <DeleteBoard
      title={'Task'}
        open={openTaskDialog}
        // curretTAsk={currentTAsk}
        scroll={"paper"}
        onClose={handleCloseTaskDialog}
        isDarkMode={isDarkMode}
        board={boards}
      />
    </div>
  );
}

export default Columns;
