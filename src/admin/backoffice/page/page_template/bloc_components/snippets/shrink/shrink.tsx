import { useState } from "react";
import s from "./style.module.css";
import up from "./../../../../../../../assets/up.png";
import down from "./../../../../../../../assets/down.png";
import { Carousel } from "../../../../../bloc/components/carousel/class/Carousel";

interface ShrinkData {
  index: number;
  bloc: any;
  props: any;
  isOpen: boolean;
}

function Shrink({ props, bloc, index, isOpen }: ShrinkData) {
  const [open, setOpen] = useState(isOpen);
  return (
    <div className={s.shrink_bloc} key={index}>
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
                {index !== -1 && `${"Bloc n° " + index} : `}{" "}
                {bloc.type === "carousel" &&
                bloc instanceof Carousel &&
                bloc.is_automatique
                  ? "Carousel option 2 (automatique)"
                  : bloc.type === "carousel" &&
                    bloc instanceof Carousel &&
                    !bloc.is_automatique
                  ? "Carousel option 1 (défilé d'images au clic)"
                  : bloc.type === "picture_group"
                  ? "Groupe d'images"
                  : bloc.type === "button"
                  ? "Bouton Image"
                  : bloc.type === "video"
                  ? "Vidéo"
                  : bloc.type === "parallaxe"
                  ? "Parallaxe"
                  : bloc.type === "header"
                  ? "Bloc en tête"
                  : bloc.type === "footer" && "Bloc bas de page"}
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
