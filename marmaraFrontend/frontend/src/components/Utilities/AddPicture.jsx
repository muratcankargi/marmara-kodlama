import React from "react";
import swal from "sweetalert";

function AddPictureLogo() {
  return (
    <div className="w-24 h-24 rounded-full border bg-primary-100 flex  items-center justify-center ">
      <img
        src="/images/camera.png"
        className="w-12 h-12 mx-auto"
        alt="Camera Icon"
      ></img>
    </div>
  );
}

function AddPictureInput() {
  const handleFileChange = (e) => {
    // bu şekilde fotoğrafı alıyoruz ama kaydetmemiz lazım
    if (e.target.files[0]) {
      swal({
        title: "Fotoğrafınız başarıyla yüklendi.",
        icon: "success",
        button: "Tamam",
      });
    }
  };

  return (
    <>
      <label className="pt-3 cursor-pointer" htmlFor="fileInput">
        Fotoğraf Yükle
      </label>
      <input
        type="file"
        placeholder="Fotoğraf Yükle"
        accept=".png, .jpg, .jpeg"
        className="absolute top-[-99999px]"
        // input un default ayarları güzel gözükmediği için ekranda göstermiyoruz
        id="fileInput"
        onChange={handleFileChange}
      />
    </>
  );
}

function AddPicture() {
  return (
    <div className="mt-14 flex-col flex items-center justify-center ">
      <AddPictureLogo />
      <AddPictureInput />
    </div>
  );
}

export default AddPicture;
