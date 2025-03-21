import s from "./style.module.css";
import Image from "./image/image";
import Titre from "./titre/titre";
import { useEffect, useState, Suspense, lazy } from "react";
import { RawDraftContentState } from "draft-js";
import { TextPicture } from "../../../backoffice/page/page_template/bloc_components/components/text_picture/class/TextPicture";

const TextReaderComponent = lazy(() => import("./texte/text_reader"));
interface BlocParams {
  index: number;
  bloc: TextPicture;
  num_bloc: number;
  toggle: boolean;
  full: boolean;
  isResponsive: boolean;
}

function Bloc({ bloc, toggle, full, isResponsive }: BlocParams) {
  const [contentState, setContentState] = useState<RawDraftContentState>();
  const result = window.matchMedia("(max-width: 800px)");
  useEffect(() => {
    setContentState(typeof bloc.text === "object" ? bloc.text : contentState);
  }, [bloc.text]);
  useEffect(() => {
    setContentState(typeof bloc.text === "object" ? bloc.text : contentState);
  }, []);
  useEffect(() => {}, [bloc, result.matches]);

  return (
    <div
      className={s.bloc}
      style={{
        width: `${
          full ? (isResponsive || result.matches ? "95%" : "50%") : "90%"
        }`,
        margin: "0 auto",
        paddingTop: bloc.bloc_number === 1 ? "100px" : "30px",
        paddingLeft: full ? `0px` : !bloc.bloc_column ? `30px` : `0px`,
      }}
    >
      {bloc.title !== "" && (
        <div className={s.titre}>
          <Titre bloc={bloc} />
        </div>
      )}

      <div
        className={s.bloc_content}
        style={{
          minHeight: "14vh",
          height: "fit-content",
          flexDirection: bloc.bloc_column
            ? `column`
            : bloc.image_right
            ? `row-reverse`
            : `row`,
        }}
      >
        {bloc.image.length > 0 && (
          <div
            className={s.image}
            style={{
              width: !bloc.bloc_column
                ? `${bloc.css.width * 0.5}%`
                : `${bloc.css.width}%`,
              paddingTop: "15px",

              marginBottom: `30px`,
              float: `${
                !bloc.bloc_column
                  ? bloc.image_right
                    ? "left"
                    : "right"
                  : "none"
              }`,
            }}
          >
            <Image bloc={bloc} />
          </div>
        )}
        {bloc.text === "" && <div className={s.clear_box}></div>}
        {contentState !== undefined && (
          <div
            className={s.text}
            style={{
              display: `${bloc.show_text ? `block` : `none`}`,
              width: `${
                bloc.bloc_column
                  ? `100%`
                  : bloc.image !== undefined && bloc.image.length !== 0
                  ? `100%`
                  : `90%`
              }`,
              margin: "0 auto",
            }}
          >
            <Suspense fallback={<div>Chargement...</div>}>
              <TextReaderComponent
                read_more={bloc.text_button_more}
                color={bloc.background_color}
                toggle={toggle}
                contenState={contentState}
                isResponsive={isResponsive}
              />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bloc;
