import SubHeading from "./SubHeading";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export function Option({ text, name, filters, setFilters }) {
  const currentFilter = filters.quickSort;

  const handleClick = () => {
    setFilters((prevValues) => {
      // Remove filter if it's already selected when clicked
      if (currentFilter === name) {
        return { ...prevValues, startDate: "", endDate: "", quickSort: "" };
      }
      return { ...prevValues, startDate: "", endDate: "", quickSort: name };
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`${
        name === currentFilter ? "bg-picked" : "bg-darkPrimary"
      } py-2 px-4 rounded-sm relative text-neutral`}
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

export default function QuickPick({ filters, setFilters }) {
  const options = [
    { name: "month", text: "Son 1 Ay" },
    { name: "week", text: "Son 1 Hafta" },
    { name: "day", text: "Bugün" },
  ];

  return (
    <div>
      <SubHeading text="Hızlı Seçim" />
      <div className="flex justify-between flex-col gap-3">
        {options.map((option) => {
          return (
            <Option
              key={uuidv4()}
              filters={filters}
              setFilters={setFilters}
              name={option.name}
              text={option.text}
            />
          );
        })}
      </div>
    </div>
  );
}
