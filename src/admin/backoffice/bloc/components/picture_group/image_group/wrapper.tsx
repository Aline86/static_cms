import s from "./style/style.module.css";
import { useEffect, useState } from "react";
import remove from "./../../../../../../assets/remove.png";
import { PictureGroup } from "../class/PictureGroup";
import PictureGroupData from "../class/PictureGroupData";
import DropdownData from "../dropdown/Dropdown";
import Picture from "../../../../services/picture";
import ContentText from "./content_text";
import { RawDraftContentState } from "react-draft-wysiwyg";

interface CardDatas {
  bloc: PictureGroup;
  gap: number;
  data: PictureGroupData;
  index: number;
  updatePictureGroupData: any;
  show_remove: boolean;
}

function CardData({
  bloc,
  gap,
  data,
  index,
  updatePictureGroupData,
  show_remove,
}: CardDatas) {
  const [contentState, setContentState] = useState<RawDraftContentState>();
  const [mounted, setMounted] = useState(false);
  const [, setFocus] = useState(false);
  const onContentStateChange = (
    contentState: any,
    bloc: PictureGroup,
    index: number
  ) => {
    updatePictureGroupData(contentState, "text", bloc, index);
  };
  const updateMounted = () => {
    setMounted(!mounted);
  };

  useEffect(() => {
    if (!mounted) {
      updateMounted();
    }
  }, [mounted]);
  useEffect(() => {
    data.is_data_button &&
      setContentState(
        typeof data.text === "object"
          ? data.text
          : typeof data.text === "string" && data.text !== ""
          ? JSON.parse(data.text)
          : contentState
      );
  }, []);
  return (
    <div>
      <div className={s.remove}>
        {show_remove ? (
          <img
            src={remove}
            alt="suppression box"
            onClick={(e) => {
              updatePictureGroupData(e, "remove", bloc, index);
            }}
          />
        ) : (
          <img src={""} style={{ color: "transparent", border: "none" }} />
        )}
      </div>
      <div
        className={s.card_app}
        style={{
          width: `calc(18vw)`,
          height: `fit-content`,
          marginRight: `${gap}px`,
          paddingTop: `15px`,
        }}
      >
        <DropdownData
          data={data}
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
                  updatePictureGroupData(e, "color", bloc, index);
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
                  updatePictureGroupData(e, "is_data_button", bloc, index);
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
                  updatePictureGroupData(e, "image_url", bloc, index);
                }}
              />
            </label>
            <Picture
              update={updatePictureGroupData}
              bloc={bloc}
              index={index}
              sub_bloc={data}
            />
          </div>
        )}
        {data.is_data_button ? (
          <ContentText
            index={index}
            bloc={bloc}
            mounted={mounted}
            onContentStateChange={onContentStateChange}
            contentState={contentState}
            setFocus={setFocus}
          />
        ) : (
          <textarea
            className={s.card_text}
            value={data.text}
            placeholder="texte de la carte"
            onChange={(e) => {
              updatePictureGroupData(e, "text", bloc, index);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CardData;
