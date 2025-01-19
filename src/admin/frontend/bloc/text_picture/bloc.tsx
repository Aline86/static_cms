import s from "./style.module.css";
import Image from "./image/image";
import Titre from "./titre/titre";
import TextReader from "./texte/text_reader";
import { useEffect, useState } from "react";
import { RawDraftContentState } from "draft-js";
import OptionCss from "../../../backoffice/bloc/components/text_picture/class/OptionsCss";
import { TextPicture } from "../../../backoffice/bloc/components/text_picture/class/TextPicture";

interface BlocParams {
  index: number;
  bloc: TextPicture;
  css: OptionCss;
  num_bloc: number;
  toggle: boolean;
  full: boolean;
  isResponsive: boolean;
}

function Bloc({ bloc, css, toggle, full, isResponsive }: BlocParams) {
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
        marginTop:
          (isResponsive || result.matches) && bloc.bloc_number === 1
            ? "100px"
            : "30px",
        paddingLeft: full ? `0px` : !bloc.bloc_column ? `30px` : `0px`,
      }}
    >
      <div className={s.titre}>
        <Titre titre={bloc.title} />
      </div>

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
              width: `${bloc.bloc_column ? `100%` : `50%`}`,
              paddingTop: "15px",
              marginLeft: `0px`,
              marginRight: `0px`,
              marginBottom: `0px`,
              float: `${bloc.image_right ? "left" : "right"}`,
            }}
          >
            <Image
              image={bloc.image}
              alt_image={bloc.alt_image}
              css={css}
              isBlocColumn={bloc.bloc_column}
            />
          </div>
        )}
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
            <TextReader
              read_more={bloc.text_button_more}
              color={bloc.background_color}
              toggle={toggle}
              contenState={contentState}
              isResponsive={isResponsive}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Bloc;
