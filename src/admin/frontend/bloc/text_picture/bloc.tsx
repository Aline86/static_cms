import s from "./style.module.css";
import Image from "./image/image";
import Titre from "./titre/titre";
import TextReader from "./texte/text_reader";

import { useEffect, useState } from "react";
import { RawDraftContentState } from "draft-js";
import OptionCss from "../../../backend/bloc/components/text_picture/class/OptionsCss";
import { TextPicture } from "../../../backend/bloc/components/text_picture/class/TextPicture";

interface BlocParams {
  index: number;
  bloc: TextPicture;
  css: OptionCss;
  num_bloc: number;
  toggle: boolean;
  full: boolean;
  isResponsive: boolean;
}

function Bloc({ index, bloc, css, toggle, full, isResponsive }: BlocParams) {
  const [contentState, setContentState] = useState<RawDraftContentState>();
  useEffect(() => {
    setContentState(typeof bloc.text === "object" ? bloc.text : contentState);
  }, [bloc.text]);
  useEffect(() => {
    setContentState(typeof bloc.text === "object" ? bloc.text : contentState);
  }, []);
  useEffect(() => {}, [bloc]);
  return (
    <div
      className={s.bloc}
      style={{
        width: `${
          !bloc.is_parallaxe ? (isResponsive ? "95%" : "50%") : "100%"
        }`,
        margin: "0 auto",
        paddingLeft: full ? `0px` : !bloc.bloc_column ? `30px` : `0px`,
      }}
    >
      {!bloc.is_parallaxe && (
        <div className={s.titre}>
          <Titre titre={bloc.title} />
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
        <div
          className={s.image}
          style={{
            display: `${
              bloc.image !== undefined && bloc.image.length > 0
                ? `block`
                : `none`
            }`,

            width: `${
              bloc.bloc_column ? `100%` : bloc.is_parallaxe ? `100%` : `50%`
            }`,

            marginLeft: `${
              bloc.image_right && !bloc.bloc_column ? `30px` : `0px`
            }`,
          }}
        >
          {bloc.image !== undefined && (
            <Image
              full={full}
              image={bloc.image}
              alt_image={bloc.alt_image}
              css={css}
              parallaxe={bloc.is_parallaxe}
              titre={bloc.title}
              isBlocColumn={bloc.bloc_column}
              isResponsive={isResponsive}
            />
          )}
        </div>
        {contentState !== undefined && !bloc.is_parallaxe && (
          <div
            className={s.text}
            style={{
              display: `${bloc.show_text ? `block` : `none`}`,
              width: `${
                bloc.bloc_column
                  ? `100%`
                  : bloc.image !== undefined && bloc.image.length !== 0
                  ? `50%`
                  : `90%`
              }`,
              margin: "0 auto",
            }}
          >
            <TextReader
              bloc_input={bloc}
              index={index}
              read_more={bloc.text_button_more}
              color={bloc.background_color}
              toggle={toggle}
              contenState={contentState}
              setContentState={undefined}
              onContentStateChange={undefined}
              isResponsive={isResponsive}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Bloc;
