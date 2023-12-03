import React, { useState } from "react";
import Tags from "../Utilities/Tags";
import Cards from "../Utilities/Cards";
import FullContainer from "../Utilities/FullContainer";
import AllFiltersContainer from "../AllFilters/AllFiltersContainer";
import Navbar from "../Utilities/Navbar";
import { useFilters } from "../Contexts/AllFilters";

function ClearFilters() {
  return (
    <div
      className="px-3 pt-3 text-neutral
  "
    >
      <button className="bg-accent relative  p-1 rounded-sm px-2">
        <div className="flex gap-1 items-center">
          <div className="font-semibold ">Filtreleri Temizle</div>
        </div>
      </button>
    </div>
  );
}

// TODO: Input olayını hallet, cards ve tags i hallet
function Feed() {
  const [showAllFilters, setShowAllFilters] = useState(null);

  const { filters, setFilters } = useFilters();

  return (
    <FullContainer paddingTop="pt-12">
      <Navbar text="İlanlar" />
      <Tags
        setFilters={setFilters}
        filters={filters}
        setShowAllFilters={setShowAllFilters}
      />
      <AllFiltersContainer
        setFilters={setFilters}
        filters={filters}
        showAllFilters={showAllFilters}
        setShowAllFilters={setShowAllFilters}
      />
      <Cards filters={filters} />
    </FullContainer>
  );
}

export default Feed;
