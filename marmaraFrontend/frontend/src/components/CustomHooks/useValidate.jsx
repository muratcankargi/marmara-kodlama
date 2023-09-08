import { useState } from "react";

export function useValidate() {
  // Shake Animation

  // hangi inputa invalid efekti uygulayacağımızı belirlemek
  // için inputName belirliyoruz
  const [invalid, setInvalid] = useState({ inputName: "", value: false });

  const applyEffect = (inputName, inputMessage) => {
    // Shake animasyonu sadece invalid değeri true olduğunda
    // çalışıyor, o yüzden true yaptıktan 200ms sonra(animasyon çalışma süresi)
    // false yapıyoruz ki sonraki tıkladığımızda tekrar true ya çekebilelim

    setInvalid((prevValue) => {
      if (prevValue) {
        setTimeout(() => {
          setInvalid({
            inputName: inputName,
            value: true,
            message: inputMessage,
          });
        }, 200);
        return { inputName: inputName, value: false };
      } else {
        return { inputName: inputName, value: true };
      }
    });
  };

  const removeEffect = (inputName) => {
    setInvalid({ inputName: inputName, value: false });
  };

  // Validations

  const idValidation = (tcId) => {
    // Check if the input is not empty and consists of exactly 11 digits
    if (!/^\d{11}$/.test(tcId)) {
      return false;
    }

    // Convert the TC ID string into an array of digits
    const digits = tcId.split("").map(Number);

    // Calculate the checksum
    const checksum =
      (digits[0] + digits[2] + digits[4] + digits[6] + digits[8]) * 7 -
      (digits[1] + digits[3] + digits[5] + digits[7]);

    // Check if the checksum matches the 10th digit
    if (checksum % 10 !== digits[9]) {
      return false;
    }

    // Check if the sum of all digits except the last one is even
    const sumOfFirstTenDigits = digits
      .slice(0, 10)
      .reduce((acc, val) => acc + val, 0);
    if (sumOfFirstTenDigits % 10 !== digits[10]) {
      return false;
    }

    return true;
  };

  const fatherNameValidation = (fatherName) => {
    // Use a regular expression to check if the name contains only letters and spaces
    // Türkçe karakterler de dahil olduğu için böyle garip durdu
    return /^[A-Za-z\u00C0-\u017F\s]+$/.test(fatherName);
  };

  const emailValidation = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const passwordValidation = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return (
      password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber
    );
  };

  // Functions

  const checkEmail = (email) => {
    if (!emailValidation(email)) {
      let message = "";
      if (!email) {
        message = "Email boş bırakılamaz.";
      } else {
        message = "Geçersiz email.";
      }
      applyEffect("email", message);
    } else {
      removeEffect("email");
      return true;
    }
  };

  const checkPassword = (password) => {
    if (!passwordValidation(password)) {
      let message = "";
      if (password.length < 8) {
        message = "Şifreniz 8 harften kısa olamaz.";
      } else {
        message =
          "Şifreniz en az 1 büyük harf 1 küçük harf 1 sayı içermelidir.";
      }
      applyEffect("password", message);
      return false;
    } else {
      removeEffect("password");
      return true;
    }
  };

  const checkPasswordRepeat = (passwordRepeat, password) => {
    if (passwordRepeat !== password) {
      applyEffect("passwordRepeat", "Şifreler uyuşmuyor.");
      return false;
    } else {
      removeEffect("passwordRepeat");
      return true;
    }
  };

  const checkPersonalId = (personalId) => {
    if (!personalId) {
      applyEffect("personalId", "T.C. kimlik no boş bırakılamaz.");
      return false;
    } else if (!idValidation(personalId)) {
      applyEffect("personalId", "Geçersiz T.C. kimlik no.");
      return false;
    } else {
      removeEffect("personalId");
      return true;
    }
  };

  const checkFatherName = (fatherName) => {
    if (!fatherName) {
      applyEffect("fatherName", "Baba adı boş bırakılamaz.");
      return false;
    } else if (!fatherNameValidation(fatherName)) {
      applyEffect("fatherName", "Geçersiz baba adı.");
      return false;
    } else {
      removeEffect("fatherName");
      return true;
    }
  };

  const checkBirthDate = (birthDate) => {
    if (!birthDate) {
      applyEffect("birthDate", "Doğum tarihi boş bırakılamaz.");
      return false;
    } else {
      removeEffect("birthDate");
      return true;
    }
  };

  return {
    invalid,
    validation: {
      checkEmail,
      checkPassword,
      checkPasswordRepeat,
      checkPersonalId,
      checkFatherName,
      checkBirthDate,
    },
  };
}
