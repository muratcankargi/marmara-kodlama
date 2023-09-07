import React from "react";

function Input(props) {
  const styles = {
    background: "none",
    width: "100%",
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    props.setState((prevValues) => {
      return { ...prevValues, [props.about]: value };
    });
  };

  return (
    <div className="mt-12 w-full flex border-2 border-b-slate-300 border-x-0 border-t-0 p-2 pl-0 ">
      <img className="w-6 h-6" src={props.src} alt={props.alt} />
      <input
        onChange={handleOnChange}
        className="pl-2 w-3/4 outline-0 border-0"
        style={props.type === "Date" ? styles : {}}
        type={props.type}
        placeholder={props.placeholder}
        required
      />
    </div>
  );
}

export default Input;
