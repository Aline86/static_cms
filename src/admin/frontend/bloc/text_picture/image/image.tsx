import { useEffect, useState } from "react";

import s from "./style.module.css";
import CssPosition from "../classes/cssPosition";
import OptionCss from "../../../../backoffice/bloc/components/text_picture/class/OptionsCss";

interface ImageParams {
  image: string;
  alt_image: string;
  full: boolean;
  css: OptionCss;
  parallaxe: boolean;
  isBlocColumn: boolean;
  titre: string;
  isResponsive: boolean;
}

function Image({
  image,
  alt_image,
  full,
  css,
  parallaxe,
  isBlocColumn,
  titre,
  isResponsive,
}: ImageParams) {
  let datacss = CssPosition.returnPosition(css.position);

  useEffect(() => {}, []);
  return image.length > 0 && !Boolean(Number(parallaxe)) ? (
    <div
      className={s.image}
      style={{
        display: "flex",
        height: "100%",
        justifyContent: datacss.justifyContent,
        alignItems: datacss.alignItems,
        margin: "0 auto",
        marginBottom: "30px",
      }}
    >
      <img
        style={{ width: `${css.width}%`, height: `auto` }}
        src={"http://localhost:80/cms_v2/api/uploadfile/" + image}
        alt={alt_image}
      />
    </div>
  ) : titre !== "" ? (
    <div
      className={s.image}
      style={{
        width: !full ? "43vw" : "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2
        className="show"
        style={{
          backgroundImage:
            `url(http://localhost:80/cms_v2/api/uploadfile/` + image + `)`,

          width: !full ? "43vw" : "100%",

          marginTop: "50px",
          fontSize: isResponsive ? "5vh" : "12vh",
          lineHeight: isResponsive ? "5vh" : "14vh",
          backgroundClip: "text",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundOrigin: "center",
        }}
      >
        {titre}
      </h2>
    </div>
  ) : (
    <div
      className={s.image}
      style={{
        position: "relative",
        backgroundImage:
          `url(http://localhost:80/cms_v2/api/uploadfile/` + image + `)`,
        height: "42vh",
        backgroundAttachment: "fixed",
        width: full ? "100vw" : "43vw",
        left: 0,
        right: 0,

        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    ></div>
  );
}

export default Image;
