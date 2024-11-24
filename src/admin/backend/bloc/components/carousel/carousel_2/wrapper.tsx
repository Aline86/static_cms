import Card from "../../../../classes/Card";
import s from "./style/style.module.css";
import { useEffect } from "react";
import remove from "./../../../../../../assets/remove.png";

interface CardDatas {
  width: number;
  height: number;
  gap: number;
  data: Card;
  toggle: boolean;
  index: number;
  updateBloc: any;
  type: string;
  show_remove: boolean;
}

function CardData({
  width,
  height,
  gap,
  data,
  toggle,
  index,
  updateBloc,
  type,
  show_remove,
}: CardDatas) {
  const result = window.matchMedia("(max-width: 1000px)");

  return (
    <div
      className={s.card_app}
      style={{
        width: `calc(${width}vw)`,
        height: `165px`,
        marginRight: `30px`,
        marginBottom: `5px`,
      }}
    >
      <div className="button_remove_container">
        {show_remove ? (
          <img
            src={remove}
            alt="suppression box"
            onClick={(e) => {
              updateBloc(e, "carousel", "remove", index);
            }}
          />
        ) : (
          <img src={""} style={{ color: "transparent", border: "none" }} />
        )}
      </div>
      <input
        className={s.href_url}
        value={data.href_url}
        placeholder="Url de redirection"
        onChange={(e) => {
          updateBloc(e, type, "href_url", index);
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
            placeholder="Url de l'image"
            onChange={(e) => {
              updateBloc(e, type, "image_url", index);
            }}
          />
        </label>
      </div>
      <textarea
        className={s.card_text}
        value={data.text}
        placeholder="texte de la carte"
        onChange={(e) => {
          updateBloc(e, type, "text", index);
        }}
      />
    </div>
  );
}

export default CardData;
