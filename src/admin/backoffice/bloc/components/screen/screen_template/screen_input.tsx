import { useEffect } from "react";
import s from "./style.module.css";
import { Screen } from "../class/Screen";

function ScreenInput({
  input_bloc,

  updateScreen,

  toggle,
}: {
  input_bloc: Screen;

  updateScreen: any;

  toggle: boolean;
}) {
  useEffect(() => {}, []);
  useEffect(() => {}, [toggle]);

  return (
    <div className={s.bloc} key={input_bloc.bloc_number}>
      <div className={s.titre} style={{ display: `block`, marginTop: "15px" }}>
        <label>
          <span>
            <h3 style={{ margin: "0", padding: "0" }}>
              Insérer une image de fond
            </h3>
            <input
              type="file"
              name="singleFile"
              onChange={(e) => {
                updateScreen(e, "screen_url", input_bloc);
              }}
            />
          </span>
        </label>
      </div>
      <div className={s.titre}>
        <h3>Titre du bloc (optionnel)</h3>
        <input
          type="text"
          defaultValue={input_bloc.title}
          onChange={(e) => {
            updateScreen(e, "title", input_bloc);
          }}
        />
      </div>
      <div className={s.titre}>
        <h3>Texte du bloc (optionnel)</h3>

        <textarea
          className={s.textarea}
          value={input_bloc.text}
          onChange={(e) => {
            updateScreen(e, "text", input_bloc);
          }}
          style={{ display: `block` }}
        />
        <br />
      </div>
    </div>
  );
}

export default ScreenInput;
