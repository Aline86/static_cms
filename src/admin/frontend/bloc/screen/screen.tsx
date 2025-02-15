import s from "./style.module.css";
import { Screen } from "../../../backoffice/page/page_template/bloc_components/components/screen/class/Screen";
import { useEffect } from "react";

import { BASE_URL_SITE } from "../../../../config";

interface BlocParams {
  bloc: Screen;

  toggle: boolean;

  isResponsive: boolean;
}

function ScreenVizualisation({
  bloc,

  isResponsive,

  toggle,
}: BlocParams) {
  useEffect(() => {}, [bloc]);

  const result = window.matchMedia("(max-width: 800px)");

  useEffect(() => {}, [isResponsive, toggle]);

  useEffect(() => {}, [bloc.screen_url]);
  return (
    <div className={s.screen_basis}>
      {bloc.screen_url !== "" && (
        <div
          className={s.screen_container}
          style={{
            marginTop: bloc.bloc_number === 1 ? "0px" : "30px",
            background: `url(${
              BASE_URL_SITE + "/api/uploadfile/" + bloc.screen_url
            }) no-repeat center / cover`,
          }}
        >
          <div
            className={s.encart}
            style={{
              position: "relative",
              zIndex: "2",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
            }}
          >
            <h2
              style={{
                display: "inline-block",
                textAlign: "left",
                margin: "0",
                color: "white",
                textTransform: "uppercase",
                fontSize: isResponsive || result.matches ? "50px" : "100px",
                opacity: 0.8,
                marginLeft: isResponsive || result.matches ? "30px" : "250px",
              }}
            >
              {bloc.title}
            </h2>
            <p
              style={{
                fontSize: "25px",

                color: "white",
                display: "inline-block",
                marginLeft: isResponsive || result.matches ? "30px" : "250px",
              }}
            >
              {bloc.text}
            </p>
          </div>

          <div className={s.backdrop}></div>
        </div>
      )}
    </div>
  );
}

export default ScreenVizualisation;
