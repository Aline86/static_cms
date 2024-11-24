import sanitize from "sanitize-filename";
export class UploadService {
  constructor() {}
  static sanitizeName = (filename: string) => {
    return sanitize(filename.replace("/.(?=.*.) /", ""));
  };
  static handleUpload = async (file: any, base_url: string) => {
    if (file) {
      console.log("Uploading file...");
      const formData = new FormData();
      formData.append("file", file);
      let result = null;
      let filename = this.sanitizeName(file.name);
      result = await fetch(
        "http://localhost:80/cms_v3/welcome_poitiers/api/uploadfile/index.php?name=" +
          filename,
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
