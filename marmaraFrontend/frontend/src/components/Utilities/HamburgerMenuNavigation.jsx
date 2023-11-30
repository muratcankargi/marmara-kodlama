import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useLocationContext } from "../Contexts/LocationContext";

function HamburgerMenuNavigation() {
  // hamburgermenu deki yönlendirmeler burdan kontrol edilecek
  const { location } = useLocationContext();

  // active -> hangi page de olduğumuz
  const [active, setActive] = useState();

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

  // locationContext'ten gelen location değiştiğinde yeni
  // active page'i ayarlıyoruz
  useEffect(() => {
    setActive(location);
  }, [location]);

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
