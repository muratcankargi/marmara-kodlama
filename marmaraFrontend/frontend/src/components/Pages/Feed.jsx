import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Heading() {
  return (
    <div className="w-full flex justify-center items-center  ">
      <h1 className="text-4xl font-bold">İlanlar</h1>
    </div>
  );
}

function TagsHeading() {
  return (
    <div className="text-gray-500 ">
      <p>Etiketler</p>
    </div>
  );
}

function ShowMoreButton({ show, setShow }) {
  const handleClick = () => {
    setShow(true);
  };

  return (
    !show && (
      <button
        className="bottom-2 right-0 left-0 m-auto w-6 h-6 
  flex items-center justify-center bg-white
   absolute rounded-full"
        onClick={handleClick}
      >
        <img
          className="w-4 aspect-square"
          src="./images/down-arrow.png"
          alt="down arrow"
        />
      </button>
    )
  );
}

function Tag({ text }) {
  // Bu tagları seçtiğimizde servere istek atıcaz
  // ve ona göre ilanları listelicez ama
  // hızlı bi şekilde basıp kaldırma durumlarında
  // UI sıkıntıları çıkacak gibi o yüzden
  // bu videonun bi yerinde bunu nasıl engelleyeceğimiz
  // vardı oraya gelince bakarız
  // https://www.youtube.com/watch?v=-yIsQPp31L0
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected((prevValue) => {
      return !prevValue;
    });
  };

  return (
    <button
      className={`${
        selected ? "bg-accent" : "bg-black"
      } py-1 px-3 rounded-sm font-semibold  text-neutral`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

function Tags() {
  const tags = [
    {
      text: "Tüm İlanlar",
    },
    {
      text: "Akbil",
    },
    {
      text: "Maltepe",
    },
    {
      text: "Para",
    },
    {
      text: "Elektronik",
    },
    {
      text: "Kadıköy",
    },
    {
      text: "Cüzdan",
    },
    {
      text: "Kitap",
    },
    {
      text: "Otomobil",
    },
    {
      text: "Ev Eşyaları",
    },
    {
      text: "Bilgisayar",
    },
    {
      text: "Spor",
    },
    {
      text: "Kıyafet",
    },
    {
      text: "Müzik",
    },
    {
      text: "Mobilya",
    },
    {
      text: "Ofis Malzemeleri",
    },
    {
      text: "Bahçe",
    },
    {
      text: "Yemek",
    },
    {
      text: "Eğitim",
    },
    {
      text: "Sağlık",
    },
    {
      text: "Seyahat",
    },
    {
      text: "Hobi",
    },
    {
      text: "Sanat",
    },
    {
      text: "Telefon",
    },
    {
      text: "Film",
    },
    {
      text: "Mücevher",
    },
    {
      text: "Kamera",
    },
    {
      text: "Saat",
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 ">
      {tags.map((tag) => {
        return <Tag key={uuidv4()} text={tag.text} />;
      })}
    </div>
  );
}

function ShowMoreGradient({ show }) {
  return (
    !show && (
      <div className="bg-gradient-to-t opacity-20 rounded-sm from-black absolute w-full h-full bottom-0"></div>
    )
  );
}

function TagsContainer({ show, children }) {
  return (
    <div className={`${show ? "h-auto" : "h-24"} overflow-y-hidden relative`}>
      {children}
    </div>
  );
}

function HamburgerMenu({ setShowMenu }) {
  const handleClick = () => {
    setShowMenu((prevValue) => {
      return !prevValue;
    });
  };

  return (
    <button className="z-50 absolute top-4 right-5" onClick={handleClick}>
      <img className="w-8 aspect-square" src="./images/menu.png" alt="menu" />
    </button>
  );
}

function HamburgerMenuContent({ showMenu }) {
  //slideOut çalışmıyor
  return (
    showMenu && (
      <div
        className={`${showMenu ? "animate-slideIn" : "animate-slideOut"} 
          z-40 top-0 right-0 absolute w-screen transition-all duration-1000
       h-screen bg-red-500`}
      ></div>
    )
  );
}

function Feed() {
  // Bu show olayına biraz transition eklenecek
  const [show, setShow] = useState(false);
  // Tags kısmını hamburger menü ye eklesek
  // daha mantıklı olabilir gibi çok item olursa hoş durmayacak

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="w-full pt-8 ">
      <HamburgerMenu setShowMenu={setShowMenu} />
      <HamburgerMenuContent showMenu={showMenu} />
      <Heading />
      <div className="px-3 pt-3">
        <TagsHeading />
        <TagsContainer show={show}>
          <ShowMoreGradient show={show} />
          <ShowMoreButton show={show} setShow={setShow} />
          <Tags />
        </TagsContainer>
      </div>
    </div>
  );
}

export default Feed;
