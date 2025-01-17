import { useEffect } from "react";
import s from "./style.module.css";

interface TextParams {
  stringTexts: string[];
  headlines: string[];
  textAlign: string[];
  isToggle: boolean;
  read_more: boolean;
  pictures_offset: any[];
  toggle: boolean;
  isResponsive: boolean;
  setIsToggle: any;
  color: string;
}

function InnerHTML({
  stringTexts,
  headlines,
  textAlign,
  isToggle,
  read_more,
  pictures_offset,
  toggle,
  isResponsive,
  setIsToggle,
  color,
}: TextParams) {
  const unstyles = (j: number) => {
    let prev = "";
    let strings: any = "";
    let count = 0;
    stringTexts !== undefined &&
      headlines[j] === "unstyled" &&
      stringTexts[j] !== undefined &&
      Object.values(stringTexts[j]).map((value: any, z: number) => {
        if (prev !== value.value) {
          count = 0;
          if (count === 0) {
            strings += `<span key=${z} className=${value.value}>`;
          }
          if (z > 0) {
            strings += `</span>`;
          }
          strings += value.name;
          prev = value.value;
        } else if (prev === value.value) {
          strings += value.name;
          count++;
        }
      });

    return strings;
  };

  /* return (
                    <div
                      key={z + value.name}
                      style={{ display: "inline" }}
                      className={`${value.value}`}
                    >
                      {value.name}
                    </div>
                  );*/

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
                  {stringText !== undefined &&
                    Object.values(stringText).map((value: any, z: number) => {
                      return value.name;
                    })}
                </li>
              </ul>
            </div>
          ) : ((read_more && isToggle && j >= 0) ||
              (!isToggle && j <= 2) ||
              !read_more) &&
            headlines[j] !== undefined &&
            headlines[j] === "header-two" ? (
            <h2 key={j + headlines[j]}>
              <div
                className="container_data bloc"
                style={{ display: "inline" }}
              >
                {stringText !== undefined &&
                  Object.values(stringText).map((value: any, z: number) => {
                    return (
                      <div
                        key={z + value.name}
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
            ((read_more && ((isToggle && j >= 0) || (!isToggle && j <= 2))) ||
              !read_more) &&
            headlines[j] === "unstyled" && (
              <div key={j + headlines[j]} className={`${textAlign[j]}`}>
                <div className="container_data bloc">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: unstyles(j),
                    }}
                  />
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
export default InnerHTML;
