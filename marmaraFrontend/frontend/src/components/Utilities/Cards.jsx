import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useAuthz } from "../Contexts/AuthzContext";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Image from "./Image";
import { useLocationContext } from "../Contexts/LocationContext";

// span, dark modda altta çıkan siyah çizgi
// borderla vermedim çünkü sağdan soldan boşluk olsun istedim
function CardHeading({ author, date, isLoading, id }) {
  let width1, width2;

  switch (id) {
    case 1:
      width1 = "w-16";
      width2 = "w-24";
      break;
    case 2:
      width1 = "w-32";
      width2 = "w-16";
      break;
    case 3:
      width1 = "w-12";
      width2 = "w-20";
      break;
    case 4:
      width1 = "w-16";
      width2 = "w-16";
      break;
    default:
      width1 = "w-24";
      width2 = "w-16";
      break;
  }

  return (
    <div className="dark:bg-[#1B2430] relative flex justify-between items-center py-1 px-2 text-sm bg-primary-100 text-neutral">
      <span className="w-[96%] h-[2px] -bottom-1 left-1/2 -translate-x-1/2 rounded-lg dark:bg-[#10141A] bg-none absolute"></span>
      <div
        className={`${
          isLoading &&
          `${width1} h-4 dark:bg-darkNeutral bg-primary-200 rounded-sm animate-pulse`
        }`}
      >
        {author}
      </div>
      <div
        className={`${
          isLoading &&
          `${width2} h-4 dark:bg-darkNeutral bg-primary-200 rounded-sm animate-pulse`
        }`}
      >
        {date}
      </div>
    </div>
  );
}

function CardImage({ source, isDetails, isLoading }) {
  return !isLoading ? (
    <img
      className={`object-cover rounded-sm pt-3 ${
        isDetails ? "md:h-96 h-56" : "h-56"
      }`}
      src="/images/cuzdan.jpg"
      alt="Kayıp Eşya"
    />
  ) : (
    <div
      className={`dark:bg-darkNeutral bg-gray-300 animate-pulse w-full ${
        isDetails ? "md:h-96 h-56" : "h-56"
      }`}
    ></div>
  );
}

function CardFooter({ id, setIsDeleted, isDetails = false, isLoading }) {
  const { permissions } = useAuthz();
  const navigate = useNavigate();
  const { setLocation } = useLocationContext();

  const handleClick = () => {
    if (!isDetails) {
      setLocation("");
      navigate(`/ilandetaylari/${id}`);
    } else if (isDetails) {
      console.log("mesajlaşma başlıyor.");
    }
  };

  return (
    <div className="flex h-8 pt-3 justify-between items-center ">
      {permissions === "admin" ? (
        <DeleteCard id={id} setIsDeleted={setIsDeleted} />
      ) : (
        <div></div>
      )}
      <button
        onClick={handleClick}
        className={`text-neutral h-8 flex justify-center items-center  font-bold bg-accent p-2 rounded-sm
        ${
          isLoading
            ? "dark:bg-darkNeutral animate-pulse pointer-events-none"
            : ""
        } 
        `}
      >
        {!isDetails ? "Ayrıntıları Gör" : "İletişime Geç"}
      </button>
    </div>
  );
}

function DeleteCard({ id, setIsDeleted }) {
  const { authenticate } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      //İlan silme gibi önemli işlemlerde ekstra güvenlik önlemi olarak bir kez daha
      //doğrulama yapıyoruz, yapmazsak kullanıcının ekranı açıkken localStorage'ı silse bile
      //silme tuşuna bastığı zaman doğrulama yapılmadığından ilan silinir.
      setIsLoading(true);
      const authResponse = await authenticate();
      if (authResponse.user) {
        const response = await axios.delete(
          `http://localhost:8000/api/deleteDeclaration/${id}`
        );

        setIsDeleted(true);

        return response.data.message;
      }
    } catch (error) {
      console.log("Error: ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleClick}>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Image
          className="w-6 aspect-square"
          imageName="trash.png"
          darkImageName="trashDark.png"
        />
      )}
    </button>
  );
}

function CardContent({ heading, content, isLoading, id }) {
  // Yüklenirken bütün card'lar aynı gözükmesin diye farklı default değerler giriyoruz switch ile
  let width1, width2, width3, width4;

  switch (id) {
    case 1:
      width1 = "w-48";
      width2 = "w-64";
      width3 = "w-48";
      width4 = "w-52";
      break;
    case 2:
      width1 = "w-32";
      width2 = "w-48";
      width3 = "w-40";
      width4 = "w-24";
      break;
    case 3:
      width1 = "w-32";
      width2 = "w-64";
      width3 = "w-64";
      width4 = "w-48";
      break;
    case 4:
      width1 = "w-24";
      width2 = "w-32";
      width3 = "w-48";
      width4 = "w-24";
      break;
    default:
      width1 = "w-48";
      width2 = "w-64";
      width3 = "w-48";
      width4 = "w-52";
      break;
  }

  return (
    <>
      <div
        className={`text-xl font-bold dark:text-neutral 
      ${
        isLoading
          ? `${width1} h-4 dark:bg-darkNeutral bg-gray-300 animate-pulse`
          : ""
      }`}
      >
        {heading}
      </div>
      {!isLoading ? (
        <p className="pt-2 dark:text-neutral">{content}</p>
      ) : (
        <>
          <p
            className={`pt-2 mt-4 dark:text-neutral ${
              isLoading
                ? `${width2} h-4 dark:bg-darkNeutral bg-gray-300 animate-pulse my-1`
                : ""
            }`}
          >
            {content}
          </p>
          <p
            className={`pt-2 dark:text-neutral ${
              isLoading
                ? `${width3} h-4 dark:bg-darkNeutral bg-gray-300 animate-pulse my-1`
                : ""
            }`}
          >
            {content}
          </p>
          <p
            className={`pt-2 dark:text-neutral ${
              isLoading
                ? `${width4} h-4 dark:bg-darkNeutral bg-gray-300 animate-pulse my-1`
                : ""
            }`}
          >
            {content}
          </p>
        </>
      )}
    </>
  );
}

function CardBody({
  title,
  description,
  id,
  setIsDeleted,
  isDetails,
  isLoading,
}) {
  return (
    <div className="bg-white dark:bg-[#1B2430]  shadow-md p-2 py-3 flex flex-col">
      <CardContent
        heading={title}
        content={description}
        isLoading={isLoading}
        id={id}
      />
      <CardImage
        source="./images/cuzdan.jpg"
        isDetails={isDetails}
        isLoading={isLoading}
      />
      <CardFooter
        id={id}
        setIsDeleted={setIsDeleted}
        isDetails={isDetails}
        isLoading={isLoading}
      />
    </div>
  );
}

// isDetails: eğer sayfa declarationDetails ise ona göre bi style
// vermemiz lazım
export function Card({
  author,
  date,
  title,
  description,
  id = 1,
  isLoading,
  isDetails = false,
}) {
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
    <div className={`pb-5 px-3 ${isDetails ? "pt-16" : ""}`}>
      <CardHeading
        isLoading={isLoading}
        author={convertedName}
        date={date}
        id={id}
      />
      <CardBody
        isLoading={isLoading}
        isDetails={isDetails}
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
  const { getDeclaration } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDeclarations = async () => {
      try {
        const response = await getDeclaration();

        setCards(response);
        setIsLoading(false);
      } catch (error) {
        console.log("Error: ", error.message);
      }
    };

    getDeclarations();
  }, []);

  // farklı card id'lerine göre farklı style'lar veriliyor
  const loadingCards = [1, 2, 3, 4];

  return (
    <div className="w-full pt-5 md:grid md:grid-cols-3 ">
      {!isLoading ? (
        cards.map((card) => {
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
        })
      ) : (
        <>
          {loadingCards.map((id) => {
            return (
              <Card
                key={uuidv4()}
                id={id}
                author={""}
                date={""}
                title={""}
                description={""}
                isLoading={isLoading}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default Cards;
