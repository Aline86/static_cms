import sanitize from "sanitize-filename";
import { BASE_URL_SITE } from "../../../config";
export class UploadService {
  constructor() {}
  static sanitizeName = (filename: string) => {
    return sanitize(filename.replace("/.(?=.*.) /", ""));
  };
  static handleUpload = async (file: any) => {
    if (file) {
      console.log("Uploading file...");
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
}
