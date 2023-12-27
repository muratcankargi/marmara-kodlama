import React, { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import FullContainer from "../Utilities/FullContainer";
import HamburgerMenu from "../Utilities/HamburgerMenu";
import IntroText from "../Utilities/IntroText";
import { Card } from "../Utilities/Cards";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import Navbar from "../Utilities/Navbar";

// hali hazırda olan Tags componenti burası için fazla karışık olacağından
// direkt tekrar yazdım
function DeclarationTags({ tags }) {
  return (
    <div className="w-full px-3">
      <div className="dark:text-neutral text-darkNeutral  pb-2">Etiketler</div>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => {
          return (
            <div
              key={uuidv4()}
              className="bg-black py-1 px-3 w-fit whitespace-nowrap rounded-sm font-semibold transition-all ease-in-out  text-neutral"
            >
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DeclarationDetails() {
  // ayrıntıları gör'e bastığımızda card'ın id'sine göre bi sayfa yaratıp oraya
  // yönlendiriyoruz ama id pek mantıklı değil, onun yerine başlığa göre bi sayfa yaratılmalı
  const { id } = useParams();

  const { getDeclarationById } = useAuth();
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // gelen id'ye göre card'ı çekiyoruz
  useEffect(() => {
    const asyncFunc = async () => {
      const response = await getDeclarationById(id);

      setCard(response);
      setIsLoading(false);
    };

    asyncFunc();
  }, []);

  return (
    <FullContainer paddingTop="pt-12">
      <Navbar text="İlan Oluştur" />

      <div className="md:max-w-[50%] md:mx-auto px-3">
        {!isLoading ? (
          card && (
            <Card
              isDetails={true}
              key={uuidv4()}
              id={card.id}
              author={card.user}
              date={card.created_at}
              title={card.title}
              description={card.description}
            />
          )
        ) : (
          <Card
            isDetails={true}
            key={uuidv4()}
            id={1}
            author={""}
            date={""}
            title={""}
            description={""}
            isLoading={isLoading}
          />
        )}
        {card && <DeclarationTags tags={card.tags} />}
      </div>
      {/* Card'ın tag'leri gözükücek, ayrıntıları gör gözükmeyecek ve iletişime geç tarzı bir  button
      olacak
      Card'ı sil, düzenle buttonları olacak
      */}
    </FullContainer>
  );
}

export default DeclarationDetails;
