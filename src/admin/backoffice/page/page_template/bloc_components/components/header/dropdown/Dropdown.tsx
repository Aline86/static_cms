import { useEffect, useState } from "react";
import s from "./styles.module.css";
import Header from "../Header";

import remove from "./../../../../../../../../assets/remove.png";
import { BASE_URL_SITE } from "../../../../../../../../config";

interface DropdownInfo {
  input_bloc: Header | undefined;
  updateHeader: any;
}

function DropdownData({ input_bloc, updateHeader }: DropdownInfo) {
  const [picture, isPicture] = useState<number>(0);
  useEffect(() => {
    isPicture(input_bloc?.image_url !== "" ? 1 : 0);
  }, []);
  useEffect(() => {}, [picture]);

  return (
    <div className={s.container}>
      <select
        onChange={(e) => {
          isPicture(Number(e.target.value));
        }}
        className={s.select_box}
        value={picture === 1 ? 1 : 0}
      >
        <option key={0} value={0}>
          Couleur unie
        </option>
        <option key={1} value={1}>
          Image
        </option>
      </select>
      <div className={s.bg}>
        {picture === 1 ? (
          <div className={s.sup_container}>
            <h3>Image de fond : </h3>
            <label>
              <span>Choisir une image</span>
              <input
                type="file"
                onChange={(e) => {
                  updateHeader(
                    e,
                    "image_url",
                    undefined,
                    undefined,
                    input_bloc
                  );
                }}
              />
            </label>

            <div className={s.right}>
              {input_bloc?.image_url !== "" && (
                <div className={s.right_inside}>
                  <img
                    style={{ width: "25px" }}
                    src={remove}
                    alt="suppression box"
                    onClick={() => {
                      updateHeader(
                        "",
                        "delete_picture",
                        undefined,
                        undefined,
                        input_bloc
                      );
                    }}
                  />
                </div>
              )}

              {input_bloc?.image_url !== "" && (
                <div className={s.delete}>
                  <img
                    src={
                      BASE_URL_SITE + "/api/uploadfile/" + input_bloc?.image_url
                    }
                    alt="miniature"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={s.color}>
            <h3 style={{ textDecoration: "underline" }}>
              Couleur de fond du bandeau :
            </h3>
            <input
              type="color"
              className={s.color}
              value={input_bloc?.background_color}
              onChange={(e) => {
                updateHeader(e, "background_color", undefined, undefined);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DropdownData;
