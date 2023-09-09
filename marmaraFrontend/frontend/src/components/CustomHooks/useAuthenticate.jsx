import axios from "axios";
import swal from "sweetalert";

export function useAuthenticate() {
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: email,
        password: password,
      });

      if (response.data.token) {
        swal({
          title: "Bilgileriniz Doğrulandı!",
          icon: "success",
          button: "Tamam",
        });

        return response.data.token;
      } else {
        swal({
          title: "Bilgileriniz Doğrulanamadı",
          icon: "error",
          button: "Tamam",
        });

        return false;
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  const authenticate = (token) => {
    return token.trim() === localStorage.getItem("auth").trim();
  };

  return { login, authenticate };
}
