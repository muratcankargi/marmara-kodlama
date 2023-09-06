import React from "react";

function Logout(props) {
  const handleOnClick = () => {
    props.setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  return <button onClick={handleOnClick}>Çıkış Yap</button>;
}

export default Logout;
