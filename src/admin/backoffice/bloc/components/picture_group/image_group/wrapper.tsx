import s from "./style/style.module.css";
import { useEffect } from "react";
import remove from "./../../../../../../assets/remove.png";
import { PictureGroup } from "../class/PictureGroup";
import PictureGroupData from "../class/PictureGroupData";
import DropdownData from "../dropdown/Dropdown";

interface CardDatas {
  bloc: PictureGroup;
  gap: number;
  data: PictureGroupData;
  toggle: boolean;
  index: number;
  updatePictureGroupData: any;

  show_remove: boolean;
}

function CardData({
  bloc,
  gap,
  data,
  toggle,
  index,
  updatePictureGroupData,
  show_remove,
}: CardDatas) {
  const result = window.matchMedia("(max-width: 1000px)");
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div>
      <div className={s.remove}>
        {show_remove ? (
          <img
            src={remove}
            alt="suppression box"
            onClick={(e) => {
              updatePictureGroupData(e, "remove", index, bloc);
            }}
          />
        ) : (
          <img src={""} style={{ color: "transparent", border: "none" }} />
        )}
      </div>
      <div
        className={s.card_app}
        style={{
          width: `calc(15vw)`,
          height: `fit-content`,
          marginRight: `${gap}px`,
          paddingTop: `15px`,
        }}
      >
        <DropdownData
          data={data}
          type={"images_group"}
          index={index}
          updateCarousel={updatePictureGroupData}
          bloc={bloc}
        />
        <div
          style={{
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
            width: "100%",
          }}
        >
          {Boolean(data.is_data_button) ? (
            <div
              className={s.flex_row}
              style={{
                display: `flex`,
                flexDirection: `column`,
                alignItems: `center`,
                width: "100%",
                marginBottom: "30px",
              }}
            >
              <h3>Couleur</h3>
              <input
                type="color"
                className={s.color}
                value={data.background_color}
                onChange={(e) => {
                  updatePictureGroupData(e, "color", index, bloc);
                }}
              />
            </div>
          ) : (
            <div
              className={s.flex_row}
              style={{
                display: `flex`,
                flexDirection: `column`,
                alignItems: `center`,
                width: "100%",
              }}
            >
              <h3>Ajouter un bouton :</h3>
              <input
                type="checkbox"
                defaultChecked={Boolean(data.is_data_button)}
                onClick={(e) => {
                  updatePictureGroupData(e, "is_data_button", index, bloc);
                }}
              />
            </div>
          )}
        </div>
        {!Boolean(data.is_data_button) && (
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
                  updatePictureGroupData(e, "image_url", index, bloc);
                }}
              />
            </label>
          </div>
        )}

        <textarea
          className={s.card_text}
          value={data.text}
          placeholder="texte de la carte"
          onChange={(e) => {
            updatePictureGroupData(e, "text", index, bloc);
          }}
        />
      </div>
    </div>
  );
}

export default CardData;
