/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, IconButton, TextField } from "@mui/material";

export default function DeleteBoard({ open, onClose, onDelete,title }) {
  const {
    boards,
    currentBoard,

    isDarkMode,
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
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        className={`setwidthdialog     flex items-center justify-center rounded-xl `}
      >
        <div
          className={` px-[30px] overflow-auto   ${
            isMobileView ? " w-[340px] " : "w-[480px]"
          } ${
            isDarkMode
              ? " Addtaskdark   text-white   "
              : " bg-white   text-black   "
          }`}
        >
          <h1 className="heading-L  my-[32px] font-bold">Delete this {title }?</h1>
          <div className="Body-L text-medium-grey mb-[30px]  ">
            Are you sure you want to delete the {currentBoard?.name} board? This
            action will remove all columns and tasks and cannot be reversed.
          </div>
          <div className="flex flex-wrap justify-between pb-4 ">
            <button
              onClick={onDelete}
              className={` rounded-full ${
                isMobileView ? "w-full" : " w-[200px]"
              }   Delete   h-[40px] mb-6   items-center body-L text-white font-bold  `}
            >
              Delete
            </button>

            <button
              onClick={onClose}
              className={`  ${
                isMobileView ? "w-full" : " w-[200px]"
              }  rounded-full   font-bold    h-[40px] bg-blue-50 hover:bg-slate-300           text-main-purple   items-center body-L `}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
