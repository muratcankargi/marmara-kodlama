import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function HamburgerMenuNavigation() {
  const active = window.location.pathname;

  const links = [
    {
      title: "Ana Sayfa",
      link: "/anasayfa",
    },
    {
      title: "İlan Oluştur",
      link: "/ilanolustur",
    },
  ];

  const navigate = useNavigate();

  return links.map((link) => {
    return (
      <li
        key={uuidv4()}
        className={`dark:text-neutral cursor-pointer list-none font-bold 
        ${
          link.link === active
            ? "underline underline-offset-4 decoration-2"
            : ""
        }
        `}
        onClick={() => {
          navigate(link.link);
        }}
      >
        {link.title}
      </li>
    );
  });
}

export default HamburgerMenuNavigation;
