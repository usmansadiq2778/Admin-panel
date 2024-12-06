/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";

import IconCross from "./.././assets/icon-cross.svg?react";
import { Button, Dialog, IconButton, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateBoard } from "../store/slice/boardSlices";

export default function EditBoard({ onClose, open }) {
  const [isMobileView, setIsMobileView] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);

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

    isDarkMode,
  } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    columns: [
      { id: 1, name: "Todo", tasks: [] },
      { id: 2, name: "Doing", tasks: [] },
    ],
  });
  useEffect(() => {
    if (currentBoard) {
      setFormData({
        name: currentBoard?.name || "",
        columns: currentBoard?.columns || [],
      });
    }
  }, [currentBoard]);
  const getNextBoardId = () => {
    if (boards.length === 0) {
      return 1;
    } else {
      return Math.max(...boards.map((board) => board.id)) + 1;
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAddColumn = (e, index) => {
    const newBoardId = getNextBoardId();

    const newColumn = { id: newBoardId, name: "", tasks: [] };
    const updatedColumns = [...formData.columns, newColumn];

    setFormData((prevState) => ({
      ...prevState,
      columns: updatedColumns,
    }));
  };

  const handleDeleteColumn = (index) => {
    const updatedColumns = formData.columns.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      columns: updatedColumns,
    }));
  };
  const handleColumnChange = (e, index) => {
    const { value, name } = e.target;

    const updatedColumns = [...formData.columns];
    updatedColumns[index] = { ...updatedColumns[index], name: value };

    setFormData((prevState) => ({
      ...prevState,
      columns: updatedColumns,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage("Can't be empty");
      inputRef.current.focus();
      return;
    }

    dispatch(updateBoard({ ...currentBoard, ...formData }));

    setErrorMessage("");
    setFormData({
      name: "",
      columns: [
        { id: 1, name: "Todo", tasks: [] },
        { id: 2, name: "Doing", tasks: [] },
      ],
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={`setwidthdialog    flex items-center justify-center`}
      PaperProps={{
        sx: {
          borderRadius: "5px",
          width: `${isMobileView ? "340px" : "480px"}`,
          background: isDarkMode ? "  #2b2c37   " : "white",
          minHeight: "500px",
        },
      }}
    >
      <div
        className={` p-[20px]  mt-4   ${
          isMobileView ? " w-[340px] " : "w-[480px]"
        }
        ${isMobileView ? "overflow-x-auto" : "overflow-auto"} ${
          isDarkMode
            ? " Addtaskdark   text-white   "
            : " bg-white   text-black   "
        } `}
        // tabIndex="0"
      >
        <h1 className="heading-L  mb-[28px]  font-bold">Edit Board</h1>
        <div
          className={` ${
            isMobileView ? "overflow-x-auto" : "overflow-auto"
          } max-h-[250px]  `}
          tabIndex={"0"}
        >
          <div className="mb-6">
            <label
              className={`block  Body-M ${
                isDarkMode ? " text-white" : "text-medium-grey "
              }      mb-2 `}
              htmlFor="name"
            >
              Board Name
            </label>
            <input
              className={`shadow appearance-none border focus:border-main-purple  rounded w-full py-2 px-3 inputLine  leading-tight Body-L focus:outline-none ${
                isDarkMode ? "bg-dark-grey  " : ""
              }    focus:shadow-outline  ${
                errorMessage
                  ? "focus:border-red-500"
                  : "focus:border-main-purple"
              }`}
              id="name"
              name="name"
              type="text"
              placeholder="e.g Web Design"
              value={formData?.name}
              onChange={handleChange}
              ref={inputRef}
            />
            {errorMessage && (
              <span className="text-red-500 float-right Body-L absolute right-10 pt-2">
                {errorMessage}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label
              className={`block  Body-M ${
                isDarkMode ? " text-white" : "text-medium-grey "
              }      mb-2 `}
              htmlFor="columns"
            >
              Board Columns
            </label>
            <div
              className={`${
                isMobileView ? "overflow-x-auto" : "overflow-auto"
              } `}
            >
              {formData?.columns?.map((column, index) => (
                <div
                  key={index}
                  className="flex items-center mb-2 justify-between gap-3"
                >
                  <input
                    className={`shadow appearance-none border flex flex-grow    rounded py-2 px-3 inputLine leading-tight body-L focus:outline-none
         ${isDarkMode ? "bg-dark-grey  " : ""} focus:shadow-outline `}
                    id={`column-${index}`}
                    type="text"
                    name="columns"
                    placeholder="Column"
                    value={column?.name} // Accessing the name property of the column object
                    onChange={(e) => handleColumnChange(e, index)}
                  />
                  <button onClick={() => handleDeleteColumn(index)}>
                    <IconCross className=" h-[14.88px] w-[14.88px] iconcross  cursor-pointer" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleAddColumn}
          className="rounded-full Addnewcolumn  w-full bg- h-[40px] mt-[25px] items-center Body-L text-main-purple  "
        >
          + Add New Column
        </button>
        <button
          onClick={handleSubmit}
          className="rounded-full  w-full bg-main-purple h-[40px] mt-[25px] items-center Body-L text-white AddbtnHover "
        >
          Save Changes
        </button>
      </div>
    </Dialog>
  );
}
