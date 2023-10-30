import SubHeading from "./SubHeading";

export function Option({ text, isPicked }) {
  return (
    <button
      className={`${
        isPicked ? "bg-picked" : "bg-darkPrimary  "
      } py-2 px-4 rounded-sm relative text-neutral`}
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

export default function QuickPick() {
  return (
    <div>
      <SubHeading text="Hızlı Seçim" />
      <div className="flex justify-between">
        <Option text="Son 1 Ay" isPicked={true} />
        <Option text="Son 1 Hafta" />
        <Option text="Bugün" />
      </div>
    </div>
  );
}
