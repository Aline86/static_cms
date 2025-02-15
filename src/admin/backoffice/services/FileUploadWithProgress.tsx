import { useState } from "react";
import Header from "../page/page_template/bloc_components/components/header/Header";
import Footer from "../page/page_template/bloc_components/components/footer/Footer";
import { TextPicture } from "../page/page_template/bloc_components/components/text_picture/class/TextPicture";

interface BlocData {
  update: any;
  text_bouton_telechargement: string;
  field_name: string;
  component: any;
  index: number | undefined;
  sub_field_name: string | undefined;
}

function FileUploadWithProgress({
  update,
  text_bouton_telechargement,
  field_name,
  component,
  index,
  sub_field_name,
}: BlocData) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  function updateComponent(fn: Function) {
    return function (...args: any[]) {
      // Check how many arguments the function expects and adapt accordingly
      const numArgs = fn.length;

      if (args.length < numArgs) {
        // Handle missing arguments or provide default values
        const missingArgs = numArgs - args.length;
        args = [...args, ...Array(missingArgs).fill(undefined)];
      }

      return fn(...args);
    };
  }

  const handleUpload = (e: any) => {
    if (!e.target.files[0]) return;

    const selectedFile = e.target.files[0];

    let uploaded = 0;

    setUploading(true);

    const totalSize = selectedFile.size; // File size in MB

    // Calculate the upload speed in Mbps

    // Simulating upload by using setInterval (you can replace this with an actual upload logic)
    const interval = setInterval(() => {
      uploaded += totalSize / 100;
      if (uploaded >= totalSize) {
        uploaded = totalSize;
        clearInterval(interval);
        setUploading(false);
      }
      setProgress(uploaded / totalSize);
    }, 100); // Simulate every 100ms*/
  };

  return (
    <div>
      {component instanceof Header || component instanceof Footer ? (
        <label>
          <span>
            <h3 style={{ width: `250px!important` }}>
              {text_bouton_telechargement}
            </h3>
            <input
              type="file"
              name="singleFile"
              onChange={(e) => {
                updateComponent(update(e, field_name, sub_field_name, index));
                handleUpload(e);
              }}
              disabled={uploading}
            />
          </span>
        </label>
      ) : component instanceof TextPicture ? (
        <label>
          <span>
            <h3 style={{ width: `250px!important` }}>
              {text_bouton_telechargement}
            </h3>
            <input
              type="file"
              name="singleFile"
              onChange={(e) => {
                updateComponent(
                  update(e, field_name, sub_field_name, component)
                );
                handleUpload(e);
              }}
              disabled={uploading}
            />
          </span>
        </label>
      ) : (
        <label>
          <span>
            <h3 style={{ width: `250px!important` }}>
              {text_bouton_telechargement}
            </h3>
            <input
              type="file"
              name="singleFile"
              onChange={(e) => {
                updateComponent(update(e, field_name, component, index));
                handleUpload(e);
              }}
              disabled={uploading}
            />
          </span>
        </label>
      )}
      {uploading && (
        <div
          style={{
            marginTop: "20px",
            width: "250px",
            marginLeft: "0 auto",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              width: "250px",
              backgroundColor: "#e0e0e0",

              height: "20px",
            }}
          >
            <div
              style={{
                width: `${progress * 100}px`,
                backgroundColor: "#4caf50",
                height: "100%",

                maxWidth: "250px",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUploadWithProgress;
