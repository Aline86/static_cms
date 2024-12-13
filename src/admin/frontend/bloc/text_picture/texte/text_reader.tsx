import { useEffect, useState } from "react";

import s from "./style.module.css";
import BlockTextParams from "./classes/BlocTextParams";
import { RawDraftContentState } from "draft-js";
import { TextPicture } from "../../../../backoffice/bloc/components/text_picture/class/TextPicture";
import JSanimationH2 from "../../snippets/js_animation_h2";

interface TextParams {
  index: number;
  bloc_input: TextPicture;
  contenState: RawDraftContentState;
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
  const [stringTexts, setStringTexts] = useState<any>([]);
  const [headlines, setHeadlines] = useState<Array<string>>([]);
  const [textAlign, setTextAlign] = useState<Array<string>>([]);
  const [isToggle, setIsToggle] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [pictures, setPictures] = useState<Array<any>>([]);
  const [entityMap, setEntityMap] = useState([]);
  const [entityMapLength, setEntityMapLength] = useState(0);
  const [pictures_offset, setPictureOffset] = useState<Array<any>>([]);
  const updateConvertToText = (blocs: any) => {
    const data_to_show: BlockTextParams[] = [];
    if (blocs !== undefined && blocs.length > 0) {
      setHeadlines([]);
      setAlignData([]);

      let head: string[] = [];
      let alignText: string[] = [];
      let ref: object = { "text-align": "left" };
      let picture_data: number[] = [];
      let picture_data_offset: any = {};
      let i: number = 0;
      blocs.map((bloc: any, index: number) => {
        /** Arrangement des images en fonction de si elles sont présentes dans l'éditeur donc dans entityRange */
        if (bloc.type === "atomic" && pictures[0] !== undefined) {
          head.push(bloc.type);

          picture_data_offset[bloc.entityRanges[0].key] = [];

          picture_data_offset[bloc.entityRanges[0].key].push(pictures[0][i]);

          i++;
        } else if (bloc.type !== "atomic") {
          head.push(bloc.type);
        }
        const setDefaultIfNeeded =
          Object.keys(bloc.data).length > 0 ? bloc.data : ref;
        alignText.push(setDefaultIfNeeded);
        const blocRef = new BlockTextParams(
          bloc.key,
          bloc.text,
          bloc.type,
          setDefaultIfNeeded
        );

        bloc.inlineStyleRanges.length > 0 &&
          bloc.inlineStyleRanges.map((style: any) => {
            blocRef.setStyleBlock(style);
          });
        bloc.entityRanges.length > 0 &&
          bloc.entityRanges.map((style: any) => {
            blocRef.setRange(style);
            picture_data.push(style.key);
          });

        data_to_show.push(blocRef);
      });

      Object.keys(picture_data_offset).length > 0 &&
        setIndexPictureData(picture_data_offset);
      setHeadlines(head);
      setAlignData(alignText);
      beginToSetToClassData(data_to_show);
    }
  };
  const setIndexPictureData = (picture_data_: any) => {
    console.log("picture_data_", picture_data_);
    let picture_data_offset: any = {};
    let picture_data_offset_final: any = {};
    Object.entries(picture_data_).map(([key, picture]) => {
      picture_data_offset[key] = [];

      picture_data_offset[key] = picture;
    });

    let values: Array<any> = Object.values(picture_data_offset);
    let keys_map: any = Object.keys(picture_data_offset);

    let values_map: any = Object.values(contenState.entityMap);

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
    Object.entries(contenState.entityMap).map(([key_map_key]) => {
      if (picture_data_offset[key_map_key] === undefined) {
        delete contenState.entityMap[key_map_key];
      }
    });
    if (refresh === 2) {
      setRefresh(1);
    } else if (refresh === 1) {
      setRefresh(0);
    } else {
      setRefresh(2);
    }

    values_map.length > 0 &&
      onContentStateChange !== undefined &&
      typeof onContentStateChange === "function" &&
      onContentStateChange(contenState, bloc_input, index);

    console.log("values_map", values_map);

    Object.keys(picture_data_offset_final).length > 0 &&
      setPictureOffset(picture_data_offset_final);
  };

  const setAlignData = (alignText: any) => {
    let aligns: Array<any> = [];
    Object.values(alignText).map((value: any) => {
      if (value.hasOwnProperty("text-align")) {
        var val = value["text-align"];
        aligns.push(val);
      }
    });
    setTextAlign(aligns);
  };
  const beginToSetToClassData = (textBlocks: Array<BlockTextParams>) => {
    let arr_string_toshow: any = [];
    let letters_str = [];
    textBlocks !== undefined &&
      Object.entries(textBlocks).map(([key, bloc], i) => {
        letters_str = retrieveDataFromBlock(bloc);
        arr_string_toshow.push(letters_str);
        letters_str = [];
      });
    setStringTexts(arr_string_toshow);
  };
  const retrieveDataFromBlock = (textBlock: BlockTextParams) => {
    const t: number = textBlock.text.length;
    const str_text = textBlock.text;
    let count = 0;
    let letter: string;
    let letters_array: any = {};
    while (count < t) {
      letter = str_text[count];
      if (
        textBlock.inlineStyleRanges !== undefined &&
        textBlock.inlineStyleRanges.length > 0
      ) {
        textBlock.inlineStyleRanges.map((text_chunk: any) => {
          if (
            count >= text_chunk.offset &&
            count < text_chunk.offset + text_chunk.length
          ) {
            const chunk = textBlock.text.slice(
              text_chunk.offset,
              parseInt(text_chunk.offset + text_chunk.length)
            );
            if (chunk.includes(letter) && letters_array[count] === undefined) {
              letters_array[count] = [];
              letters_array[count].push(return_style(text_chunk.style));
            } else if (
              letters_array[count] !== undefined &&
              chunk.includes(letter)
            ) {
              letters_array[count].push(return_style(text_chunk.style));
            }
          }
        });
      }
      count++;
    }
    count = 0;
    let textStrings: any = {};
    while (count < t) {
      let name_letter: string = str_text[count];
      if (letters_array[count] !== undefined) {
        textStrings[count] = {
          name: name_letter,
          value: [],
        };
        if (name_letter === " ") {
          textStrings[count].value = letters_array[count].join(" ");
          textStrings[count].value += " no-class-white-space";
        } else {
          textStrings[count].value = letters_array[count].join(" ");
        }
      } else {
        textStrings[count] = {
          name: name_letter,
          value: [],
        };

        if (name_letter === " ") {
          textStrings[count] = {
            name: name_letter,
            value: [],
          };
          textStrings[count].value = "no-class-white-space";
        } else {
          textStrings[count].value = "no-class";
        }
      }
      count++;
    }

    return textStrings;
  };
  const return_style = (field: string): string => {
    switch (field) {
      case "BOLD":
        return "bold";
      case "UNDERLINE":
        return "underline";
      case "ITALIC":
        return "italic";
      case "fontsize-10":
        return "fontsize-10";
      case "fontsize-8":
        return "fontsize-8";
      case "fontsize-9":
        return "fontsize-9";
      case "fontsize-11":
        return "fontsize-11";
      case "fontsize-12":
        return "fontsize-12";
      case "fontsize-14":
        return "fontsize-14";
      case "fontsize-24":
        return "fontsize-24";
      case "fontsize-30":
        return "fontsize-30";
      case "fontsize-18":
        return "fontsize-18";
      case "fontsize-16":
        return "fontsize-16";
      case "undefined":
        return "no-class";
      default:
        return "no-class";
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
    setPictureOffset([]);
    setPictures([]);
    getPictures(contenState.entityMap);

    updateConvertToText(contenState.blocks);
  }, [contenState, refresh === 2, entityMapLength]);
  useEffect(() => {
    //JSanimationH2(".container_data", "bloc_data");
  }, [toggle, stringTexts]);

  useEffect(() => {
    if (typeof onContentStateChange !== "function") {
      getPictures(contenState.entityMap);

      updateConvertToText(contenState.blocks);
    }
  }, []);

  return (
    <div
      className="container"
      style={{
        backgroundColor: color === `#ffffff` ? "transparent" : `${color}`,
        padding: "10px",
      }}
    >
      {stringTexts !== undefined &&
        stringTexts.map((stringText: any, j: number) => {
          return ((headlines[j] !== undefined &&
            read_more &&
            isToggle &&
            j >= 0) ||
            (!isToggle && j <= 1) ||
            !read_more) &&
            headlines[j] === "atomic" &&
            pictures_offset !== undefined ? (
            pictures_offset[j] !== undefined &&
            pictures_offset[j].data !== undefined &&
            pictures_offset[j].data.src !== undefined ? (
              <div
                key={j}
                className="container_data bloc"
                style={{
                  display: "inline",
                  textAlign: "center",
                }}
              >
                <img
                  style={{
                    maxWidth: "100%",
                    objectFit: "contain",

                    margin: "0 auto",
                    width: `${pictures_offset[j].data.width}`,
                    height: isResponsive
                      ? `auto`
                      : `${pictures_offset[j].data.height}`,
                  }}
                  src={pictures_offset[j].data.src}
                  alt=""
                />
              </div>
            ) : (
              pictures_offset[j] !== undefined &&
              pictures_offset[j].data !== undefined &&
              pictures_offset[j].data.src === undefined && (
                <div
                  key={j}
                  className="container_data bloc"
                  style={{
                    display: "inline",
                    textAlign: "center",
                  }}
                >
                  <a href={pictures_offset[j].data}>
                    {pictures_offset[j].data}
                  </a>
                </div>
              )
            )
          ) : ((read_more && isToggle && j >= 0) ||
              (!isToggle && j <= 1) ||
              !read_more) &&
            headlines[j] !== undefined &&
            headlines[j] === "unordered-list-item" ? (
            <div
              key={j}
              className="container_data bloc"
              style={{ display: "inline" }}
            >
              <ul>
                <li key={j} className={`${textAlign[j]}`}>
                  {stringText !== undefined &&
                    Object.values(stringText).map((value: any, i: number) => {
                      return (
                        <>
                          <div
                            key={i}
                            style={{ display: "inline" }}
                            className={`${value.value}`}
                          >
                            {value.name}
                          </div>
                        </>
                      );
                    })}
                </li>
              </ul>
            </div>
          ) : ((read_more && isToggle && j >= 0) ||
              (!isToggle && j <= 1) ||
              !read_more) &&
            headlines[j] !== undefined &&
            headlines[j] === "header-two" ? (
            <h2 key={j}>
              <div
                className="container_data bloc"
                style={{ display: "inline" }}
              >
                {stringText !== undefined &&
                  Object.values(stringText).map((value: any, i: number) => {
                    return (
                      <div
                        key={i}
                        style={{ display: "inline" }}
                        className={`${value.value}`}
                      >
                        {value.name}
                      </div>
                    );
                  })}
              </div>
            </h2>
          ) : (
            ((read_more && ((isToggle && j >= 0) || (!isToggle && j <= 1))) ||
              !read_more) &&
            headlines[j] !== "atomic" && (
              <div key={j} className={`${textAlign[j]}`}>
                <div
                  key={j}
                  className="container_data bloc"
                  style={{ display: "inline" }}
                >
                  {stringText !== undefined &&
                    Object.values(stringText).map((value: any, i: number) => {
                      return (
                        <div
                          key={i}
                          style={{ display: "inline" }}
                          className={`${value.value}`}
                        >
                          {value.name}
                        </div>
                      );
                    })}
                </div>
              </div>
            )
          );
        })}
      <div className={s.button}>
        {read_more && stringTexts.length >= 1 ? (
          <button
            onClick={() => setIsToggle(!isToggle)}
            className={s.show_more}
            style={{
              border: "1px solid gray",
              width: "200px",
              height: "45px",
              borderRadius: "5px",
            }}
          >
            {isToggle ? "Lire Moins" : "Lire plus"}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default TextReader;
