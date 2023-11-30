import { useSearchParams } from "react-router-dom";
import SubHeading from "./SubHeading";
import Image from "../Utilities/Image";
import { useRef, useState } from "react";

function DatePicker({ id }) {
  const [searchParams, setSearchParams] = useSearchParams({
    from: "",
    to: "",
  });

  const ref = useRef(0);

  const [value, setValue] = useState(null);

  const onDatePicked = () => {
    setValue(ref.current.value);
    setSearchParams((prevValue) => {
      id === "from"
        ? prevValue.set("from", ref.current.value)
        : prevValue.set("to", ref.current.value);
      prevValue.set("isApply", "");
      return prevValue;
    });
  };

  return (
    <div
      onClick={() => {
        ref.current.showPicker();
      }}
      className=""
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
          value={value || ""}
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

export default function Date() {
  return (
    <div>
      <SubHeading text="Tarih" />
      <div className="flex justify-between flex-col gap-3 ">
        <DatePicker id="from" />
        <DatePicker id="to" />
      </div>
    </div>
  );
}
