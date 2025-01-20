import { useEffect } from "react";
import s from "./style.module.css";
import CssPosition from "../classes/cssPosition";
import OptionCss from "../../../../backoffice/bloc/components/text_picture/class/OptionsCss";
import { BASE_URL_SITE } from "../../../../../config";

interface ImageParams {
  image: string;
  alt_image: string;
  css: OptionCss;
  isBlocColumn: boolean;
}

function Image({ image, alt_image, css, isBlocColumn }: ImageParams) {
  let datacss = CssPosition.returnPosition(css.position);

  useEffect(() => {}, []);
  return (
    image.length > 0 && (
      <div
        className={s.image}
        style={{
          display: "flex",

          justifyContent: datacss.justifyContent,
          alignItems: datacss.alignItems,
          margin: "0 auto",

          marginBottom: isBlocColumn ? "30px" : "5px",
        }}
      >
        <img
          style={{ width: `${css.width}%`, height: `auto` }}
          src={BASE_URL_SITE + "/api/uploadfile/" + image}
          alt={alt_image}
        />
      </div>
    )
  );
}

export default Image;
