import sanitize from "sanitize-filename";
import { BASE_URL_SITE } from "../../../config";

export class UploadService {
  constructor() {}
  static sanitizeName = (filename: string) => {
    let result = filename.replace(/\(.*?\)/g, "");
    return sanitize(result);
  };
  /* static handleUpload = (file: any) => {
    let filename = this.sanitizeName(file.name);
    Resizer.imageFileResizer(
      file, // file to resize
      900, // max width
      600, // max height
      "JPEG", // format (can be 'JPEG', 'PNG', etc.)
      90, // quality (0-100)
      0, // rotation
      async (uri: any) => {
        // Here, you can handle the resized image
        // Then send the resized image to your server (as an example, console.log it)
        const formData = new FormData();
        formData.append("file", uri);

        // Example of how to send it to the server (you need to replace this with your server URL)
        return await fetch(
          BASE_URL_SITE + "/api/uploadfile/index.php?name=" + filename,
          {
            method: "POST",
            credentials: "include",

            referrerPolicy: "strict-origin-when-cross-origin", // n
            mode: "cors",
            headers: {
              Authorization: `${sessionStorage.getItem("authToken")}`, // notice the Bearer before your token
            },
            body: formData,
          }
        )
          .then((response) => {
            if (!response.ok) {
              console.error("il y a eu un pb lors du chargement");
            }

            return filename;
          })

          .catch((error) => console.error("Error:", error));
      },
      "base64" // output as base64 string
    );
    return filename;
  };*/

  static handleUpload = async (file: any) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      let filename = this.sanitizeName(file.name);
      return await fetch(
        BASE_URL_SITE + "/api/uploadfile/index.php?name=" + filename,
        {
          method: "POST",
          credentials: "include",

          referrerPolicy: "strict-origin-when-cross-origin", // n
          mode: "cors",
          headers: {
            Authorization: `${sessionStorage.getItem("authToken")}`, // notice the Bearer before your token
          },
          body: formData,
        }
      ).then(async (response) => {
        if (!response.ok) {
          console.error("il y a eu un pb lors du chargement");
        }
        return filename;
      });
    }
  };

  static handleUploadImg = async (file: any) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      let filename = this.sanitizeName(file.name);
      return await fetch(
        BASE_URL_SITE + "/api/uploadfile/index.php?name=" + filename,

        {
          method: "POST",
          credentials: "include",

          referrerPolicy: "strict-origin-when-cross-origin", // n
          mode: "cors",
          headers: {
            Authorization: `${sessionStorage.getItem("authToken")}`, // notice the Bearer before your token
          },
          body: formData,
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          console.log("data", data);
          if (data !== undefined) {
            return data;
          }
        });
    }
  };
  static deleteUpload = async (file: any, token: string | null) => {
    await fetch(
      BASE_URL_SITE +
        "/api/uploadfile/index.php?name=" +
        file +
        "&token=" +
        token,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
  };
  static checkImageExists = async (imageUrl: string) => {
    const controller = new AbortController();
    const signal = controller.signal;
    return await fetch(
      BASE_URL_SITE + "/api/uploadfile/index.php?name=" + imageUrl,
      {
        method: "GET",
        signal,
      }
    )
      .then(() => {})
      .catch((error) => {
        // Catching specific abort errors
        if (error.name === "AbortError") {
          return false;
        } else {
          return false;
        }
      });
  };
}
