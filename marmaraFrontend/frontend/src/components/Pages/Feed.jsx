import React from "react";
import Logout from "../Logout";

function Feed(props) {
  return (
    <div className="w-full h-full grid place-items-center  ">
      <h1>Feed</h1>
      <Logout setIsAuthenticated={props.setIsAuthenticated} />
    </div>
  );
}

export default Feed;
