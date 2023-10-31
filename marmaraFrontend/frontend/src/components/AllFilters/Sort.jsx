import { useSearchParams } from "react-router-dom";
import SubHeading from "./SubHeading";
import { v4 as uuidv4 } from "uuid";

function Button({ text, name, searchParams, setSearchParams }) {
  const handleClick = () => {
    setSearchParams((prevValue) => {
      prevValue.set("sort", name);
      return prevValue;
    });
  };

  const param = searchParams.get("sort");

  return (
    <button
      onClick={handleClick}
      className={`${
        name === param ? "bg-picked" : "bg-darkPrimary"
      } text-neutral py-2 px-5 rounded-sm relative `}
    >
      {text}
      {name === param && (
        <img
          className="w-5 h-5 absolute -top-2 -right-2"
          src="/images/picked.png"
        />
      )}
    </button>
  );
}
//
export default function Sort() {
  const [searchParams, setSearchParams] = useSearchParams({
    sort: "",
  });

  const options = [
    { name: "newsFirst", text: "Yeniden Eskiye" },
    { name: "oldsFirst", text: "Eskiden Yeniye" },
  ];

  return (
    <div>
      <SubHeading text="Sıralama" />
      <div className="flex justify-between">
        {options.map((option) => {
          return (
            <Button
              key={uuidv4()}
              name={option.name}
              text={option.text}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          );
        })}
      </div>
    </div>
  );
}
