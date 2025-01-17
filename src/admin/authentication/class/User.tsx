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

  async hashPassword(password: string | undefined) {
    // Convert the password into a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Use the Web Crypto API to hash the password with SHA-256
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);

    // Convert the ArrayBuffer to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  }

  async decryptData(enteredPassword: string | undefined, storedHash: string) {
    // Convert the entered password into a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(enteredPassword);

    // Hash the entered password using SHA-256
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    // Compare the hashed password with the stored hash
    return hashHex === storedHash;
  }
}
