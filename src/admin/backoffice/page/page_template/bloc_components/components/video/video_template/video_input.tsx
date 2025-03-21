import { useEffect, useState } from "react";
import s from "./style.module.css";
import { Video } from "../class/Video";
import FileUploadWithProgress from "../../../../../../services/FileUploadWithProgress";

function VideoInput({
  input_bloc,

  updateVideo,

  reload_blocs,
  toggle,
}: {
  input_bloc: Video;

  updateVideo: any;
  reload_blocs: any;
  refresh: boolean;
  toggle: boolean;
}) {
  const [isYoutube, setIsYoutube] = useState(false);
  const [choice, isExternalLink] = useState<boolean>(true);

  const [clear, setClear] = useState(false);
  const updateIsYoutube = () => {
    setIsYoutube(!isYoutube);
    setClear(true);
  };
  const validateLink = async () => {
    let result = await input_bloc.save_bloc();
    if (result !== undefined) {
      reload_blocs();
    }
  };
  const checkExternal = async (url: string) => {
    let prefixe = url.substring(0, 4);

    if (prefixe === "http" || prefixe === "") {
      isExternalLink(true);
    } else {
      isExternalLink(false);
    }
  };

  useEffect(() => {
    checkExternal(input_bloc.video_url);
  }, []);
  useEffect(() => {
    choice !== undefined && setIsYoutube(choice);
  }, [choice]);
  useEffect(() => {}, [toggle]);

  return (
    <div className={s.bloc} key={input_bloc.bloc_number}>
      <div className={s.titre}>
        <h3>Titre du bloc (optionnel)</h3>
        <input
          type="text"
          defaultValue={input_bloc.title}
          onChange={(e) => {
            updateVideo(e, "title", input_bloc);
          }}
        />
      </div>
      <div className={s.titre}>
        <h3>Texte du bloc (optionnel)</h3>

        <textarea
          className={s.textarea}
          value={input_bloc.text}
          onChange={(e) => {
            updateVideo(e, "text", input_bloc);
          }}
          style={{ display: `block` }}
        />
      </div>
      <div
        className={s.bloc_content}
        style={{
          display: "flex",
          flexDirection: `column`,
        }}
      >
        <div
          className={s.image}
          style={{
            width: `100%`,
          }}
        >
          {isYoutube ? (
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "30px",
                  marginTop: "15px",
                  marginBottom: "15px",
                  alignItems: "center",
                }}
              >
                <h3 style={{ margin: "0", padding: "0" }}>Charger une vidéo</h3>
                <input
                  style={{ margin: "0", padding: "0" }}
                  type="checkbox"
                  onChange={() => updateIsYoutube()}
                />
              </div>
              <div
                className={s.titre}
                style={{ display: `block`, marginTop: "15px" }}
              >
                <h3 style={{ margin: "0", padding: "0" }}>
                  Insérer un lien youtube :
                </h3>
                <input
                  defaultValue={!clear ? input_bloc.video_url : ""}
                  type="text"
                  name="singleFile"
                  onChange={(e) => {
                    updateVideo(e, "video_url", input_bloc);
                  }}
                  style={{ display: `block` }}
                />
              </div>
            </div>
          ) : (
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "30px",
                  marginTop: "10px",
                  alignItems: "center",
                }}
              >
                <h3 style={{ margin: "0", padding: "0" }}>
                  Insérer un lien youtube
                </h3>
                <input
                  defaultValue={!clear ? input_bloc.video_url : ""}
                  style={{ margin: "0", padding: "0" }}
                  type="checkbox"
                  onChange={() => updateIsYoutube()}
                />
              </div>
              <FileUploadWithProgress
                sub_field_name={undefined}
                update={updateVideo}
                text_bouton_telechargement={"Télécharger une vidéo"}
                field_name={"video_url"}
                component={input_bloc}
                index={undefined}
              />
            </div>
          )}
          <label htmlFor="">
            <span>
              <button
                style={{ color: "white", fontSize: "18px" }}
                onClick={validateLink}
              >
                Insérer {isYoutube ? "le lien" : "la vidéo"}
              </button>
            </span>
          </label>

          <div style={{ display: "flex", gap: "30px" }}>
            <div className={s.bouton_container}>
              <h3>Largeur</h3>
              <input
                type="number"
                value={input_bloc.width}
                min={25}
                max={100}
                onChange={(e) => updateVideo(e, "width", input_bloc)}
              />
            </div>
            <div className={s.bouton_container}>
              <h3>Hauteur</h3>
              <input
                type="number"
                value={input_bloc.height}
                min={15}
                max={100}
                onChange={(e) => updateVideo(e, "height", input_bloc)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoInput;
