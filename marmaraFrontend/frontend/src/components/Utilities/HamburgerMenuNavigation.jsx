import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function HamburgerMenuNavigation() {
  const navigate = useNavigate();

  const links = [
    {
      title: "İlan Oluştur",
      link: "/createDeclaration",
    },
    {
      title: "Ana Sayfa",
      link: "/feed",
    },
  ];

  return links.map((link) => {
    return (
      <button
        key={uuidv4()}
        className="dark:text-neutral font-bold"
        onClick={() => {
          navigate(link.link);
        }}
      >
        {link.title}
      </button>
    );
  });
}

export default HamburgerMenuNavigation;
