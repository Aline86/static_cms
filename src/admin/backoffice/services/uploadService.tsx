import sanitize from "sanitize-filename";
import { BASE_URL_SITE } from "../../../config";
export class UploadService {
  constructor() {}
  static sanitizeName = (filename: string) => {
    return sanitize(filename.replace("/.(?=.*.) /", ""));
  };
  static handleUpload = async (file: any) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      let result = null;
      let filename = this.sanitizeName(file.name);
      result = await fetch(
        BASE_URL_SITE + "/api/uploadfile/index.php?name=" + filename,
        {
          method: "POST",
          body: formData,
        }
      );
      if (result !== null) {
        return filename;
      }
      return filename;
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
