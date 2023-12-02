import React, { useEffect, useState } from "react";
import Tags from "../Utilities/Tags";
import Cards from "../Utilities/Cards";
import FullContainer from "../Utilities/FullContainer";
import { useLocationContext } from "../Contexts/LocationContext";
import AllFiltersContainer from "../AllFilters/AllFiltersContainer";
import { useSearchParams } from "react-router-dom";
import Navbar from "../Utilities/Navbar";

function ClearFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const isFilterApplied = searchParams.get("isApply");

  const handleClick = () => {
    // Create a new URLSearchParams object
    const newSearchParams = new URLSearchParams(searchParams);

    // Delete all parameters
    for (const param of searchParams.entries()) {
      newSearchParams.delete(param[0]);
    }

    // Update the state with the new parameters
    setSearchParams(newSearchParams);
  };

  return (
    isFilterApplied && (
      <div
        className="px-3 pt-3 text-neutral
  "
      >
        <button
          onClick={handleClick}
          className="bg-accent relative  p-1 rounded-sm px-2"
        >
          <div className="flex gap-1 items-center">
            {/* <Image
          className=" w-4 aspect-square  h-4"
          imageName="trash.png"
          darkImageName="trash.png"
          alt="filtreleri temizle"
        /> */}
            <div className="font-semibold ">Filtreleri Temizle</div>
          </div>
        </button>
      </div>
    )
  );
}

// TODO: Input olayını hallet, cards ve tags i hallet
function Feed() {
  const [tags, setTags] = useState([]);
  const { setLocation } = useLocationContext();
  const [isActive, setIsActive] = useState(null);
  const [filters, setFilters] = useState({
    sort: "",
    quickSort: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    setLocation("/anasayfa");
  }, []);

  return (
    <FullContainer paddingTop="pt-12">
      <Navbar text="İlanlar" />
      <Tags getTags={setTags} isActive={isActive} setIsActive={setIsActive} />
      <AllFiltersContainer
        setFilters={setFilters}
        filters={filters}
        isActive={isActive}
        setIsActive={setIsActive}
      />
      <Cards tags={tags} filters={filters} />
    </FullContainer>
  );
}

export default Feed;
