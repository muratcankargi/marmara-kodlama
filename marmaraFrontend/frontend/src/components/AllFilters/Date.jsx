import SubHeading from "./SubHeading";

function DatePicker() {
  return (
    <input
      type="date"
      className="outline-0 border border-darkPrimary dark:border-0 dark:bg-darkPrimary py-2 px-1 rounded-sm "
    />
  );
}

function DatePickerContainer({ text }) {
  return (
    <div>
      <DatePicker />
      <div className="text-sm mt-2 dark:text-neutral">{text}</div>
    </div>
  );
}

export default function Date() {
  return (
    <div>
      <SubHeading text="Tarih" />
      <div className="flex justify-between ">
        <DatePickerContainer text="Başlangıç" />
        <DatePickerContainer text="Bitiş" />
      </div>
    </div>
  );
}
