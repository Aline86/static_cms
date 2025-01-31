import { RawDraftContentState } from "react-draft-wysiwyg";
import PictureGroupCard from "../../../backoffice/bloc/components/picture_group/class/PictureGroupData";
import { lazy, Suspense, useEffect, useState } from "react";
const TextReaderComponent = lazy(
  () => import("../text_picture/texte/text_reader")
);
interface CardDatas {
  data: PictureGroupCard;
  isLightOrDark: any;
  isResponsive: boolean;
}

function InsideCardData({ data, isLightOrDark, isResponsive }: CardDatas) {
  const [contentState, setContentState] = useState<RawDraftContentState>();

  const style = {
    color: isLightOrDark(data.background_color),
    border: "1px solid " + `${isLightOrDark(data.background_color)}`,
    marginBottom: `25px`,
    minHeight: "35px",
  };
  useEffect(() => {
    setContentState(
      typeof data.text === "object"
        ? data.text
        : typeof data.text === "string" && data.text !== ""
        ? JSON.parse(data.text)
        : contentState
    );
  }, [data.text]);
  useEffect(() => {
    setContentState(
      typeof data.text === "object"
        ? data.text
        : typeof data.text === "string" && data.text !== ""
        ? JSON.parse(data.text)
        : contentState
    );
  }, []);
  return (
    <div
      style={{
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `center`,
        marginBlock: "0 auto",
        width: "90%",
        height: "fit-content",
      }}
    >
      <div
        style={{
          display: `flex`,
          flexDirection: `row`,
          alignItems: `center`,
          justifyContent: `center`,
          height: "fit-content",
          marginBottom: "15px",
          fontSize: "25px",

          color: isLightOrDark(data.background_color),
        }}
      >
        {contentState !== undefined && (
          <Suspense fallback={<div>Chargement...</div>}>
            <TextReaderComponent
              read_more={false}
              color={data.background_color}
              toggle={false}
              contenState={contentState}
              isResponsive={isResponsive}
            />
          </Suspense>
        )}
      </div>

      <button style={style} className="buttons">
        Voir
      </button>
    </div>
  );
}

export default InsideCardData;
