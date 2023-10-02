import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useAuthz } from "../Contexts/AuthzContext";
import Image from "./Image";

// span, dark modda altta çıkan siyah çizgi
// borderla vermedim çünkü sağdan soldan boşluk olsun istedim
function CardHeading({ author, date }) {
  return (
    <div className="dark:bg-[#1B2430] relative flex justify-between items-center py-1 px-2 text-sm bg-primary-100 text-neutral">
      <span className="w-[96%] h-[2px] -bottom-1 left-1/2 -translate-x-1/2 rounded-lg dark:bg-[#10141A] bg-none absolute"></span>
      <div>{author}</div>
      <div>{date}</div>
    </div>
  );
}

function CardImage({ source }) {
  return (
    <img
      className="object-cover rounded-sm pt-3 h-56 "
      src="/images/cuzdan.jpg"
      alt="Kayıp Eşya"
    />
  );
}

function CardFooter({ id, setIsDeleted }) {
  const { permissions } = useAuthz();
  return (
    <div className="flex h-8 pt-3 justify-between items-center ">
      {permissions === "admin" ? (
        <DeleteCard id={id} setIsDeleted={setIsDeleted} />
      ) : (
        <div></div>
      )}
      <button className="text-neutral h-8 flex justify-center items-center  font-bold bg-accent p-2 rounded-sm">
        Ayrıntıları Gör
      </button>
    </div>
  );
}

function DeleteCard({ id, setIsDeleted }) {
  const handleClick = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/deleteDeclaration/${id}`
      );

      setIsDeleted(true);

      return response.data.message;
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  return (
    <button onClick={handleClick}>
      <Image
        className="w-6 aspect-square"
        imageName="trash.png"
        darkImageName="trashDark.png"
      />
    </button>
  );
}

function CardContent({ heading, content }) {
  return (
    <>
      <div className="text-xl font-bold dark:text-neutral">{heading}</div>
      <p className="pt-2 dark:text-neutral">{content}</p>
    </>
  );
}

function CardBody({ title, description, id, setIsDeleted }) {
  return (
    <div className="bg-white dark:bg-[#1B2430]  shadow-md p-2 py-3 flex flex-col">
      <CardContent heading={title} content={description} />
      <CardImage source="./images/cuzdan.jpg" />
      <CardFooter id={id} setIsDeleted={setIsDeleted} />
    </div>
  );
}

function Card({ author, date, title, description, id }) {
  const [isDeleted, setIsDeleted] = useState(false);

  // bir card'ı sildiğimiz zaman refresh atmadan silinmeyeceği için
  // burada null yapıyoruz ki ekrandan gitsin
  if (isDeleted) {
    return null;
  }

  function capitalizeName(name) {
    // Split the name into words based on spaces
    const words = name.split(" ");

    // Create an array to store the capitalized words
    const capitalizedWords = [];

    // Iterate through the words and capitalize the first letter of each word
    for (const word of words) {
      // Check if the word is not empty
      if (word.length > 0) {
        // Capitalize the first letter of the word and convert the rest to lowercase (Turkish locale)
        const capitalizedWord =
          word.charAt(0).toLocaleUpperCase("tr-TR") +
          word.slice(1).toLocaleLowerCase("tr-TR");
        // Push the capitalized word to the array
        capitalizedWords.push(capitalizedWord);
      }
    }

    // Join the capitalized words back together with spaces and return the result
    return capitalizedWords.join(" ");
  }

  const convertedName = capitalizeName(author);

  return (
    <div className="pb-5 px-3 ">
      <CardHeading author={convertedName} date={date} />
      <CardBody
        title={title}
        description={description}
        id={id}
        setIsDeleted={setIsDeleted}
      />
    </div>
  );
}

// Bu componentler farklı sayfalara ayrılacak
function Cards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getDeclaration"
        );

        setCards(response.data.message);

        return response.data.message;
      } catch (error) {
        console.log("Error: ", error.message);
      }
    };

    asyncFunction();
  }, []);

  return (
    <div className="w-full pt-5 md:grid md:grid-cols-3 ">
      {cards.map((card) => {
        return (
          <Card
            key={uuidv4()}
            id={card.id}
            author={card.user}
            date={card.created_at}
            title={card.title}
            description={card.description}
          />
        );
      })}
    </div>
  );
}

export default Cards;
