import { useSearchParams } from "react-router-dom";
import SubHeading from "./SubHeading";
import Image from "../Utilities/Image";
import { useRef, useState } from "react";

function DatePicker({ id, filters, setFilters }) {
  const ref = useRef(0);

  const currentDate = id === "from" ? filters.startDate : filters.endDate;

  const onDatePicked = () => {
    const pickedDate = ref.current.value;
    setFilters((prevValues) => {
      return id === "from"
        ? { ...prevValues, quickSort: "", startDate: pickedDate }
        : { ...prevValues, quickSort: "", endDate: pickedDate };
    });
  };

  return (
    <div
      onClick={() => {
        ref.current.showPicker();
      }}
    >
      <div
        className="flex bg-darkPrimary w-full
       py-2 pr-5 items-center gap-2 rounded-sm"
      >
        <Image
          className="ml-2 mr-1 w-5 h-5"
          imageName={"calendarDark.png"}
          darkImageName={"calendarDark.png"}
          alt="Tarih"
        />
        <input
          type="text"
          value={currentDate || ""}
          placeholder={id === "from" ? "Başlangıç" : "Bitiş"}
          readOnly
          className="outline-0 w-full bg-darkPrimary text-neutral cursor-pointer"
        />
      </div>
      <input
        type="date"
        ref={ref}
        onChange={onDatePicked}
        className="w-0 h-0 absolute opacity-0"
      />
    </div>
  );
}

export default function Date({ filters, setFilters }) {
  return (
    <div>
      <SubHeading text="Tarih" />
      <div className="flex justify-between flex-col gap-3 ">
        <DatePicker id="from" filters={filters} setFilters={setFilters} />
        <DatePicker id="to" filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
}
