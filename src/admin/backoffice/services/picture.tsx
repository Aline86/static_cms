import s from "./style/style.module.css";
import { BASE_URL_SITE } from "./../../../config";
import remove from "./../../../assets/remove.png";
import { useEffect } from "react";

interface CardDatas {
  update: any;
  bloc: any;
  index: number | undefined;
  sub_bloc: any | undefined;
  image_spec: string | undefined;
}

function Picture({ update, bloc, index, sub_bloc, image_spec }: CardDatas) {
  useEffect(() => {}, []);
  return (bloc.image_url !== undefined && bloc.image_url !== "") ||
    (sub_bloc !== undefined && sub_bloc.image_url !== "") ? (
    <div>
      <div className={s.sup_container}>
        <div className="button_remove_container">
          <img
            src={remove}
            alt="suppression box"
            onClick={() => {
              index === undefined
                ? update("", "delete_picture", bloc)
                : update("", "delete_picture", bloc, index);
            }}
          />
        </div>
      </div>
      <div className={s.delete}>
        {image_spec !== undefined ? (
          <img
            src={
              index === undefined
                ? BASE_URL_SITE + "/api/uploadfile/" + image_spec
                : BASE_URL_SITE + "/api/uploadfile/" + image_spec
            }
            alt="miniature"
          />
        ) : (
          <img
            src={
              index === undefined
                ? BASE_URL_SITE + "/api/uploadfile/" + bloc.image_url
                : BASE_URL_SITE + "/api/uploadfile/" + sub_bloc.image_url
            }
            alt="miniature"
          />
        )}
      </div>
    </div>
  ) : (
    ""
  );
}
export default Picture;
