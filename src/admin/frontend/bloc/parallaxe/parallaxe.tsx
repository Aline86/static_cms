import s from "./style.module.css";
import { useEffect, useRef, useState } from "react";
import { Parallaxe } from "../../../backoffice/bloc/components/parallaxe/class/Parallaxe";
import { BASE_URL_SITE } from "../../../../config";

interface BlocParams {
  bloc: Parallaxe;
  full: boolean;
  isResponsive: boolean;
}

function ParallaxeVizualisation({ bloc, full, isResponsive }: BlocParams) {
  const result = window.matchMedia("(max-width: 800px)");
  const img_url = BASE_URL_SITE + "/api/uploadfile/" + bloc.image;
  useEffect(() => {
    console.log("bloc", bloc);
  }, [bloc]);
  useEffect(() => {}, [isResponsive]);

  return bloc.title !== "" ? (
    <div
      className={s.image}
      style={{
        width: !full ? "43vw" : "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2
        className="show"
        style={{
          backgroundImage: `url(${img_url})`,
          textTransform: "uppercase",
          width: !full ? "45vw" : "100%",
          backgroundAttachment: "fixed",
          marginTop: `${
            full
              ? isResponsive
                ? "90px"
                : bloc.bloc_number === 1
                ? "140px"
                : "0px"
              : "30px"
          }`,
          fontSize: isResponsive ? "4vh" : "12vh",
          WebkitTextFillColor: "transparent",
          lineHeight: "100%",
          height: !isResponsive && !result.matches ? "fit-content" : "14vh",
          backgroundClip: "text",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundOrigin: "center",
          marginLeft: !full && !isResponsive ? "30px" : "0",
          marginBottom: "0",
        }}
      >
        {bloc.title}
      </h2>
    </div>
  ) : (
    <div
      className={s.image}
      style={{
        position: "relative",
        backgroundImage: `url(${img_url})`,
        height: isResponsive || result.matches ? "150px" : "30vh",
        backgroundAttachment: "fixed",
        width: full ? "100vw" : "46vw",
        left: 0,
        right: 0,
        marginLeft: !full && !isResponsive ? "30px" : "0",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    ></div>
  );
}

export default ParallaxeVizualisation;
