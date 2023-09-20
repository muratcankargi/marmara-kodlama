import React, { useEffect, useState } from "react";
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
import { useLocationContext } from "../Contexts/LocationContext";

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
  const { title, description, image_source, visibility } = declaration;
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

  const handleClick = async () => {
    tags.forEach((tag) => {
      // server'a  array gönderdiğimiz için elimizdeki objecti array'e çeviriyoruz
      // sadece selected'i true olanları alıyoruz
      if (tag.selected) tagsArray.push(tag.text);
    });
    // tagsArray'i validation da kullandığımız için üst tarafta
    // işlemleri tamamlıyoruz
    if (checkInputs()) {
      const result = await createDeclaration(
        title,
        description,
        tagsArray,
        image_source,
        visibility
      );
      if (result) {
        alert("declarationSaved");
        navigate("/feed");
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
  // tags'leri alıyoruz Tags componentinden
  const [tags, setTags] = useState([]);
  const { setLocation } = useLocationContext();

  useEffect(() => {
    setLocation("/createDeclaration");
  }, []);

  const [declaration, setDeclaration] = useState({
    title: "",
    description: "",
    visibility: true, // admin kontrolü falan yaparsak burası false olarak gelicek
    image_source: "", // kullanıcının yüklediği image
  });

  const { invalid, validation } = useValidate();

  return (
    <CenteredContainer paddingTop="pt-12">
      {/* Bu hamburgermenu nün positonunu bu şekilde vermek aslında biraz saçma
        yani en azından her sayfada aynı tutmak zor, ama her yerde aynı yapmaya çalışmakta zor
        feed sayfasında sticky ye bağlı olduğu için çok sıkıntı yaratıyor
        diğer sayfalarda veya buna benzer sayfalarda bu değerleri kullanarak en azından
        bi kısmını stabil tutabiliriz
      */}
      <div className="flex w-full justify-between items-center">
        <IntroText mainText="İlan Oluştur" />
        <HamburgerMenu />
      </div>
      <div className="pt-12">
        <AddPicture />
      </div>
      <Inputs setDeclaration={setDeclaration} invalid={invalid} />
      <Tags getTags={setTags} />
      <ButtonContainer
        declaration={declaration}
        validation={validation}
        tags={tags}
      />
    </CenteredContainer>
  );
}

export default CreateDeclaration;
