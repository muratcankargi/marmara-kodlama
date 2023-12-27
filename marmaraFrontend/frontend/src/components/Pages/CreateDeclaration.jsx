import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { alert } from "../Utilities/alert";
import { RegularInput, Textarea } from "../Utilities/Input";
import Button from "../Utilities/Button";
import { useValidate } from "../CustomHooks/useValidate";
import { useAuth } from "../Contexts/AuthContext";
import AddPicture from "../Utilities/AddPicture";
import Tags from "../Utilities/Tags";
import Navbar from "../Utilities/Navbar";
import FullContainer from "../Utilities/FullContainer";
import { useFilters } from "../Contexts/AllFilters";

function Inputs({ setDeclaration, invalid }) {
  return (
    <div className="mt-12 flex flex-col gap-8">
      <RegularInput
        invalid={invalid}
        type="text"
        placeholder="Başlık"
        setState={setDeclaration}
        inputName="title"
        imageName="title.png"
        darkImageName="titleDark.png"
        alt="Title Icon"
      />
      <Textarea
        invalid={invalid}
        placeholder="Açıklama"
        setState={setDeclaration}
        inputName="description"
        alt="Description Icon"
      />
    </div>
  );
}

const clearFilters = (setFilters) => {
  setFilters((prevValues) => {
    return { ...prevValues, tag: [] };
  });
};

function ButtonContainer({ filters, setFilters, declaration, validation }) {
  const navigate = useNavigate();
  const { title, description, image_source, visibility } = declaration;
  const { createDeclaration } = useAuth();
  const tagsArray = filters.tag;

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
        clearFilters(setFilters);
        navigate("/anasayfa");
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

// Bu komponentte tagsleri feed'deki tagsleri kullanarak yaptık
// bu sebeple filterları değiştirmek zorunda kalıyoruz ve çok optimal değil gibi
// şu anlık böyle devam edebilir daha sonra düzenleyebiliyoruz
function CreateDeclaration() {
  const { filters, setFilters } = useFilters();

  useEffect(() => {
    clearFilters(setFilters);
  }, []);

  const [declaration, setDeclaration] = useState({
    title: "",
    description: "",
    visibility: true, // admin kontrolü falan yaparsak burası false olarak gelicek
    image_source: "", // kullanıcının yüklediği image
  });

  const { invalid, validation } = useValidate();

  return (
    <FullContainer paddingTop="pt-12">
      <Navbar text="İlan Oluştur" />
      <div className="w-3/4 mx-auto sm:w-1/2">
        <div className="pt-12">
          <AddPicture />
        </div>
        <Inputs setDeclaration={setDeclaration} invalid={invalid} />
        <Tags onlyTags={true} filters={filters} setFilters={setFilters} />
        <ButtonContainer
          filters={filters}
          setFilters={setFilters}
          declaration={declaration}
          validation={validation}
        />
      </div>
    </FullContainer>
  );
}

export default CreateDeclaration;
