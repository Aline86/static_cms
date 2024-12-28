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
      "http://localhost:80/cms_v3/welcome_poitiers/api/user.php?method=connexion",
      {
        method: "POST",
        body: formdata,
      }
    ).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return await response.json();
    });
    return response;
  }
  async logOut() {
    let formdata = new FormData();

    formdata.append("email", this.email);
    formdata.append("password", this.password);

    const response = await fetch(
      "http://localhost:80/cms_v3/welcome_poitiers/api/user.php?method=delete_connexion",
      {
        method: "DELETE",
        body: formdata,
      }
    ).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    });
    return response;
  }
}
