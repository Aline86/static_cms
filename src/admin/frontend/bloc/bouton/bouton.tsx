import { useEffect, useState } from "react";
import s from "./styles/style.module.css";

import InsideButton from "./InsideButton";
import { Button } from "../../../backoffice/bloc/components/button/class/Button";

import JSanimationH2 from "../snippets/js_animation_h2";

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
  const result = window.matchMedia("(max-width: 1000px)");
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
        backgroundColor: bloc.background_color,
        width: !full ? "43vw" : isResponsive ? "360px" : "90vw",
        margin: "0 auto",
      }}
    >
      <h2 className="">{bloc.title}</h2>
      <div className={s.image_button_bloc}>
        <img
          style={{
            width: isResponsive ? "320px" : "100%",
          }}
          src={
            "http://localhost:80/cms_v2/api/uploadfile/" + `${bloc.image_url}`
          }
          alt={bloc.title}
        />
      </div>

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
