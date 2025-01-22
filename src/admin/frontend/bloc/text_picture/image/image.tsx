import { useEffect } from "react";
import s from "./style.module.css";
import CssPosition from "../classes/cssPosition";
import OptionCss from "../../../../backoffice/bloc/components/text_picture/class/OptionsCss";
import { BASE_URL_SITE } from "../../../../../config";
import { TextPicture } from "../../../../backoffice/bloc/components/text_picture/class/TextPicture";

interface ImageParams {
  bloc: TextPicture;
  full: boolean;
  css: OptionCss;
  isResponsive: boolean;
}

function Image({ bloc, full, css, isResponsive }: ImageParams) {
  let datacss = CssPosition.returnPosition(css.position);
  const style = {
    display: "flex",

    justifyContent: datacss.justifyContent,
    alignItems: datacss.alignItems,
    margin: "0 auto",

    marginBottom: bloc.bloc_column ? "30px" : "5px",
  };
  const style_full: any = {
    display: "flex",
    position: "absolute",
    left: "0",
    right: "0",
    marginTop: "-75px",
  };

  useEffect(() => {}, []);
  return (
    bloc.image.length > 0 && (
      <div className={s.image} style={style}>
        <img
          style={
            !bloc.bloc_column && bloc.text !== ""
              ? { width: `${css.width}%`, height: `auto` }
              : full
              ? isResponsive
                ? style
                : style_full
              : {}
          }
          src={BASE_URL_SITE + "/api/uploadfile/" + bloc.image}
          alt={bloc.alt_image}
        />
      </div>
    )
  );
}

export default Image;
