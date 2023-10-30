import SubHeading from "./SubHeading";

function Button({ text, isPicked }) {
  return (
    <button
      className={`${
        isPicked ? "bg-picked" : "bg-darkPrimary"
      } text-neutral py-2 px-5 rounded-sm relative`}
    >
      {text}
      {isPicked && (
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
  return (
    <div>
      <SubHeading text="Sıralama" />
      <div className="flex justify-between">
        <Button text="Eskiden Yeniye" />
        <Button text="Yeniden Eskiye" isPicked={true} />
      </div>
    </div>
  );
}
