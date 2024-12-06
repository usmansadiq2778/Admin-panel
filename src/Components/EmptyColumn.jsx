/* eslint-disable no-unused-vars */
import React from "react";

export default function EmptyColumn() {
  return (
    <div className="flex justify-center items-center text-center w-full h-screen flex-col p-3">
      <div className=" heading-L text-medium-grey  ">
        This board is empty. Create a new column to get started.
      </div>
      <button className="heading-M w-[174px]  h-[48px] mt-[32px] flex justify-center items-center text-center bg-lines-dark rounded-full cursor-pointer  ">
        {" "}
        + Add New Column{" "}
      </button>
    </div>
  );
}
