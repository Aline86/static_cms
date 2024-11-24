import { useState } from "react";
import s from "./style.module.css";
import up from "./../../../../../assets/up.png";
import down from "./../../../../../assets/down.png";
import { TextPicture } from "../../../bloc/components/text_picture/class/TextPicture";
import { Carousel } from "../../../bloc/components/carousel/class/Carousel";

interface ShrinkData {
  index: number;
  bloc: TextPicture | Carousel;
  props: any;
  setDragBegin: any;
  updateBlocs: any;
  drag: boolean;
}

function Shrink({
  props,
  bloc,
  index,
  setDragBegin,
  updateBlocs,
  drag,
}: ShrinkData) {
  const [open, setOpen] = useState(true);
  return (
    <div
      className={s.shrink_bloc}
      key={index}
      draggable={drag}
      onDragStart={(e) => e}
      onDragEnter={(e) => e}
      onDragLeave={(e) => e}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={() => setDragBegin(bloc.bloc_number)}
      onDrop={() => updateBlocs(bloc.bloc_number)}
    >
      <div
        className={s.container_up}
        onClick={(e) => {
          setOpen(!open);
        }}
      >
        {bloc.type !== "text_picture" &&
          (!open ? (
            <div className={s.up}>
              <div style={{ textDecoration: "underline" }}>
                {`${"Bloc n° " + index} : `}{" "}
                {bloc.type === "carousel" &&
                bloc instanceof Carousel &&
                bloc.isAutomatique
                  ? "Carousel option 2 (automatique)"
                  : bloc.type === "carousel" &&
                    bloc instanceof Carousel &&
                    !bloc.isAutomatique
                  ? "Carousel option 1 (défilé d'images au clic)"
                  : bloc.type === "picture_group"
                  ? "Groupe d'images"
                  : "Bouton"}
              </div>
              <img src={down} alt="fermer" />
            </div>
          ) : (
            <img src={up} alt="ouvrir" />
          ))}
        {bloc.type === "text_picture" &&
          (!open ? (
            <div className={s.up}>
              <div style={{ textDecoration: "underline" }}>
                {`${"Bloc n° " + index} : `} Bloc texte et / ou images
              </div>
              <img src={down} alt="fermer" />
            </div>
          ) : (
            <img src={up} alt="ouvrir" />
          ))}
      </div>
      {open && props}
    </div>
  );
}

export default Shrink;
