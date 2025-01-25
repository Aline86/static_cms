import { useEffect } from "react";
import s from "./style.module.css";

import OptionCss from "../../../../backoffice/bloc/components/text_picture/class/OptionsCss";
import { BASE_URL_SITE } from "../../../../../config";
import { TextPicture } from "../../../../backoffice/bloc/components/text_picture/class/TextPicture";

interface ImageParams {
  bloc: TextPicture;

  css: OptionCss;
}

function Image({ bloc, css }: ImageParams) {
  useEffect(() => {}, []);
  return (
    bloc.image.length > 0 && (
      <div
        className={s.image}
        style={{
          padding: bloc.bloc_column ? "0 0 15px 0" : "0 15px 0 15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            width: `${css.width}%`,
            height: `auto`,
          }}
          src={BASE_URL_SITE + "/api/uploadfile/" + bloc.image}
          alt={bloc.alt_image}
        />
      </div>
    )
  );
}

export default Image;
