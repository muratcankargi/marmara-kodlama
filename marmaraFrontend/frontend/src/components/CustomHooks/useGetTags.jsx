import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";

// Tags'leri cekebilmek icin bir custom hook
export const useGetTags = () => {
  const { getTagsList } = useAuth();

  const [tags, setTags] = useState(null);

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

  if (tags) return tags;
};
