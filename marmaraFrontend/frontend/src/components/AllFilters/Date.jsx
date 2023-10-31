import { useSearchParams } from "react-router-dom";
import SubHeading from "./SubHeading";

function DatePicker({ id }) {
  const [searchParams, setSearchParams] = useSearchParams({
    from: "",
    to: "",
  });

  return (
    <input
      onClick={(e) => {
        setSearchParams((prevValue) => {
          prevValue.set(id, e.target.value);
          return prevValue;
        });
      }}
      id={id}
      type="date"
      className="outline-0 border border-darkPrimary dark:border-0 dark:bg-darkPrimary py-2 px-1 rounded-sm "
    />
  );
}

function DatePickerContainer({ text, id }) {
  return (
    <div>
      <DatePicker id={id} />
      <label htmlFor={id} className="text-sm  dark:text-neutral">
        {text}
      </label>
    </div>
  );
}

// Bu şuanda çalışmıyor.
export default function Date() {
  return (
    <div>
      <SubHeading text="Tarih" />
      <div className="flex justify-between ">
        <DatePickerContainer id="from" text="Başlangıç" />
        <DatePickerContainer id="to" text="Bitiş" />
      </div>
    </div>
  );
}
