import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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

function CardButton() {
  return (
    <button className="text-neutral h-8 flex justify-center items-center self-end mt-3 font-bold bg-accent p-2 rounded-md">
      Ayrıntıları Gör
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

function CardBody({ title, description }) {
  return (
    <div className="bg-white dark:bg-[#1B2430]  shadow-md p-2 py-3 flex flex-col">
      <CardContent heading={title} content={description} />
      <CardImage source="./images/cuzdan.jpg" />
      <CardButton />
    </div>
  );
}

function Card({ author, date, title, description }) {
  // function capitalizeFirstLetter(author) {
  //   return author.charAt(0).toLocaleUpperCase() + author.slice(1);
  // }

  // const editedAuthor = capitalizeFirstLetter(author.toLocaleLowerCase());

  return (
    <div className="pb-5 px-3 ">
      <CardHeading author={author} date={date} />
      <CardBody title={title} description={description} />
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
