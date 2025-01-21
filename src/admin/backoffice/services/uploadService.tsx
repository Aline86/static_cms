import sanitize from "sanitize-filename";
import { BASE_URL_SITE } from "../../../config";
export class UploadService {
  constructor() {}
  static sanitizeName = (filename: string) => {
    let result = filename.replace(/\(.*?\)/g, "");
    return sanitize(result);
  };
  static handleUpload = async (file: any) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      let filename = this.sanitizeName(file.name);
      return await fetch(
        BASE_URL_SITE +
          "/api/uploadfile/index.php?name=" +
          filename +
          "&token=" +
          localStorage.getItem("authToken"),
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          if (data !== undefined) {
            return data;
          }
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
