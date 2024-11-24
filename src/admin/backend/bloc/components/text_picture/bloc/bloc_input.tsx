import { useEffect, useState } from "react";
import s from "./style.module.css";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { TextPicture } from "../class/TextPicture";
import { RawDraftContentState } from "draft-js";
import { UploadService } from "../../../../services/uploadService";

function BlocInput({
  input_bloc,
  updateBloc,
  draggable,
  onContentStateChange,
  index,
  toggle,
}: {
  input_bloc: TextPicture;
  draggable: boolean;
  updateBloc: any;
  onContentStateChange: any;
  index: number;
  toggle: boolean;
}) {
  const [contentState, setContentState] = useState<RawDraftContentState>();
  const [focus, setFocus] = useState(false);
  const [mounted, setMounted] = useState(false);
  const updateMounted = () => {
    setMounted(!mounted);
  };
  useEffect(() => {
    if (!mounted) {
      updateMounted();
    }
  }, [mounted]);
  useEffect(() => {
    setContentState(
      typeof input_bloc.text === "object" ? input_bloc.text : contentState
    );
  }, []);
  useEffect(() => {}, [toggle]);
  return (
    <div className={s.bloc} key={input_bloc.bloc_number}>
      <div className={s.titre}>
        <h3>Titre du bloc</h3>
        <input
          type="text"
          defaultValue={input_bloc.title}
          onChange={(e) => {
            updateBloc(e, "title", undefined, input_bloc);
          }}
        />
      </div>
      <div
        className={s.bloc_content}
        style={{
          display: "flex",
          flexDirection: `column`,
        }}
      >
        <div
          className={s.image}
          style={{
            display: `${input_bloc.show_picture ? `inline-block` : `none`}`,
            width: `100%`,
          }}
        >
          <h3>Insérer une image</h3>
          <label>
            <span>Choisir une image</span>
            <input
              type="file"
              name="singleFile"
              onChange={(e) => {
                updateBloc(e, "image", undefined, input_bloc);
              }}
              style={{ display: `block` }}
            />
          </label>

          <h3>Texte de la balise image</h3>
          <input
            type="text"
            value={input_bloc.alt_image}
            onChange={(e) => {
              updateBloc(e, "alt_image", undefined, input_bloc);
            }}
            style={{ display: `block` }}
          />
        </div>
        <div
          className={s.text}
          style={{
            display: `${input_bloc.show_text ? `block` : `none`}`,
            width: `100%`,
          }}
          draggable={draggable}
        >
          {mounted && (
            <Editor
              toolbar={{
                image: {
                  previewImage: true,
                  uploadCallback: (file: Blob) => {
                    return new Promise((resolve, reject) => {
                      const reader = new FileReader();

                      reader.readAsDataURL(file);
                      reader.onload = async () => {
                        let filename = await UploadService.handleUpload(
                          file,
                          ""
                        );
                        resolve({
                          data: {
                            link:
                              "http://localhost:80/cms_v2/api/uploadfile/" +
                              filename,
                          },
                          link: {
                            url:
                              "http://localhost:80/cms_v2/api/uploadfile/" +
                              filename,
                          },
                        });
                      };
                      reader.onerror = (error) => {
                        reject(error);
                      };
                    });
                  },
                  alt: { present: true, mandatory: false },
                  alignmentEnabled: false,
                  inputAccept:
                    "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                },
                options: [
                  "inline",
                  "fontSize",
                  "textAlign",
                  "list",
                  "blockType",
                  "history",
                  "image",
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
                onContentStateChange(e, input_bloc, index)
              }
              onFocus={() => setFocus(true)}
              defaultContentState={
                input_bloc.text !== "" ? contentState : undefined
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BlocInput;
