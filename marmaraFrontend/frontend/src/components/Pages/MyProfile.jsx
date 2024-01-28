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

  const { updateEmail, authenticate } = useAuth();

  const handleSave = async () => {
    if (checkInputs()) {
      try {
        const response = await updateEmail({
          email: userInfo.email,
        });
        if (response) {
          alert("saved");
          await authenticate();
        } else {
          alert("notSaved");
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }
  };

  return <Button onClickFunction={handleSave} text="Kaydet" />;
}

function Declarations() {
  const [cards, setCards] = useState([]);
  const { getUserDeclarations } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let response;
    const getDeclarations = async () => {
      try {
        response = await getUserDeclarations();

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
              card.visibility === 1 && (
                <Card
                  key={uuidv4()}
                  id={card.id}
                  author={card.user}
                  date={card.created_at}
                  title={card.title}
                  userId={card.user_id}
                  description={card.description}
                />
              )
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
  // TODO: email'i database'den çek
  const { user } = useAuth();

  const [userInfo, setUserInfo] = useState({
    email: user.email,
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
