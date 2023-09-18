import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alert } from "../Utilities/alert";
import Input from "../Utilities/Input";
import Button from "../Utilities/Button";
import CenteredContainer from "../Utilities/CenteredContainer";
import { useValidate } from "../CustomHooks/useValidate";
import { useAuth } from "../Contexts/AuthContext";
import AddPicture from "../Utilities/AddPicture";
import Navbar from "../Utilities/Navbar";

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

function CreateDeclaration() {
  const [declaration, setDeclaration] = useState({
    title: "",
    description: "",
  });

  const { invalid, validation } = useValidate();

  return (
    <>
      <Navbar text="İlan Oluştur" />
      <CenteredContainer>
        <AddPicture />
        <Inputs setDeclaration={setDeclaration} invalid={invalid} />
        <ButtonContainer declaration={declaration} validation={validation} />
      </CenteredContainer>
    </>
  );
}

export default CreateDeclaration;
