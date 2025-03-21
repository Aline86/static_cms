import { Suspense, useEffect, useState } from "react";
import s from "./style.module.css";
import { lazy } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Editor = lazy(() =>
  import("react-draft-wysiwyg").then((module) => ({ default: module.Editor }))
);
import { TextPicture } from "../class/TextPicture";
import { RawDraftContentState } from "draft-js";
import { BASE_URL_SITE } from "../../../../../../../../config";
import { UploadService } from "../../../../../../services/uploadService";
import FileUploadWithProgress from "../../../../../../services/FileUploadWithProgress";

function BlocInput({
  input_bloc,
  updateBloc,
  draggable,
  onContentStateChange,
  index,
}: {
  input_bloc: TextPicture;
  draggable: boolean;
  updateBloc: any;
  onContentStateChange: any;
  index: number;
}) {
  const [contentState, setContentState] = useState<RawDraftContentState>();
  const [, setFocus] = useState<boolean>(true);
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

  return (
    <div className={s.bloc} key={input_bloc.bloc_number}>
      <div
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
        draggable={draggable}
      >
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

            <FileUploadWithProgress
              sub_field_name={undefined}
              update={updateBloc}
              text_bouton_telechargement={"Choisir une image"}
              field_name={"image"}
              component={input_bloc}
              index={undefined}
            />
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

          {mounted && (
            <Suspense fallback={<div>Chargement de l'éditeur...</div>}>
              <Editor
                editorStyle={{
                  border: "1px solid darkgray",
                  minHeight: "150px",
                  padding: "10px",
                }}
                toolbarClassName={s.toolbar}
                wrapperClassName={s.wrapper}
                editorClassName={s.editor}
                localization={{ locale: "fr" }}
                contentState={contentState}
                toolbar={{
                  image: {
                    previewImage: true,
                    uploadCallback: (file: Blob) => {
                      return new Promise((resolve, reject) => {
                        const reader = new FileReader();

                        reader.readAsDataURL(file);
                        reader.onload = async () => {
                          let filename = await UploadService.handleUploadImg(
                            file
                          );
                          resolve({
                            data: {
                              link:
                                BASE_URL_SITE + "/api/uploadfile/" + filename,
                            },
                            link: BASE_URL_SITE + "/api/uploadfile/" + filename,
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
                onContentStateChange={(e: any) =>
                  onContentStateChange(e, input_bloc, index)
                }
                onFocus={() => setFocus(true)}
                defaultContentState={contentState}
              />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlocInput;
