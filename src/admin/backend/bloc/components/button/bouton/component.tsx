import { Button } from "../class/Button";
import DropdownData from "../dropdown/Dropdown";
import s from "./style/style.module.css";

interface CardDatas {
  toggle: boolean;
  updateButton: any;
  bloc: Button;
}

function ButtonInput({ toggle, updateButton, bloc }: CardDatas) {
  const result = window.matchMedia("(max-width: 1000px)");

  return (
    <div
      className={s.bouton}
      style={{
        height: `fit-content`,
        width: "50vw",
      }}
    >
      <div
        className={s.bouton_container_2}
        style={{
          width: `90%`,
          height: `fit-content`,
        }}
      >
        <div
          className={s.cards}
          style={{
            width: `95%`,
            height: `fit-content`,
          }}
        >
          <h3>Couleur de l'arrière plan :</h3>
          <input
            type="color"
            className={s.color}
            value={bloc.background_color}
            onChange={(e) => {
              updateButton(e, "background_color", bloc);
            }}
          />
          <input
            className={s.href_url}
            value={bloc.title}
            placeholder="Titre du bloc"
            onChange={(e) => {
              updateButton(e, "title", bloc);
            }}
          />

          <div
            style={{
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              width: "100%",
            }}
          >
            <label>
              <span>Choisir une image</span>
              <input
                type="file"
                className={s.image_url}
                onChange={(e) => {
                  updateButton(e, "image_url", bloc);
                }}
              />
            </label>
          </div>
          <DropdownData updateButton={updateButton} bloc={bloc} />

          <textarea
            className={s.card_text}
            value={bloc.text}
            placeholder="texte de la carte"
            onChange={(e) => {
              updateButton(e, "text", bloc);
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default ButtonInput;
