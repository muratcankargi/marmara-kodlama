import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alert } from "../Utilities/alert";
import Input from "../Utilities/Input";
import IntroText from "../Utilities/IntroText";
import Button from "../Utilities/Button";
import CenteredContainer from "../Utilities/CenteredContainer";
import { useValidate } from "../CustomHooks/useValidate";
import { useAuth } from "../Contexts/AuthContext";
import HamburgerMenu from "../Utilities/HamburgerMenu";
import AddPicture from "../Utilities/AddPicture";

function Inputs({ setDeclaration, invalid }) {
  return (
    <>
      <Input
        invalid={invalid}
        type="text"
        placeholder="Başlık"
        setState={setDeclaration}
        inputName="title"
        src="/images/title.png"
        alt="Title Icon"
      />
      <Input
        invalid={invalid}
        type="textarea"
        placeholder="Açıklama"
        setState={setDeclaration}
        inputName="description"
        src="/images/title.png"
        alt="Description Icon"
      />
    </>
  );
}

function ButtonContainer({ declaration, validation }) {
  const navigate = useNavigate();
  const { title, description } = declaration;
  const { createDeclaration } = useAuth();

  const checkInputs = () => {
    const { checkDeclarationTitle, checkDeclarationDescription } = validation;
    return (
      checkDeclarationTitle(title) && checkDeclarationDescription(description)
    );
  };

  // title ve description yolluyoruz daha sonra tags ve photo da yollanacak
  const handleClick = async () => {
    if (checkInputs()) {
      const result = await createDeclaration(title, description);
      if (result) {
        alert("declarationSaved");
        // navigate("/feed");
      } else {
        alert("declarationNotSaved");
      }
    }
  };

  return (
    <div className="pt-8 pb-4 w-full flex justify-center items-center ">
      <Button onClickFunction={handleClick} text="İlan Oluştur" />
    </div>
  );
}

// tags eklenecek
function CreateDeclaration() {
  // buraya visibility, image_source ve tags eklenecek (database bu şekilde)
  const [declaration, setDeclaration] = useState({
    title: "",
    description: "",
  });

  const { invalid, validation } = useValidate();

  return (
    <CenteredContainer>
      <div className="absolute top-16 right-2">
        <HamburgerMenu />
      </div>
      <IntroText mainText="İlan Oluştur" />
      <AddPicture />
      <Inputs setDeclaration={setDeclaration} invalid={invalid} />
      <ButtonContainer declaration={declaration} validation={validation} />
    </CenteredContainer>
  );
}

export default CreateDeclaration;
