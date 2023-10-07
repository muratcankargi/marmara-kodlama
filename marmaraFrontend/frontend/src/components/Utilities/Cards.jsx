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
function CardHeading({ author, date }) {
  return (
    <div className="dark:bg-[#1B2430] relative flex justify-between items-center py-1 px-2 text-sm bg-primary-100 text-neutral">
      <span className="w-[96%] h-[2px] -bottom-1 left-1/2 -translate-x-1/2 rounded-lg dark:bg-[#10141A] bg-none absolute"></span>
      <div>{author}</div>
      <div>{date}</div>
    </div>
  );
}

function CardImage({ source, isDetails }) {
  return (
    <img
      className={`object-cover rounded-sm pt-3 ${
        isDetails ? "md:h-96 h-56" : "h-56"
      } `}
      src="/images/cuzdan.jpg"
      alt="Kayıp Eşya"
    />
  );
}

function CardFooter({ id, setIsDeleted }) {
  const { permissions } = useAuthz();
  const navigate = useNavigate();
  const { setLocation } = useLocationContext();

  const handleClick = () => {
    setLocation("");
    navigate(`/declarationdetails/${id}`);
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
        className="text-neutral h-8 flex justify-center items-center  font-bold bg-accent p-2 rounded-sm"
      >
        Ayrıntıları Gör
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

function CardContent({ heading, content }) {
  return (
    <>
      <div className="text-xl font-bold dark:text-neutral">{heading}</div>
      <p className="pt-2 dark:text-neutral">{content}</p>
    </>
  );
}

function CardBody({ title, description, id, setIsDeleted, isDetails }) {
  return (
    <div className="bg-white dark:bg-[#1B2430]  shadow-md p-2 py-3 flex flex-col">
      <CardContent heading={title} content={description} />
      <CardImage source="./images/cuzdan.jpg" isDetails={isDetails} />
      <CardFooter id={id} setIsDeleted={setIsDeleted} />
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
  id,
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
      <CardHeading author={convertedName} date={date} />
      <CardBody
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

  useEffect(() => {
    const getDeclarations = async () => {
      try {
        const response = await getDeclaration();

        setCards(response);
      } catch (error) {
        console.log("Error: ", error.message);
      }
    };

    getDeclarations();
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
