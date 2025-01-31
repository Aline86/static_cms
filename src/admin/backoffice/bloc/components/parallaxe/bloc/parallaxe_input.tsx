import { useEffect } from "react";
import s from "./style.module.css";
import { Parallaxe } from "../class/Parallaxe";
import FileUploadWithProgress from "../../../../services/FileUploadWithProgress";

function ParallaxeInput({
  input_bloc,
  updateParallaxe,
  draggable,
  toggle,
}: {
  input_bloc: Parallaxe;
  draggable: boolean;
  updateParallaxe: any;
  toggle: boolean;
}) {
  useEffect(() => {}, [toggle]);

  return (
    <div className={s.bloc} key={input_bloc.bloc_number}>
      <div
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
        draggable={draggable}
      >
        <div className={s.titre}>
          <h3>Titre du bloc</h3>
          <input
            type="text"
            defaultValue={input_bloc.title}
            onChange={(e) => {
              updateParallaxe(e, "title", input_bloc);
            }}
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
              display: `inline-block`,
              width: `100%`,
            }}
          >
            <h3>Insérer une image</h3>

            <FileUploadWithProgress
              sub_field_name={undefined}
              update={updateParallaxe}
              text_bouton_telechargement={"Choisir une image"}
              field_name={"image"}
              component={input_bloc}
              index={undefined}
            />
            <h3>Texte de la balise image</h3>
            <input
              type="text"
              value={input_bloc.alt_image}
              onChange={(e) => {
                updateParallaxe(e, "alt_image", input_bloc);
              }}
              style={{ display: `block` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParallaxeInput;
