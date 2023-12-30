import React, { useEffect, useState } from "react";
import { alert } from "../Utilities/alert";
import { EditableInput } from "../Utilities/Input";
import Button from "../Utilities/Button";
import AddPicture from "../Utilities/AddPicture";
import { useValidate } from "../CustomHooks/useValidate";
import { useAuth } from "../Contexts/AuthContext";
import FullContainer from "../Utilities/FullContainer";
import Navbar from "../Utilities/Navbar";
import { Card } from "../Utilities/Cards";
import { v4 as uuidv4 } from "uuid";

function Inputs({ userInfo, setUserInfo, invalid }) {
  const [inputType, setInputType] = useState("password");

  return (
    <div>
      <div className="text-darkPrimary dark:text-neutral font-semibold mb-1">
        E-Posta'nı Değiştir
      </div>
      <EditableInput
        invalid={invalid}
        setState={setUserInfo}
        inputName="email"
        imageName="mailIcon.png"
        darkImageName="mailIconDark.png"
        alt="User Icon"
        type="Email"
        placeholder="Email"
        value={userInfo.email}
      />
    </div>
  );
}

function ButtonContainer({ userInfo, validation }) {
  const { email } = userInfo;

  const checkInputs = () => {
    const { checkEmail } = validation;

    return checkEmail(email);
  };

  // const { saveUser } = useAuth();

  const handleSave = async () => {
    if (checkInputs()) {
      // kullanıcı bilgileri updateo olacak
      alert("saved");
      // try {
      //   const response = await saveUser({
      //     email: userInfo.email,
      //     password: userInfo.password,
      //     token: localStorage.getItem("auth"),
      //   });
      //   if (response) {
      //     alert("saved");
      //     navigate("/anasayfa");
      //   } else {
      //     alert("notSaved");
      //     navigate("/kaydol");
      //   }
      // } catch (error) {
      //   console.log("Error: ", error.message);
      // }
    }
  };

  return <Button onClickFunction={handleSave} text="Kaydet" />;
}

function Declarations() {
  const [cards, setCards] = useState([]);
  const { getDeclaration } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let response;
    const getDeclarations = async () => {
      try {
        response = await getDeclaration();

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
    <div className="w-2/3 flex flex-col justify-center pb-8">
      <h2 className="mb-8 mx-auto text-lg font-semibold  text-darkPrimary dark:text-neutral ">
        Paylaştığınız İlanlar
      </h2>
      {!isLoading ? (
        cards ? (
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
          <div className="px-3 mx-auto w-56 pt-12 text-lg font-bold">
            Hiç ilan bulunamadı.
          </div>
        )
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

function MyProfile() {
  // email değeri db den gelecek
  const [userInfo, setUserInfo] = useState({
    email: "murat@gmail.com",
  });

  const { invalid, validation } = useValidate();

  return (
    <FullContainer paddingTop="pt-12">
      <Navbar text={"Profilim"} />
      <div className="flex justify-between  gap-8 px-24 mt-24 ">
        <Declarations />
        <div className="w-1/3 flex flex-col gap-10 ">
          <AddPicture />
          <Inputs
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            invalid={invalid}
          />
          <ButtonContainer validation={validation} userInfo={userInfo} />
        </div>
      </div>
    </FullContainer>
  );
}

export default MyProfile;
