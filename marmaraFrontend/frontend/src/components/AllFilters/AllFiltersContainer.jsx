import Date from "./Date";
import Sort from "./Sort";
import QuickPick from "./QuickPick";
import Button from "../Utilities/Button";
import { useSearchParams } from "react-router-dom";

function CloseButton({ setIsActive }) {
  const handleClick = () => {
    setIsActive(false);
  };

  return (
    <button
      onClick={handleClick}
      className="justify-self-end  before:block before:w-7 before:h-1 before:rounded-md before:bg-black dark:before:bg-neutral
after:my-1 after:block after:w-7 after:h-1 after:rounded-md after:bg-black dark:after:bg-neutral
before:rotate-45 after:-rotate-45 before:translate-y-2 "
    />
  );
}

function Container({ isActive, children }) {
  return (
    <div
      className={`${
        isActive ? "grid-rows-[1fr] border my-4 " : " grid-rows-[0fr]"
      }  
       rounded-sm  mx-3 grid  sm:w-fit transition-all dark:border-darkPrimary relative`}
    >
      {children}
    </div>
  );
}

function Apply({ setIsActive }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort");
  const quickSort = searchParams.get("quickSort");
  const date = { from: searchParams.get("from"), to: searchParams.get("to") };
  // burada date de olacak

  const handleClick = () => {
    setSearchParams((prevValue) => {
      if (!!quickSort || !!sort || !!date) {
        prevValue.set("isApply", "1");
      } else {
        prevValue.set("isApply", "");
      }
      return prevValue;
    });
    setIsActive(false);
  };

  return (
    <div className="w-full flex justify-center mt-16">
      <Button onClickFunction={handleClick} text="Uygula" />
    </div>
  );
}

export default function AllFiltersContainer({ isActive, setIsActive }) {
  return (
    <>
      {/* <div className="w-full h-full fixed z-[999999] bottom-0 opacity-25 bg-black"></div> */}
      <Container isActive={isActive}>
        <div className="overflow-hidden">
          <div className="absolute sm:-top-2 -top-1 -right-1 sm:-right-2">
            {isActive && <CloseButton setIsActive={setIsActive} />}
          </div>
          <div
            className="px-8 py-4  flex flex-col sm:flex-row   
           gap-8 sm:gap-24"
          >
            <QuickPick />
            <Sort />
            <Date />
          </div>
        </div>
      </Container>
    </>
  );
}
