import s from "./style.module.css";

import { useEffect, useRef, useState } from "react";
import { Video } from "../../../backoffice/bloc/components/video/class/Video";
import { Parallaxe } from "../../../backoffice/bloc/components/parallaxe/class/Parallaxe";

interface BlocParams {
  bloc: Parallaxe;
  full: boolean;
  isResponsive: boolean;
}

function ParallaxeVizualisation({
  bloc,

  full,

  isResponsive,
}: BlocParams) {
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
        justifyContent: "center",
        alignItems: "center",
        marginTop: isResponsive || bloc.bloc_number > 1 ? "-50px" : "0",
      }}
    >
      <h2
        className="show"
        style={{
          backgroundImage:
            `url(http://localhost:80/cms_v3/welcome_poitiers/api/uploadfile/` +
            bloc.image +
            `)`,
          textTransform: "uppercase",
          width: !full ? "45vw" : "100%",
          backgroundAttachment: "fixed",
          marginTop: `${full ? (isResponsive ? "30px" : "0") : "30px"}`,
          fontSize: isResponsive ? "4vh" : "10vh",
          WebkitTextFillColor: "transparent",
          lineHeight: isResponsive ? "5vh" : "12vh",
          backgroundClip: "text",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundOrigin: "center",
          marginLeft: !full && !isResponsive ? "30px" : "0",
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
        backgroundImage:
          `url(http://localhost:80/cms_v3/welcome_poitiers/api/uploadfile/` +
          bloc.image +
          `)`,
        height: "45vh",
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
