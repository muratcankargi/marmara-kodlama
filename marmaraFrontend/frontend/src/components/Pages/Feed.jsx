import React from "react";
import HamburgerMenu from "../Utilities/HamburgerMenu";
import Tags from "../Utilities/Tags";

function CurrentFilter({ text }) {
  return (
    <div className="w-full flex justify-center items-center  ">
      <h1 className="text-4xl font-bold">{text}</h1>
    </div>
  );
}

function Feed() {
  return (
    <div className="w-full pt-8 ">
      <HamburgerMenu />
      <CurrentFilter text="İlanlar" />
      <Tags />
    </div>
  );
}

export default Feed;
