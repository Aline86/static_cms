import { useEffect } from "react";

import s from "./style.module.css";
import glissiere from "./img/glissiere.png";
import text_image from "./img/image.png";
import auto from "./img/auto.png";
import couches from "./img/couches.png";
import { TextPicture } from "../../bloc/components/text_picture/class/TextPicture";
import { Carousel } from "../../bloc/components/carousel/class/Carousel";
import { Button } from "../../bloc/components/button/class/Button";
import { PictureGroup } from "../../bloc/components/picture_group/class/PictureGroup";
import Page from "../class/Page";
import { Video } from "../../bloc/components/video/class/Video";

interface BlocData {
  getPage: any;
  handleScroll: any;
  blocs: Array<any>;
  setToDrag: any;
  drag: boolean;
  open: boolean;
  setOpen: any;
  page: Page;
}

function BlocDisplay({
  getPage,
  handleScroll,
  blocs,
  setToDrag,
  drag,
  open,
  setOpen,
  page,
}: BlocData) {
  const addBlocToBDD = async (bloc: any) => {
    await bloc.save_bloc();
    page.get_blocs();
    getPage();
  };

  useEffect(() => {}, []);
  return (
    open && (
      <div className={s.blocs_container_display}>
        <div className={s.header_bloc_choose}>
          <div className={s.container_auto}>
            <img src={text_image} alt="texte image" />
            <input
              type="submit"
              value="Bloc Texte Image"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(new TextPicture(-1, blocs.length + 1, page.id));
                handleScroll();
                setOpen(!open);
              }}
            />
          </div>
          <div className={s.container_auto}>
            <img src={glissiere} alt="slider" />
            <input
              type="submit"
              value="Défilé d'images Option 1"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(new Carousel(page.id, blocs.length + 1));
                handleScroll();
                setOpen(!open);
              }}
            />
          </div>
          <div className={s.container_auto}>
            <img src={auto} alt="carousel automatique" />
            <input
              type="submit"
              value="Défilé d'images Option 2 (automatique)"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(new Carousel(page.id, blocs.length + 1, -1, true));
                handleScroll();
                setOpen(!open);
              }}
            />
          </div>
          <div className={s.container_auto}>
            <img src={text_image} alt="texte image" />
            <input
              type="submit"
              value="Vidéo"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(new Video(page.id, blocs.length + 1));
                handleScroll();
                setOpen(!open);
              }}
            />
          </div>
          <div className={s.container_auto}>
            <div security={s.nothing}></div>
            <input
              type="submit"
              value="Bouton"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(new Button(page.id, blocs.length + 1));
                handleScroll();
                setOpen(!open);
              }}
            />
          </div>
          <div className={s.container_auto}>
            <img src={couches} alt="groupe d'image" />
            <input
              type="submit"
              value="Groupe d'images"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(new PictureGroup(page.id, blocs.length + 1));
                handleScroll();
                setOpen(!open);
              }}
            />
          </div>
          <div className={s.container_auto}>
            <div security={s.nothing}></div>
            <input
              type="submit"
              value="Changer l'ordre des blocks"
              onClick={(e) => {
                e.preventDefault();
                setToDrag(!drag);
                setOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default BlocDisplay;
