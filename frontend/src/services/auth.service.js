import axios from "axios";

const API_URL = "http://localhost:8080/";
const API_LOGIN_URL = "login/";
const API_REG_URL = "createUser/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + API_LOGIN_URL, { 
        "emailAddress": email, 
        "password": password 
      })
      .then((response) => {
        if (response.data.accessToken) {
          console.log(response.data.accessToken);
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      })
      .catch(err => {
        alert("Invalid email or password");
        console.log(err);
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(first_name, last_name, email, password) {
    return axios.post(API_URL + API_REG_URL, {
      "firstName": first_name,
      "lastName": last_name,
      "emailAddress": email,
      "password": password
    });
  }
}

export default new AuthService();
