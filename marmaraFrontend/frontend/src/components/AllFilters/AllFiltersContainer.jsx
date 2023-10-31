import Date from "./Date";
import Sort from "./Sort";
import QuickPick from "./QuickPick";
import Button from "../Utilities/Button";
import { useSearchParams } from "react-router-dom";
import disableScroll from "disable-scroll";

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

function Heading() {
  return (
    <h2 className="font-bold dark:text-neutral text-center text-black text-xl whitespace-nowrap">
      Tüm Filtreler
    </h2>
  );
}

function Container({ isActive, children }) {
  return (
    <div
      className={`${
        isActive ? "animate-showFilters" : ""
      } w-full transition-all fixed z-[99999999] bottom-0 dark:bg-darkNeutral bg-neutral rounded-tl-3xl rounded-tr-3xl border dark:border-darkPrimary `}
    >
      {children}
    </div>
  );
}

function Header({ setIsActive }) {
  return (
    <div className="flex flex-col items-center">
      <div className="pt-8 w-full grid grid-cols-3 px-6">
        <div></div>
        <Heading />
        <CloseButton setIsActive={setIsActive} />
      </div>
    </div>
  );
}

function Apply() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort");
  const quickSort = searchParams.get("quickSort");
  // burada date de olacak

  const handleClick = () => {
    console.log(sort, quickSort);
  };

  return (
    <div className="w-full flex justify-center mt-16">
      <Button onClickFunction={handleClick} text="Uygula" />
    </div>
  );
}

export default function AllFiltersContainer({ isActive, setIsActive }) {
  return (
    isActive && (
      <>
        <div className="w-full h-full fixed z-[999999] bottom-0 opacity-25 bg-black"></div>
        <Container isActive={isActive}>
          <Header setIsActive={setIsActive} />
          <div className="px-8 mt-8 sm:w-96 sm:mx-auto flex flex-col gap-8">
            <QuickPick />
            <Sort />
            <Date />
          </div>
          <Apply />
        </Container>
      </>
    )
  );
}
