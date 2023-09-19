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
import Tags from "../Utilities/Tags";

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

function ButtonContainer({ declaration, validation, tags }) {
  const navigate = useNavigate();
  const { title, description } = declaration;
  const { createDeclaration } = useAuth();
  const tagsArray = [];

  const checkInputs = () => {
    const {
      checkDeclarationTitle,
      checkDeclarationDescription,
      checkDeclarationTags,
    } = validation;
    return (
      checkDeclarationTitle(title) &&
      checkDeclarationDescription(description) &&
      checkDeclarationTags(tagsArray)
    );
  };

  // title ve description yolluyoruz daha sonra tags ve photo da yollanacak
  const handleClick = async () => {
    tags.forEach((tag) => {
      // server'a  array gönderdiğimiz için elimizdeki objecti array'e çeviriyoruz
      // sadece selected'i true olanları alıyoruz
      if (tag.selected) tagsArray.push(tag.text);
    });
    // tagsArray'i validation da kullandığımız için üst tarafta
    // işlemleri tamamlıyoruz
    if (checkInputs()) {
      const result = await createDeclaration(title, description, tagsArray);
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
  const [tags, setTags] = useState([]);

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
      <Tags setTags={setTags} />
      <ButtonContainer
        declaration={declaration}
        validation={validation}
        tags={tags}
      />
    </CenteredContainer>
  );
}

export default CreateDeclaration;
