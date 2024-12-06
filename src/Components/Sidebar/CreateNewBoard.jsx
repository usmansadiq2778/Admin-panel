/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import BoardIcon from "./../../assets/icon-board.svg?react";
import IconCross from "./../../assets/icon-cross.svg?react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  makeStyles,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addBoard } from "./../../store/slice/boardSlices";

export default function CreateNewBoard({ onClose, open }) {
  const [isMobileView, setIsMobileView] = useState(false);

  const descriptionElementRef = useRef(null);
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
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const {
    boards,
    currentBoard,
    isSidebarOpen,
    activeItem,
    isDarkMode,
    loading,
  } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    columns: [
      { id: 1, name: "Todo", tasks: [] },
      { id: 2, name: "Doing", tasks: [] },
    ],
  });
  const [formErrors, setFormErrors] = useState({
    name: "",

    columns: ["", ""],
  });
  const getNextBoardId = () => {
    if (boards.length === 0) {
      return 1;
    } else {
      return Math.max(...boards.map((board) => board.id)) + 1;
    }
  };

  const inputRef = {
    name: useRef(null),

    columns: [useRef(null), useRef(null)],
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

    // const updatedColumns = [...formData.columns, ""];

    const updatedColumns = [
      ...formData.columns,
      { id: newBoardId, name: "", tasks: [] },
    ];

    // setFormData({ ...formData, columns: updatedColumns, id: newBoardId });
    setFormData({ ...formData, columns: updatedColumns });
  };

  const handleDeleteColumn = (index) => {
    const updatedColumns = formData.columns.filter((_, i) => i !== index);
    setFormData({ ...formData, columns: updatedColumns });
  };
  const handleColumnChange = (e, index) => {
    const { value, name } = e.target;

    const updatedColumns = [...formData.columns];
    updatedColumns[index] = { ...updatedColumns[index], name: value };

    setFormData({ ...formData, columns: updatedColumns });
  };
  const validateForm = () => {
    let valid = true;
    let firstEmptyFieldRef = null;

    const errors = {
      name: "",
      columns: ["", ""],
    };
    if (!formData.name || formData.name.trim() === "") {
      errors.name = "Can't be empty";
      valid = false;
      firstEmptyFieldRef = inputRef.name;
    }

    formData.columns.forEach((column, index) => {
      if (!column.name || column.name.trim() === "") {
        // Check if column.name exists before calling trim()
        errors.columns[index] = "Can't be empty";
        valid = false;
        if (!firstEmptyFieldRef && inputRef.columns[index]) {
          firstEmptyFieldRef = inputRef.columns[index];
        }
      }
    });

    setFormErrors(errors);
    if (firstEmptyFieldRef && firstEmptyFieldRef.current) {
      firstEmptyFieldRef.current.focus();
    }

    return valid;
  };
  const handleAdd = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // if (!formData.name.trim()) {
    //   setErrorMessage("Can't be empty");
    //   inputRef.current.focus();
    //   return;
    // }

    const newBoardId = getNextBoardId();
    const newBoardData = { ...formData, id: newBoardId };
    dispatch(addBoard(newBoardData));

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
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: "5px",
          width: `${isMobileView ? "340px" : "480px"}`,
          background: isDarkMode ? "  #2b2c37   " : "white",
        },
      }}
    >
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
        Add New Board
      </DialogTitle>
      <DialogContent dividers={scroll === "paper"} sx={{ border: "none" }}>
        <div
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <div className="mb-6 mt-2">
            <label
              className={`block  Body-M ${
                isDarkMode ? "text-white " : "text-medium-grey "
              }       mb-2 " htmlFor="columns"`}
            >
              Name
            </label>
            <input
              className={`shadow appearance-none border focus:border-main-purple  rounded w-full py-2 px-3 inputLine  leading-tight Body-L focus:outline-none ${
                isDarkMode ? "bg-dark-grey  text-white " : " text-black"
              }    focus:shadow-outline  ${
                formErrors.name
                  ? "focus:border-red-500"
                  : "focus:border-main-purple"
              }`}
              id="name"
              name="name"
              type="text"
              placeholder="e.g Web Design"
              value={formData.name}
              onChange={handleChange}
              ref={inputRef.name}
            />
            {formErrors.name && (
              <span className="text-red-500 float-right Body-L font-medium   relative top-[-30px] right-2 ">
                {formErrors.name}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label
              className={`block  Body-M ${
                isDarkMode ? "text-white " : "text-medium-grey "
              }       mb-2 " htmlFor="columns"`}
            >
              Columns
            </label>
            {formData.columns.map((column, index) => (
              <div
                key={index}
                className=" relative flex items-center mb-2 justify-between gap-3  overflow-hidden"
              >
                <input
                  className={`shadow relative appearance-none border capitalize w-full flex flex-grow focus:border-main-purple  rounded py-2 px-3 inputLine leading-tight body-L focus:outline-none
         ${isDarkMode ? "bg-dark-grey  text-white " : " text-black"} ${
                    formErrors.columns[index]
                      ? "focus:border-red-500"
                      : "focus:border-main-purple"
                  } focus:shadow-outline  `}
                  id={`column-${index}`}
                  type="text"
                  name="columns"
                  placeholder="Column"
                  value={column.name} // Accessing the name property of the column object
                  onChange={(e) => handleColumnChange(e, index)}
                  ref={inputRef.columns}
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
          className={` rounded-full w-full  h-[40px] items-center Body-L  ${
            isDarkMode ? "bg-white hover:bg-gray-200       " : "Addnewcolumn"
          }      text-main-purple `}
        >
          + Add New Column
        </button>
        <button
          onClick={handleAdd}
          className={`rounded-full w-full h-[40px] mt-[20px] items-center Body-L Sae AddbtnHover text-center mb-3 bg-main-purple text-white  `}
        >
          Create New Board
        </button>
      </DialogActions>
    </Dialog>
  );
}
