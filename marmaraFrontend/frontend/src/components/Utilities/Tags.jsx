import React from "react";
import { v4 as uuidv4 } from "uuid";
import TagsLoadingSkeleton from "../LoadingSkeletons/TagsLoadingSkeleton";
import { useGetTags } from "../CustomHooks/useGetTags";

function TagsHeader() {
  return (
    <div className="text-gray-500 flex w-full justify-between pb-2 pr-2">
      <p>Filtreler</p>
    </div>
  );
}

function Tag({ text, filters, setFilters }) {
  // Bu tagları seçtiğimizde servere istek atıcaz
  // ve ona göre ilanları listelicez ama
  // hızlı bi şekilde basıp kaldırma durumlarında
  // UI sıkıntıları çıkacak gibi o yüzden
  // bu videonun bi yerinde bunu nasıl engelleyeceğimiz
  // vardı oraya gelince bakarız
  // https://www.youtube.com/watch?v=-yIsQPp31L0

  const isTagSelected = () => filters.tag.some((tag) => tag === text);

  const handleClick = () => {
    let selectedTags = filters.tag;

    if (isTagSelected()) {
      selectedTags = selectedTags.filter((item) => item !== text);
    } else {
      selectedTags.push(text);
    }

    setFilters((prevValues) => {
      return { ...prevValues, tag: selectedTags };
    });
  };

  return (
    <button
      className={`${
        isTagSelected() ? "bg-accent" : "bg-black"
      } py-1 px-3 whitespace-nowrap rounded-sm font-semibold transition-all ease-in-out  text-neutral`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

function QuickPickTags({ filters, setFilters, tags }) {
  // fetchTags sonuçlanana kadar burası gösterilecek.
  if (!tags) {
    return <TagsLoadingSkeleton />;
  }

  return (
    <div className="flex gap-3">
      {tags.map((tag) => {
        return (
          <Tag
            key={uuidv4()}
            text={tag.text}
            filters={filters}
            setFilters={setFilters}
          />
        );
      })}
    </div>
  );
}

function ShowAllFilters({ setShowAllFilters }) {
  const handleClick = () => {
    setShowAllFilters((prevValue) => {
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

function Tags({ filters, setFilters, setShowAllFilters, onlyTags = false }) {
  const tags = useGetTags();

  return (
    <div className={`${!onlyTags && "px-3"} pt-3`}>
      {!onlyTags && <TagsHeader />}
      <div className="overflow-x-auto relative flex">
        {!onlyTags && <ShowAllFilters setShowAllFilters={setShowAllFilters} />}
        <QuickPickTags filters={filters} setFilters={setFilters} tags={tags} />
      </div>
    </div>
  );
}

export default Tags;
