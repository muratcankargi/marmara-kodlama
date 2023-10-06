import React from "react";
import CenteredContainer from "../Utilities/CenteredContainer";
import HamburgerMenu from "../Utilities/HamburgerMenu";
import IntroText from "../Utilities/IntroText";
import { Card } from "../Utilities/Cards";
import { v4 as uuidv4 } from "uuid";

// buraya props olarak id girilecek ve gelen id ye göre
// bir sorgu yapılacak
function DeclarationDetails() {
  // burada getDeclaration/id ye istek atılacak ona göre
  // aynı cards'daki gibi setCards yapılacak ve Card details
  // gösgerilecek

  return (
    <CenteredContainer paddingTop="pt-12">
      <div className="flex w-full justify-between items-center">
        <IntroText mainText="Kayıp Cüzdan" />
        <HamburgerMenu />
      </div>
      {/* Atılan isteğe göre burada o card'ın bilgileri yayınlanacak */}
      <Card
        isDetails={true}
        key={uuidv4()}
        id={2}
        author={"serkan"}
        date={"27-09-2023"}
        title={"deneme başlık"}
        description={"asdadssdadsa"}
      />
      {/* Card'ın tag'leri gözükücek, ayrıntıları gör gözükmeyecek ve iletişime geç tarzı bir  button
      olacak
      Card'ı sil, düzenle buttonları olacak
      */}
    </CenteredContainer>
  );
}

export default DeclarationDetails;
