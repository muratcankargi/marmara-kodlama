import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function TagsHeader() {
  return (
    <div className="text-gray-500 flex w-full justify-between pb-2 pr-2">
      <p>Sık Kullanılanlar</p>
    </div>
  );
}

function Tag({ text, tag, tags, setTags }) {
  // Bu tagları seçtiğimizde servere istek atıcaz
  // ve ona göre ilanları listelicez ama
  // hızlı bi şekilde basıp kaldırma durumlarında
  // UI sıkıntıları çıkacak gibi o yüzden
  // bu videonun bi yerinde bunu nasıl engelleyeceğimiz
  // vardı oraya gelince bakarız
  // https://www.youtube.com/watch?v=-yIsQPp31L0
  const [selected, setSelected] = useState(tag.selected);

  const handleClick = () => {
    // burasının yaptığı şey doğru tag için selected değerini değiştirmek
    // best practice için bu şekilde yeni bi object yaratarak yapılıyor ama aslında yapılan şey şu
    // tag.selected = !tag.selected
    const updatedTags = tags.map((mapTag) => {
      if (mapTag.text === tag.text) {
        return {
          ...mapTag,
          selected: !mapTag.selected, // Toggle the selected property
        };
      }
      return mapTag;
    });

    setTags(updatedTags); // Update the state with the new array

    // style ı değiştiriyor
    setSelected(tag.selected);
  };

  return (
    <button
      className={`${
        selected ? "bg-accent" : "bg-black"
      } py-1 px-3 whitespace-nowrap rounded-sm font-semibold transition-all ease-in-out  text-neutral`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

function TagsContent({ getTags, setTags, tags }) {
  return (
    <div className="flex gap-3">
      {tags.map((tag) => {
        return (
          <Tag
            key={uuidv4()}
            text={tag.text}
            tag={tag}
            tags={tags}
            setTags={setTags}
            getTags={getTags}
          />
        );
      })}
    </div>
  );
}

function TagsContentContainer({ getTags, setTags, tags }) {
  return (
    <div className="overflow-x-auto relative">
      <TagsContent getTags={getTags} setTags={setTags} tags={tags} />
    </div>
  );
}

// Tags kısmını hamburger menü ye eklesek
// daha mantıklı olabilir gibi çok item olursa hoş durmayacak
function Tags({ getTags }) {
  const [tags, setTags] = useState([
    {
      text: "Tüm İlanlar",
      selected: false,
    },
    {
      text: "Akbil",
      selected: false,
    },
    {
      text: "Maltepe",
      selected: false,
    },
    {
      text: "Kadıköy",
      selected: false,
    },
    {
      text: "Teknoloji",
      selected: false,
    },
    {
      text: "Mimarlık",
      selected: false,
    },
    {
      text: "Çok uzun bir tag ismi",
      selected: false,
    },
  ]);

  useEffect(() => {
    // getTags'i herhangi bir componentden yollararak hangi taglerin seçildiğini alabiliriz
    getTags(tags);
  }, [tags]);

  return (
    <div className="px-3  pt-3">
      <TagsHeader />
      <TagsContentContainer tags={tags} getTags={getTags} setTags={setTags} />
    </div>
  );
}

export default Tags;
