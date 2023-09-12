import axios from "axios";

export function useAuthenticate() {
  // Login yapıldığı zaman email ve password gönderiyoruz
  // Server token gönderiyor
  const login = async (email, password) => {
    try {
      // Böyle bir kullanıcı varsa
      const response = await axios.post("http://localhost:8000/api/login", {
        email: email,
        password: password,
      });

      return response.data.message;
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  // Logout yapıldığı zaman localStorage dan siliyoruz serverdan
  // silmiyoruz ama silinebilir?
  const logout = () => {
    try {
      localStorage.removeItem("auth");
      return true;
    } catch (error) {
      console.log("Error: ", error.message);
      return false;
    }
  };

  // SignUp yapıldığı zaman bir token döndürülücek
  // Serverda kullanıcının adı,soyadı,numarası kayıt ediliyor o tokenle beraber
  // Tokeni olduğu için createprofilepage e geçebilecek ama daha ilerleyemeyecek
  // tokenin yetkilerine bakılacak
  const signup = async (personalId, fatherName, birthDate) => {
    // Burada bir token döndürülecek serverdan
    try {
      // Sign upda girilen bilgilere sahip öğrenci var mı diye bakılıyor
      const response = await axios.post("http://localhost:8000/api/isStudent", {
        TCKimlikNo: personalId,
        BabaAdi: fatherName,
        DogumTarihi: birthDate,
      });

      // token
      return response.data.message;
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  // Burası kullanıcının emailini ve şifresini servera yollayacak ve
  // Tokenin yetkileri güncellenecek (serverda)
  const saveUser = async (userInfo) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/signup",
        userInfo
      );

      return response.data.message;
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  // Localstorage daki token ile serverda oluşturulmuş token aynı mı diye bakılıyor
  const authenticate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/authenticate",
        {
          token: localStorage.getItem("auth"),
        }
      );

      console.log(response.data);

      // Aynıysa o tokenin sahibinin bilgileri geliyor
      return response.data;
    } catch (error) {
      console.log("Error: ", error.message);
      return false;
    }
  };

  return { login, logout, signup, saveUser, authenticate };
}
