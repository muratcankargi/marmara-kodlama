import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

function TagsHeader({ showMoreTags, setShowMoreTags }) {
  const handleClick = () => {
    setShowMoreTags(false);
  };

  return (
    <div className="text-gray-500 flex w-full justify-between pb-2 pr-2">
      <p>Etiketler</p>
      {showMoreTags && (
        <button onClick={handleClick} className="font-bold text-accent ">
          Gizle
        </button>
      )}
    </div>
  );
}

function ShowMoreButton({ showMoreTags, setShowMoreTags }) {
  const handleClick = () => {
    setShowMoreTags(true);
  };

  return (
    !showMoreTags && (
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
      } first:bg-accent py-1 px-3 rounded-sm font-semibold transition-all ease-in-out  text-neutral`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

function TagsContent() {
  return (
    <div className="flex flex-wrap gap-3 ">
      {tags.map((tag) => {
        return <Tag key={uuidv4()} text={tag.text} />;
      })}
    </div>
  );
}

function ShowMoreGradient({ showMoreTags }) {
  return (
    !showMoreTags && (
      <div className="bg-gradient-to-t opacity-30 rounded-sm from-black absolute w-full h-full bottom-0"></div>
    )
  );
}

function TagsContentContainer({ showMoreTags, setShowMoreTags }) {
  const lengthOfTags = Math.round(tags.length / 3);

  // Transition eklemek için grid kullanıyoruz
  // Default olarak 8rem girdik sonraki
  // Value yu hesaplamak için tags'in kaç tane elementi olduğuna
  // bakıyoruz
  const styles = {
    gridTemplateRows: `${lengthOfTags * 3}rem`,
  };

  return (
    <div
      className="grid transition-all duration-500"
      style={showMoreTags ? styles : { gridTemplateRows: "6rem" }}
    >
      <div className="overflow-y-hidden relative">
        <>
          <ShowMoreGradient showMoreTags={showMoreTags} />
          <ShowMoreButton
            showMoreTags={showMoreTags}
            setShowMoreTags={setShowMoreTags}
          />
          <TagsContent />
        </>
      </div>
    </div>
  );
}

// Tags kısmını hamburger menü ye eklesek
// daha mantıklı olabilir gibi çok item olursa hoş durmayacak
function Tags() {
  // Bu show olayına biraz transition eklenecek
  // Tags kısmını kontrol ediyor
  const [showMoreTags, setShowMoreTags] = useState(false);

  return (
    <div className="px-3 pt-3">
      <TagsHeader
        showMoreTags={showMoreTags}
        setShowMoreTags={setShowMoreTags}
      />
      <TagsContentContainer
        showMoreTags={showMoreTags}
        setShowMoreTags={setShowMoreTags}
      />
    </div>
  );
}

export default Tags;
