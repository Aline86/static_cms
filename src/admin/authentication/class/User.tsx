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

    formdata.append("email", data.email);
    formdata.append("password", data.password);

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
    let formdata = new FormData();

    formdata.append("email", this.email);
    formdata.append("password", this.password);

    const response = await fetch(
      BASE_URL_SITE + "/api/user.php?method=delete_connexion",
      {
        method: "DELETE",
        credentials: "include",
        body: formdata,
      }
    ).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    });
    return response;
  }
  async check_token(): Promise<boolean> {
    let formdata = new FormData();

    console.log("this.token", this.token);

    formdata.append("token", JSON.stringify(this.token));
    const response = await fetch(
      BASE_URL_SITE + "/api/user.php?method=check_token",
      {
        method: "POST",
        credentials: "include",
        body: formdata,
      }
    ).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      return await response.json();
    });

    return Boolean(Number(response[0].is_token));
  }
  set_auth_token(token: string) {
    this.token = token;
  }
}
