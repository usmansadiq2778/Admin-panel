/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";

import IconCross from "./../assets/icon-cross.svg?react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentBoard } from "../store/slice/boardSlices";

export default function AddNewTask({ onClose, open }) {
  const {
    boards,
    currentBoard,

    isDarkMode,
  } = useSelector((state) => state.board);
  const [isMobileView, setIsMobileView] = useState(false);
  const descriptionElementRef = useRef(null);
  const handleResize = () => {
    setIsMobileView(window.innerWidth < 640); // Adjust this threshold as needed
  };

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState({
    name: "",
    description: "",
    columns: ["", ""],
    status: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    columns: ["", ""],
    status: "Todo",
  });
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const inputRef = {
    name: useRef(null),
    description: useRef(null),
    columns: [useRef(null), useRef(null)],
    status: useRef(null),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAddColumn = (e) => {
    e.preventDefault();
    const updatedColumns = [...formData.columns, ""];
    setFormData({ ...formData, columns: updatedColumns });
  };

  const handleDeleteColumn = (index) => {
    const updatedColumns = formData.columns.filter((_, i) => i !== index);
    setFormData({ ...formData, columns: updatedColumns });
  };
  const handleColumnChange = (e, index) => {
    const { value, name } = e.target;

    const updatedColumns = [...formData.columns];
    updatedColumns[index] = value;
    setFormData({ ...formData, columns: updatedColumns });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      columns: ["", ""],
      status: "Todo",
    });
  };

  const validateForm = () => {
    let valid = true;
    let firstEmptyFieldRef = null;

    const errors = {
      name: "",
      description: "",
      columns: ["", ""],
      status: "",
    };
    if (!formData.name || formData.name.trim() === "") {
      errors.name = "Can't be empty";
      valid = false;
      firstEmptyFieldRef = inputRef.name;
    }

    if (!formData.description || formData.description.trim() === "") {
      errors.description = "Can't be empty";
      valid = false;
      if (!firstEmptyFieldRef) {
        firstEmptyFieldRef = inputRef.description;
      }
    }

    formData.columns.forEach((column, index) => {
      if (column.trim() === "") {
        errors.columns[index] = "Can't be empty";
        valid = false;
        if (!firstEmptyFieldRef && inputRef.columns[index]) {
          firstEmptyFieldRef = inputRef.columns[index];
        }
      }
    });

    if (!formData.status || formData.status.trim() === "") {
      errors.status = "Can't be empty";
      valid = false;
      if (!firstEmptyFieldRef) {
        firstEmptyFieldRef = inputRef.status;
      }
    }

    setFormErrors(errors);
    if (firstEmptyFieldRef && firstEmptyFieldRef.current) {
      firstEmptyFieldRef.current.focus();
    }

    return valid;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newTask = {
      title: formData.name,
      description: formData.description,
      subtasks: formData.columns.map((column) => ({
        title: column,
        isCompleted: false,
      })),
      status: formData.status,
    };

    const columnIndex = currentBoard?.columns?.findIndex(
      (column) => column.name === formData.status
    );

    if (columnIndex !== -1) {
      // If the column is found
      const updatedColumns = [...currentBoard.columns];
      updatedColumns[columnIndex] = {
        ...updatedColumns[columnIndex],
        tasks: [...updatedColumns[columnIndex].tasks, newTask],
      };

      dispatch(
        setCurrentBoard({
          ...currentBoard,
          columns: updatedColumns,
        })
      );
    } else {
      console.error("Column not found.");
    }

    onClose(); // Close the dialog
    resetForm();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={`setwidthdialog    flex items-center justify-center`}
      PaperProps={{
        sx: {
          borderRadius: "5px",
          width: `${isMobileView ? "340px" : "480px"}`,
          height: "100vh",
          minHeight: "566px",
          background: isDarkMode ? "  #2b2c37   " : "white",
          // padding: "20px",
        },
      }}
    >
      {/* <h1 className="heading-L  my-[30px] font-bold">Add New Task </h1> */}
      <DialogTitle
        id="scroll-dialog-title"
        sx={{
          fontWeight: "bold ",
          fontFamily: "Plus Jakarta Sans  ",
          fontSize: "18px",
          marginTop: "10px",
          color: isDarkMode ? "white" : "black",
        }}
      >
        Add New Task
      </DialogTitle>
      <DialogContent dividers={scroll === "paper"} sx={{ border: "none" }}>
        <div
          className="dialog-content-container"
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <div className="mb-4 mt-2">
            <label
              className={` block  Body-M    ${
                isDarkMode ? "text-white" : "text-medium-grey "
              }    mb-2`}
              htmlFor="name"
            >
              Title
            </label>
            <input
              className={`focus:ring-main-purple Body-L focus:border-main-purple border-gray-50 border rounded w-full py-2 px-3 inputLine leading-tight focus:outline-none ${
                isDarkMode ? "bg-dark-grey text-white " : ""
              } focus:shadow-outline ${
                formErrors.name ? "focus:border-red-500" : ""
              }`}
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Take coffee break"
              value={formData.name}
              onChange={handleChange}
              ref={inputRef.name}
            />
            {formErrors.name && (
              <span className="text-red-500 float-right Body-L  relative top-[-39px]   right-2 pt-2">
                {formErrors.name}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className={` block mb-2  Body-M ${
                isDarkMode ? "text-white" : "text-medium-grey  "
              } `}
            >
              Discription
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              ref={inputRef.description}
              className={`px-[16px] py-[8px] ${
                isDarkMode ? "bg-dark-grey text-white" : ""
              } py-2 px-3 inputLine leading-tight Body-L focus:outline-none block w-full rounded-lg border shadow focus:ring-main-purple focus:border-main-purple   ${
                formErrors.description ? "focus:border-red-500" : ""
              }`}
              placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
              value={formData.description}
              onChange={handleChange}
            />
            {formErrors.description && (
              <span className="text-red-500 float-right  relative top-[-39px]   right-2 pt-2 Body-L ">
                {formErrors.description}
              </span>
            )}
          </div>

          <div className="mb-2">
            <label
              className={` block mb-2  Body-M ${
                isDarkMode ? "text-white" : " text-medium-grey"
              } `}
              htmlFor="columns"
            >
              Subtasks
            </label>
            {formData?.columns?.map((column, index) => (
              <div
                key={index}
                className="relative flex items-center mb-2 justify-between gap-3"
              >
                <input
                  className={`shadow relative border focus:ring-main-purple w-full  focus:border-main-purple flex flex-grow  rounded py-2 px-3 inputLine leading-tight Body-L focus:outline-none
               ${
                 isDarkMode ? "bg-dark-grey text-white  " : ""
               } focus:shadow-outline  ${
                    formErrors.columns
                      ? "focus:border-red-500"
                      : "focus:border-main-purple"
                  }`}
                  id={`column-${index}`}
                  type="text"
                  name="columns"
                  placeholder={
                    column.trim() === ""
                      ? index === 0
                        ? "e.g. Make coffee"
                        : "e.g. Drink coffee & smile"
                      : ""
                  }
                  value={column}
                  onChange={(e) => handleColumnChange(e, index)}
                />
                {formErrors.columns[index] && (
                  <span className="absolute top-0 right-6 flex items-center pr-3 h-full text-red-500 font-medium Body-L">
                    {formErrors.columns[index]}
                  </span>
                )}

                <button onClick={() => handleDeleteColumn(index)}>
                  <IconCross className=" h-[14.88px] w-[14.88px] iconcross  cursor-pointer" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
      <DialogActions className="flex flex-col mx-[16px] items-center justify-center text-center ">
        <button
          onClick={handleAddColumn}
          className={` rounded-full w-full  h-[40px] items-center Body-L  mb-2 ${
            isDarkMode ? "bg-white hover:bg-gray-200       " : "Addnewcolumn"
          }      text-main-purple `}
        >
          + Add New Subtask
        </button>
      </DialogActions>
      <div className="mx-6">
        <label
          htmlFor="status"
          className={` block mb-2  Body-M ${
            isDarkMode ? "text-white" : "text-medium-grey  "
          } `}
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          className={`border rounded-lg block w-full  p-2.5 focus:ring-main-purple focus:border-main-purple inputLine leading-tight focus:outline-none ${
            isDarkMode ? "bg-dark-grey text-white" : ""
          }`}
          value={formData.status}
          onChange={handleChange}
          ref={inputRef.status}
        >
          {currentBoard?.columns?.map((column, index) => (
            <option key={index} className="Body-L " value={column.name}>
              {column.name}
            </option>
          ))}
        </select>
      </div>
      <DialogActions className="flex flex-col mx-[16px] items-center justify-center text-center ">
        <button
          onClick={handleAdd}
          className={`rounded-full w-full h-[40px] mt-[20px] items-center Body-L Sae AddbtnHover text-center mb-3 bg-main-purple text-white  `}
        >
          Create Task
        </button>
      </DialogActions>
    </Dialog>
  );
}
