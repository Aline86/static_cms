import s from "./style/style.module.css";
import { useEffect } from "react";
import remove from "./../../../../../../assets/remove.png";
import { PictureGroup } from "../class/PictureGroup";
import PictureGroupData from "../class/PictureGroupData";

import Picture from "../../../../services/picture";
import FileUploadWithProgress from "../../../../services/FileUploadWithProgress";

interface GridData {
  bloc: PictureGroup;
  data: PictureGroupData;
  gap: number;

  index: number;
  updatePictureGroupData: any;
  show_remove: boolean;
}

function Grid({
  bloc,
  gap,
  data,
  index,
  updatePictureGroupData,
  show_remove,
}: GridData) {
  useEffect(() => {}, [bloc]);
  return (
    <div className={s.card}>
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
          ""
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
        {Boolean(bloc.is_grid) && (
          <div
            style={{
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              width: "100%",
            }}
          >
            <div>N° {Number(data.card_number + 1)}</div>

            <FileUploadWithProgress
              sub_field_name={undefined}
              update={updatePictureGroupData}
              text_bouton_telechargement={"Choisir une image"}
              field_name={"image_url"}
              component={bloc}
              index={index}
            />
            <Picture
              update={updatePictureGroupData}
              bloc={bloc}
              index={index}
              sub_bloc={data}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Grid;
