import React from "react";
import swal from "sweetalert";

// Alertleri tek sayfadan yönetebilmek ve mesajları
// değiştirebilmek için buraya taşıyorum
// diğer sayfalarda sadece state girilicek ve burada mesajlar
// ayarlanacak
export function alert(state) {
  function alertSuccess(message) {
    swal({
      title: message,
      icon: "success",
      button: "Tamam",
    });
  }

  function alertError(message) {
    swal({
      title: message,
      icon: "error",
      button: "Tamam",
    });
  }

  switch (state) {
    case "authenticated":
      alertSuccess("Bilgileriniz Doğrulandı!");
      break;
    case "notAuthenticated":
      alertError("Bilgileriniz Doğrulanamadı.");
      break;
    case "alreadySaved":
      alertError("Zaten kaydınız var, lütfen giriş yapınız.");
      break;
    case "saved":
      alertSuccess("Bilgileriniz Kaydedildi!");
      break;
    case "notSaved":
      alertError("Bilgileriniz Kaydedilemedi.");
      break;
    case "logout":
      alertSuccess("Başarıyla çıkış yaptınız.");
      break;
    case "notLogout":
      alertError("Çıkış yapılamadı.");
      break;
    case "pictureSaved":
      alertSuccess("Fotoğrafınız başarıyla yüklendi.");
      break;
    case "declarationSaved":
      alertSuccess("İlan başarıyla paylaşıldı!");
      break;
    case "declarationNotSaved":
      alertError("İlan paylaşılamadı.");
      break;
    case "emptyTags":
      alertError("Lütfen en az bir adet etiket seçiniz.");
      break;
    case "declarationDeleted":
      alertSuccess("İlan silindi!");
      break;
    default:
      // Burası production da kaldırılıcak şuanlık
      // yanlış state girişi yaparsak çalışıcak düzeltelim
      // diye
      alertError("Default Alert.");
      break;
  }
}
