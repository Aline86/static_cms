import { useEffect, useState } from "react";
import s from "./styles/style.module.css";

import InsideButton from "./InsideButton";
import { Button } from "../../../backoffice/bloc/components/button/class/Button";

import JSanimationH2 from "../snippets/js_animation_h2";
import { BASE_URL_SITE } from "../../../../config";

interface CustomButtonInfo {
  width: number;
  height: number;

  toggle: boolean;
  bloc: Button;
  full: boolean;
  isResponsive: boolean;
}

function Bouton({
  width,
  height,

  toggle,
  bloc,
  full,
  isResponsive,
}: CustomButtonInfo) {
  const [link, isLink] = useState(true);
  const checkExternal = async (url: string) => {
    if (/.pdf/.test(url.substring(url.length - 4))) {
      isLink(false);
    } else {
      isLink(true);
    }
  };
  useEffect(() => {
    checkExternal(bloc.href_url);
  }, []);
  useEffect(() => {
    checkExternal(bloc.href_url);
  }, [toggle]);
  useEffect(() => {
    JSanimationH2(".container_data", "disappear_data");
  }, [bloc]);

  return (
    <div
      className={s.button_bloc}
      style={{
        background:
          bloc.image_url !== ""
            ? `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url(${BASE_URL_SITE}/api/uploadfile/${bloc.image_url}) no-repeat center / cover`
            : bloc.background_color,

        width: !full ? "43vw" : isResponsive ? "360px" : "90vw",
        margin: "0 auto",
        height: bloc.image_url === "" ? "40vh" : "50vh",
      }}
    >
      <h2
        style={{
          color: bloc.image_url !== "" ? "#ffffff" : "",
          fontStyle: bloc.image_url !== "" ? "" : "italic",
        }}
      >
        {bloc.title}
      </h2>

      <InsideButton
        data={bloc}
        width={width}
        height={height}
        link={link}
        toggle={toggle}
        isResponsive={isResponsive}
      />
    </div>
  );
}

export default Bouton;
