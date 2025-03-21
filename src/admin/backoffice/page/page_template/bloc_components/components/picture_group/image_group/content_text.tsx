import s from "./style/style.module.css";

import { PictureGroup } from "../class/PictureGroup";

import { RawDraftContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
interface CardDatas {
  index: number;

  bloc: PictureGroup;

  mounted: boolean;
  onContentStateChange: any;
  contentState: RawDraftContentState | undefined;
  setFocus: any;
}

function ContentText({
  index,

  bloc,

  contentState,

  mounted,
  onContentStateChange,
  setFocus,
}: CardDatas) {
  return (
    <div draggable={false}>
      {mounted && (
        <Editor
          editorStyle={{
            border: "1px solid darkgray",
            minHeight: "150px",
            padding: "10px",
          }}
          localization={{ locale: "fr" }}
          contentState={contentState}
          toolbar={{
            options: [
              "inline",
              "fontSize",
              "textAlign",
              "list",
              "blockType",
              "history",
            ],
            inline: {
              options: ["bold", "italic", "underline"],
            },
            list: {
              options: ["unordered"],
            },
            blockType: {
              inDropdown: true,
              options: ["Normal", "H2"],
            },
          }}
          toolbarClassName={s.toolbar}
          wrapperClassName={s.wrapper}
          editorClassName={s.editor}
          onContentStateChange={(e: any) =>
            onContentStateChange(e, bloc, index)
          }
          onFocus={() => setFocus(true)}
          defaultContentState={contentState}
        />
      )}
    </div>
  );
}

export default ContentText;
