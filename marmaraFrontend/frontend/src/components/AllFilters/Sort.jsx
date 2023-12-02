import { useSearchParams } from "react-router-dom";
import SubHeading from "./SubHeading";
import { v4 as uuidv4 } from "uuid";

function Button({ text, name, filters, setFilters }) {
  const currentFilter = filters.sort;

  const handleClick = () => {
    setFilters((prevValues) => {
      // Remove filter if it's already selected when clicked
      if (currentFilter === name) {
        return { ...prevValues, sort: "" };
      }
      return { ...prevValues, sort: name };
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`${
        name === currentFilter ? "bg-picked" : "bg-darkPrimary"
      } text-neutral py-2 px-5 rounded-sm relative `}
    >
      {text}
      {name === currentFilter && (
        <img
          className="w-5 h-5 absolute -top-2 -right-2"
          src="/images/picked.png"
        />
      )}
    </button>
  );
}
//
export default function Sort({ filters, setFilters }) {
  const options = [
    { name: "desc", text: "Yeniden Eskiye" },
    { name: "asc", text: "Eskiden Yeniye" },
  ];

  return (
    <div>
      <SubHeading text="Sıralama" />
      <div className="flex justify-between flex-col gap-3">
        {options.map((option) => {
          return (
            <Button
              key={uuidv4()}
              name={option.name}
              text={option.text}
              filters={filters}
              setFilters={setFilters}
            />
          );
        })}
      </div>
    </div>
  );
}
