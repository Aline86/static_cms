import { BASE_URL_SITE } from "./../../../config.tsx";

export default class User {
  email: string;
  password: string;
  token: string;
  constructor(email: string, password: string, token: string) {
    this.email = email;
    this.password = password;
    this.token = token;
  }
  public async loginAction(data: any) {
    let formdata = new FormData();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    // Test de l'input avec la regex
    if (emailRegex.test(data.email)) {
      formdata.append("email", data.email);
    } else {
      return false;
    }
    if (passwordRegex.test(data.password)) {
      formdata.append("password", data.password);
    } else {
      return false;
    }

    const response = await fetch(
      BASE_URL_SITE + "/api/user.php?method=connexion",
      {
        method: "POST",
        credentials: "include",
        body: formdata,
      }
    ).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      this.email = data.email;
      this.password = data.password;

      return await response.json();
    });

    return response;
  }
  async logOut() {
    const response = await fetch(
      BASE_URL_SITE + "/api/user.php?method=delete_connexion",
      {
        referrerPolicy: "strict-origin-when-cross-origin", // n
        mode: "cors",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
          Authorization: `${localStorage.getItem("authToken")}`, // notice the Bearer before your token
        },
      }
    ).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    });
    return response;
  }
  async check_token(): Promise<boolean> {
    const response = await fetch(
      BASE_URL_SITE + "/api/user.php?method=check_token",
      {
        referrerPolicy: "strict-origin-when-cross-origin", // n
        mode: "cors",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
          Authorization: `${localStorage.getItem("authToken")}`, // notice the Bearer before your token
        },
      }
    ).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      return await response.json();
    });

    return response;
  }
  set_auth_token(token: string) {
    this.token = token;
  }
  retrieveHashedPassword() {
    const storedHashedPassword = localStorage.getItem("authToken");
    if (storedHashedPassword) {
      return storedHashedPassword;
    } else {
      return null;
    }
  }
}
