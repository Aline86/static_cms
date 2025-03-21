import { useEffect } from "react";
import s from "./style.module.css";

import { BASE_URL_SITE } from "../../../../../config";

import { useInView } from "react-intersection-observer";
import { TextPicture } from "../../../../backoffice/page/page_template/bloc_components/components/text_picture/class/TextPicture";

interface ImageParams {
  bloc: TextPicture;
}

function Image({ bloc }: ImageParams) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Charge l'image seulement une fois qu'elle est visible
    threshold: 0.1, // Se déclenche quand 10% de l'image est visible
  });

  useEffect(() => {}, []);
  return (
    bloc.image.length > 0 && (
      <div
        className={s.image}
        style={{
          padding: bloc.bloc_column ? "0 0 0 0" : "0 15px 0 15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        ref={ref}
      >
        {inView && (
          <img
            style={{
              width: !bloc.bloc_column ? `100%` : `${bloc.css.width}%`,
              height: `auto`,
            }}
            src={BASE_URL_SITE + "/api/uploadfile/" + bloc.image}
            alt={bloc.alt_image}
          />
        )}
      </div>
    )
  );
}

export default Image;
