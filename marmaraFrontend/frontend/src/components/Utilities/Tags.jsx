import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../Contexts/AuthContext";
import { useAllFilters } from "../Contexts/AllFilters";
import { useSearchParams } from "react-router-dom";

function TagsHeader() {
  return (
    <div className="text-gray-500 flex w-full justify-between pb-2 pr-2">
      <p>Filtreler</p>
    </div>
  );
}

function Tag({ text, tag, tags, setTags, isLoading = false }) {
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
      className={`${selected ? "bg-accent" : "bg-black"} ${
        isLoading && "animate-pulse"
      }  py-1 px-3 whitespace-nowrap rounded-sm font-semibold transition-all ease-in-out  text-neutral`}
      onClick={!isLoading ? handleClick : () => {}}
    >
      {text}
    </button>
  );
}

function TagsContent({ getTags, setTags, tags }) {
  // fetchTags sonuçlanana kadar burası gösterilecek.
  if (!tags) {
    const loadingTags = [
      { text: "Maltepe", selected: false },
      { text: "Elektronik", selected: false },
      { text: "Mühendislik Fakültesi", selected: false },
    ];
    return (
      <div className="flex gap-3">
        {loadingTags.map((tag) => {
          return (
            <Tag
              isLoading={true}
              key={uuidv4()}
              text={tag.text}
              tag={tag}
              tags={loadingTags}
              setTags={setTags}
              getTags={getTags}
            />
          );
        })}
      </div>
    );
  }

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

function ShowAllFilters({ isActive, setIsActive }) {
  const handleClick = () => {
    setIsActive((prevValue) => {
      return !prevValue;
    });
  };

  return (
    <button
      onClick={handleClick}
      className="whitespace-nowrap mr-5 py-1 px-3  relative
      bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l 
      rounded-sm font-semibold  ease-in-out  text-neutral
      after:h-full after:w-[1px] after:bg-gray-400 after:dark:bg-darkPrimary after:absolute after:top-0 after:-right-3 
      "
    >
      Tüm Filtreler
    </button>
  );
}

function TagsContentContainer({
  getTags,
  setTags,
  tags,
  isActive,
  setIsActive,
}) {
  return (
    <div className="overflow-x-auto relative flex">
      <ShowAllFilters isActive={isActive} setIsActive={setIsActive} />
      <TagsContent getTags={getTags} setTags={setTags} tags={tags} />
    </div>
  );
}

// Tags kısmını hamburger menü ye eklesek
// daha mantıklı olabilir gibi çok item olursa hoş durmayacak
function Tags({ getTags }) {
  const [tags, setTags] = useState(null);
  const { isActive, setIsActive } = useAllFilters();

  // Main componenti sadeleştirmek için useEffect'leri custom hooklara ayırıyorum
  useGetTags(tags, setTags, getTags);

  return (
    <div className="px-3  pt-3">
      <TagsHeader />
      <TagsContentContainer
        tags={tags}
        getTags={getTags}
        setTags={setTags}
        isActive={isActive}
        setIsActive={setIsActive}
      />
    </div>
  );
}

const useGetTags = (tags, setTags, getTags) => {
  const { getTagsList } = useAuth();

  useEffect(() => {
    // getTags'i herhangi bir componentden yollararak hangi taglerin seçildiğini alabiliriz
    getTags(tags);
  }, [tags]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getTagsList();

        if (response) {
          setTags(response);
        }
      } catch (error) {
        console.log("Error fetching tags: ", error);
      }
    };

    fetchTags();
  }, []);
};

export default Tags;
