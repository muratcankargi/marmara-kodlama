import React from "react";
import Tags from "../Utilities/Tags";
import Cards from "../Utilities/Cards";
import Navbar from "../Utilities/Navbar";

// Bu sayfadaki bir şey overflow x yaratıyor
// Onu çözmemiz lazım bulamadım
function Feed() {
  return (
    <div className="w-full  bg-neutral dark:bg-darkNeutral">
      <Navbar text="İlanlar" />
      <Tags />
      <Cards />
    </div>
  );
}

export default Feed;
