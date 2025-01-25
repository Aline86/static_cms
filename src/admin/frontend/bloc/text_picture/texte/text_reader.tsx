import { useEffect, useState } from "react";
import BlockTextParams from "./classes/BlocTextParams";
import { RawDraftContentState } from "draft-js";
import s from "./style.module.css";

interface TextParams {
  contenState: RawDraftContentState;
  read_more: boolean;
  color: string;
  toggle: boolean;
  isResponsive: boolean;
}

function TextReader({
  read_more,
  color,
  toggle,
  contenState,
  isResponsive,
}: TextParams) {
  const [stringTexts, setStringTexts] = useState<any>([]);
  const [headlines, setHeadlines] = useState<Array<string>>([]);
  const [textAlign, setTextAlign] = useState<Array<string>>([]);
  const [isToggle, setIsToggle] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [pictures, setPictures] = useState<Array<any>>([]);
  const [, setEntityMap] = useState([]);
  const [entityMapLength, setEntityMapLength] = useState(0);
  const [pictures_offset, setPictureOffset] = useState<Array<any>>([]);

  /** template items counter */

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
      blocs.map((bloc: any) => {
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
      keys_map.map(({}, k: number) => {
        let i = 0;

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
    let letters_str = "";
    textBlocks !== undefined &&
      Object.entries(textBlocks).map(([, bloc]) => {
        letters_str = retrieveDataFromBlock(bloc);
        arr_string_toshow.push(letters_str);
        letters_str = "";
      });
    setStringTexts(arr_string_toshow);
  };
  const retrieveDataFromBlock = (textBlock: BlockTextParams) => {
    const str_text = textBlock.text;
    let result = "";
    let tagStack: string[] = [];

    // Parcours caractère par caractère
    let count = 0;
    while (count < str_text.length) {
      let letter = str_text[count];

      // Vérifier les balises actives pour ce caractère
      textBlock.inlineStyleRanges?.forEach((text_chunk: any) => {
        const balise = return_style(text_chunk.style); // Identifier la balise pour le style
        let fontS = "";
        if (!tagStack.includes(balise)) {
          if (balise.includes("fontsize") && count === text_chunk.offset) {
            console.log("inside");
            let font = balise.split("-");
            fontS = "font-size:" + font[1] + "px!important;";
            result += "<div style=" + fontS + ">";
            tagStack.push("fontsize");
          }
        }
        // Si le caractère est dans la plage de la balise (si le style s'applique ici)
        if (
          count >= text_chunk.offset &&
          count < text_chunk.offset + text_chunk.length
        ) {
          // Ouvrir la balise si elle n'a pas encore été ouverte
          if (!tagStack.includes(balise)) {
            if (balise === "bold") {
              result += "<strong style='font-size: inherit;'>";
              tagStack.push("bold");
            } else if (balise === "italic") {
              result += "<i style='font-size: inherit;'>";
              tagStack.push("italic");
            } else if (balise === "underline") {
              result += "<u style='font-size: inherit;'>";
              tagStack.push("underline");
            }
          }
        }
      });

      // Ajouter le caractère au texte
      result += letter;

      // Vérifier si nous sommes à la fin de la plage de la balise pour la fermer
      textBlock.inlineStyleRanges?.forEach((text_chunk: any) => {
        const balise = return_style(text_chunk.style);

        // Si on arrive à la fin de la plage de la balise, on la ferme
        if (count === text_chunk.offset + text_chunk.length - 1) {
          if (balise === "bold" && tagStack.includes("bold")) {
            result += "</strong>";
            tagStack = tagStack.filter((tag) => tag !== "bold");
          } else if (balise === "italic" && tagStack.includes("italic")) {
            result += "</i>";
            tagStack = tagStack.filter((tag) => tag !== "italic");
          } else if (balise === "underline" && tagStack.includes("underline")) {
            result += "</u>";
            tagStack = tagStack.filter((tag) => tag !== "underline");
          } else if (balise.includes("fontsize")) {
            result += "</div>";
            tagStack.push("fontsize");
          }
        }
      });

      // Avancer au caractère suivant
      count++;
    }

    // Après le passage du texte, fermer toutes les balises restantes
    while (tagStack.length > 0) {
      const tag = tagStack.pop();
      if (tag === "bold") {
        result += "</strong>";
      } else if (tag === "italic") {
        result += "</i>";
      } else if (tag === "underline") {
        result += "</u>";
      } else if (tag === "fontsize") {
        result += "</div>";
      }
    }

    return result;
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
      case "fontsize-18":
        return "fontsize-18";
      case "fontsize-16":
        return "fontsize-16";
      case "fontsize-72":
        return "fontsize-72";
      case "fontsize-24":
        return "fontsize-24";
      case "fontsize-30":
        return "fontsize-30";
      case "fontsize-36":
        return "fontsize-36";
      case "fontsize-48":
        return "fontsize-48";
      case "fontsize-60":
        return "fontsize-60";
      case "fontsize-96":
        return "fontsize-96";
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
  useEffect(() => {}, [toggle, stringTexts]);

  return (
    <div
      className="container"
      style={{
        backgroundColor: color === `#ffffff` ? "transparent" : `${color}`,
        padding: "15px",
      }}
    >
      {stringTexts !== undefined &&
        stringTexts.map((stringText: any, j: number) => {
          return ((headlines[j] !== undefined &&
            read_more &&
            isToggle &&
            j >= 0) ||
            (!isToggle && j <= 2) ||
            !read_more) &&
            headlines[j] === "atomic" &&
            pictures_offset !== undefined ? (
            pictures_offset[j] !== undefined &&
            pictures_offset[j].data !== undefined &&
            pictures_offset[j].data.src !== undefined ? (
              <div
                key={j + pictures_offset[j].data.src}
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
                  key={j + pictures_offset[j].data}
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
              (!isToggle && j <= 2) ||
              !read_more) &&
            headlines[j] !== undefined &&
            headlines[j] === "unordered-list-item" ? (
            <div
              key={j + headlines[j]}
              className="container_data bloc"
              style={{ display: "inline" }}
            >
              <ul>
                <li key={j} className={`${textAlign[j]}`}>
                  {stringText !== undefined && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: stringText,
                      }}
                    />
                  )}
                </li>
              </ul>
            </div>
          ) : ((read_more && isToggle && j >= 0) ||
              (!isToggle && j <= 2) ||
              !read_more) &&
            headlines[j] !== undefined &&
            headlines[j] === "header-two" ? (
            <h2 key={j + headlines[j]}>
              {stringText !== undefined && (
                <h2
                  dangerouslySetInnerHTML={{
                    __html: stringText,
                  }}
                />
              )}
            </h2>
          ) : (
            ((read_more && ((isToggle && j >= 0) || (!isToggle && j <= 2))) ||
              !read_more) &&
            headlines[j] === "unstyled" && (
              <div key={j + headlines[j]} className={`${textAlign[j]}`}>
                <div className="container_data bloc">
                  {stringText !== undefined && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: stringText,
                      }}
                    />
                  )}
                </div>
              </div>
            )
          );
        })}

      <div className={s.button} key={-1}>
        {read_more && stringTexts.length >= 2 ? (
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
