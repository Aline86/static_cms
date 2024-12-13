import { stateToHTML } from "draft-js-export-html";

import { useEffect, useState } from "react";

import s from "./style.module.css";
import BlockTextParams from "./classes/BlocTextParams";
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RawDraftContentState,
  RichUtils,
} from "draft-js";
import { TextPicture } from "../../../../backoffice/bloc/components/text_picture/class/TextPicture";

interface TextParams {
  index: number;
  bloc_input: TextPicture;
  contenState: ContentState | undefined;
  setContentState: any;
  read_more: boolean;
  color: string;
  toggle: boolean;
  onContentStateChange: any | undefined;
  isResponsive: boolean;
}

function TextReader({
  index,
  bloc_input,

  read_more,
  color,
  toggle,
  contenState,
  setContentState,
  onContentStateChange,
  isResponsive,
}: TextParams) {
  const [newContentState, setNewContentState] = useState<ContentState>();
  const [headlines, setHeadlines] = useState<Array<string>>([]);

  const [html, setHTML] = useState<any>();
  const [editorState, setEditorState] = useState<EditorState | undefined>();
  const [pictures, setPictures] = useState<Array<any>>([]);
  const [entityMap, setEntityMap] = useState([]);
  const [entityMapLength, setEntityMapLength] = useState(0);
  const [textData, setTextData] = useState<ContentState | undefined>(
    contenState
  );
  const [pictures_offset, setPictureOffset] = useState<Array<any>>([]);
  const updateConvertToText = () => {
    if (textData !== undefined) {
      setHeadlines([]);

      let head: string[] = [];

      let picture_data_offset: any = {};
      let i: number = 0;
      if (contenState !== undefined) {
        let blocs = convertToRaw(textData).blocks;
        blocs.map((bloc: any) => {
          /** Arrangement des images en fonction de si elles sont présentes dans l'éditeur donc dans entityRange */
          if (bloc.type === "atomic" && pictures[0] !== undefined) {
            head.push(bloc.type);

            picture_data_offset[bloc.entityRanges[0].key] = [];

            picture_data_offset[bloc.entityRanges[0].key].push(pictures[0][i]);

            i++;
          } else {
            entityStyleFn(bloc);
          }
        });

        Object.keys(picture_data_offset).length > 0 &&
          setIndexPictureData(picture_data_offset);
      }
    }
  };

  const entityStyleFn = (entity: any) => {
    contenState !== undefined &&
      contenState.createEntity(entity.type, entity.mutability, entity.data);
    setNewContentState(contenState);
  };
  const convertToHTML = () => {
    if (editorState !== undefined) {
      const contentState = editorState.getCurrentContent();

      // Define custom entityStyleFn to preserve custom attributes
      const entityStyleFn = (entity: any) => {
        const entityType = entity.type;
        const entityData = entity.data;

        return {
          element: entityType,
          className: "mention",
          attributes: {
            style: entityData, // Preserve custom data-attribute
          },
        };

        return {};
      };
      contenState !== undefined &&
        convertToRaw(contenState).blocks.map((bloc) => {
          return entityStyleFn(bloc);
        });
      const htmlContent = stateToHTML(contentState);
      return htmlContent;
      // Convert ContentState to HTML
    }
  };
  const setIndexPictureData = (picture_data_: any) => {
    if (contenState !== undefined) {
      let picture_data_offset: any = {};
      let picture_data_offset_final: any = {};
      Object.entries(picture_data_).map(([key, picture]) => {
        picture_data_offset[key] = [];

        picture_data_offset[key] = picture;
      });

      let values: Array<any> = Object.values(picture_data_offset);
      let keys_map: any = Object.keys(picture_data_offset);
      let bef = convertToRaw(contenState);
      let values_map: any = Object.values(bef.entityMap);

      values_map.length > 0 &&
        keys_map.map((key_map: string | number, k: number) => {
          let i = 0;
          const key_data = key_map;
          const str = String(key_data);
          headlines.map((head: any, index: number) => {
            if (head === "atomic") {
              if (
                Array.isArray(values[i]) &&
                k === i &&
                values_map[i] !== undefined
              ) {
                picture_data_offset_final[index] = [];
                picture_data_offset_final[index] = values_map[i];
              }
              i++;
            }
          });
        });
      Object.entries(bef.entityMap).map(([key_map_key]) => {
        if (picture_data_offset[key_map_key] === undefined) {
          delete bef.entityMap[key_map_key];
        }
        setNewContentState(convertFromRaw(bef));
      });

      values_map.length > 0 &&
        onContentStateChange !== undefined &&
        typeof onContentStateChange === "function" &&
        onContentStateChange(contenState, bloc_input, index);

      console.log("values_map", values_map);

      Object.keys(picture_data_offset_final).length > 0 &&
        setNewContentState(convertFromRaw(bef));
    }
  };
  const getPictures = (pictures_data: any) => {
    if (pictures_data !== undefined) {
      setPictures([pictures_data]);
      setEntityMapLength(pictures_data.length);
      setEntityMap(pictures_data);
    }
  };
  useEffect(() => {
    getPictures(contenState);

    updateConvertToText();
    convertToHTML();
  }, []);
  useEffect(() => {
    newContentState !== undefined && setHTML(stateToHTML(newContentState));
  }, [pictures]);

  useEffect(() => {
    getPictures(contenState);
    console.log("content", contenState);
    updateConvertToText();
    newContentState !== undefined && setHTML(stateToHTML(newContentState));
  }, [bloc_input.text]);
  return (
    <div
      id="reader"
      className="container"
      style={{
        backgroundColor: color === `#ffffff` ? "transparent" : `${color}`,
        padding: "10px",
      }}
    >
      {html !== undefined && (
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginTop: "20px",
          }}
        />
      )}

      <div className={s.button}></div>
    </div>
  );
}

export default TextReader;
