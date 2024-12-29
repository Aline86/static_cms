import { useEffect, useState } from "react";

import s from "./style.module.css";
import CssPosition from "../classes/cssPosition";
import OptionCss from "../../../../backoffice/bloc/components/text_picture/class/OptionsCss";
import { BASE_URL_SITE } from "../../../../../config";

interface ImageParams {
  image: string;
  alt_image: string;
  full: boolean;
  css: OptionCss;

  isBlocColumn: boolean;
  titre: string;
  isResponsive: boolean;
}

function Image({
  image,
  alt_image,
  full,
  css,

  isBlocColumn,
  titre,
  isResponsive,
}: ImageParams) {
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

          marginBottom: "30px",
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
