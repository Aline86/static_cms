import { useEffect } from "react";
import s from "./style.module.css";
import OptionCss from "../../../../backoffice/bloc/components/text_picture/class/OptionsCss";
import { BASE_URL_SITE } from "../../../../../config";
import { TextPicture } from "../../../../backoffice/bloc/components/text_picture/class/TextPicture";
import { useInView } from "react-intersection-observer";

interface ImageParams {
  bloc: TextPicture;

  css: OptionCss;
}

function Image({ bloc, css }: ImageParams) {
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
              width: `${css.width}%`,
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
