import Date from "./Date";
import Sort from "./Sort";
import QuickPick from "./QuickPick";
import Button from "../Utilities/Button";
import { useSearchParams } from "react-router-dom";

function CloseButton({ setShowAllFilters }) {
  const handleClick = () => {
    setShowAllFilters(false);
  };

  return (
    <button
      onClick={handleClick}
      className="justify-self-end  before:block 
      before:w-7 before:h-1 before:rounded-md before:bg-black
       dark:before:bg-neutral
after:my-1 after:block after:w-7 after:h-1 after:rounded-md
 after:bg-black dark:after:bg-neutral
before:rotate-45 after:-rotate-45 before:translate-y-2 "
    />
  );
}

function Container({ showAllFilters, children }) {
  return (
    <div
      className={`${
        showAllFilters ? "grid-rows-[1fr] border my-4 " : " grid-rows-[0fr]"
      }  
       rounded-sm  mx-3 grid  sm:w-fit transition-all
        dark:border-darkPrimary bg-neutral dark:bg-transparent border-primary-200 relative`}
    >
      {children}
    </div>
  );
}

function Apply({ setShowAllFilters }) {
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
    setShowAllFilters(false);
  };

  return (
    <div className="w-full flex justify-center mt-16">
      <Button onClickFunction={handleClick} text="Uygula" />
    </div>
  );
}

export default function AllFiltersContainer({
  filters,
  setFilters,
  showAllFilters,
  setShowAllFilters,
}) {
  return (
    <>
      {/* <div className="w-full h-full fixed z-[999999] bottom-0 opacity-25 bg-black"></div> */}
      <Container showAllFilters={showAllFilters}>
        <div className="overflow-hidden">
          <div className="absolute -top-[13px] -right-[14px]">
            {showAllFilters && (
              <CloseButton setShowAllFilters={setShowAllFilters} />
            )}
          </div>
          <div
            className="px-8 py-4  flex flex-col sm:flex-row   
           gap-8 sm:gap-24"
          >
            <QuickPick filters={filters} setFilters={setFilters} />
            <Sort filters={filters} setFilters={setFilters} />
            <Date filters={filters} setFilters={setFilters} />
          </div>
        </div>
      </Container>
    </>
  );
}
