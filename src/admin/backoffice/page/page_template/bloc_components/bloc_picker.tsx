import { useEffect } from "react";

import s from "./../style.module.css";
import glissiere from "./../img/glissiere.png";
import text_image from "./../img/image.png";
import auto from "./../img/auto.png";
import couches from "./../img/couches.png";
import video from "./../img/montage.png";
import cover from "./../img/cover.png";
import curseur from "./../img/curseur.png";
import parallaxe from "./../img/picture.png";
import miniatures from "./../img/miniatures.png";
import link from "./../img/link.png";
import Page from "../../class/Page";
import { TextPicture } from "./components/text_picture/class/TextPicture";
import { Carousel } from "./components/carousel/class/Carousel";
import { Video } from "./components/video/class/Video";
import { Parallaxe } from "./components/parallaxe/class/Parallaxe";
import { Button } from "./components/button/class/Button";
import { Screen } from "./components/screen/class/Screen";
import { PictureGroup } from "./components/picture_group/class/PictureGroup";

interface BlocData {
  getPage: any;
  blocs: Array<any>;
  open: boolean;
  setOpen: any;
  page: Page;
}

function BlocDisplay({ getPage, blocs, open, setOpen, page }: BlocData) {
  const addBlocToBDD = async (bloc: any) => {
    await bloc.save_bloc();

    await getPage(true);
  };

  useEffect(() => {}, []);
  return (
    <div className={s.to_append}>
      <div
        className={
          open ? s.blocs_container_display : s.blocs_container_display_none
        }
      >
        <div className={s.close} onClick={() => setOpen(!open)}>
          X
        </div>
        <div className={s.header_bloc_choose}>
          <div className={s.container_auto}>
            <img src={text_image} alt="texte image" />
            <input
              type="submit"
              value="Bloc Texte Image"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(new TextPicture(-1, blocs.length + 1, page.id));

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
                addBlocToBDD(
                  new Carousel(page.id, blocs.length + 1, -1, "auto")
                );

                setOpen(!open);
              }}
            />
          </div>
          <div className={s.container_auto}>
            <img src={curseur} alt="carousel miniatures" />
            <input
              type="submit"
              value="Défilé d'images Option 3 (miniatures)"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(
                  new Carousel(page.id, blocs.length + 1, -1, "miniatures")
                );

                setOpen(!open);
              }}
            />
          </div>
          <div className={s.container_auto}>
            <img src={video} alt="Vidéo" />
            <input
              type="submit"
              value="Vidéo"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(new Video(page.id, blocs.length + 1));

                setOpen(!open);
              }}
            />
          </div>
          <div className={s.container_auto}>
            <img src={parallaxe} alt="parallaxe" />
            <input
              type="submit"
              value="Parallaxe"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(new Parallaxe(page.id, blocs.length + 1));

                setOpen(!open);
              }}
            />
          </div>
          <div className={s.container_auto}>
            <img src={link} alt="Image plus lien" />
            <input
              type="submit"
              value="Bouton image"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(new Button(page.id, blocs.length + 1));

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
                addBlocToBDD(
                  new PictureGroup(page.id, blocs.length + 1, -1, false)
                );

                setOpen(!open);
              }}
            />
          </div>
          <div className={s.container_auto}>
            <img src={miniatures} alt="grille d'image" />
            <input
              type="submit"
              value="Grille d'images"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(
                  new PictureGroup(page.id, blocs.length + 1, -1, true)
                );

                setOpen(!open);
              }}
            />
          </div>
          <div className={s.container_auto}>
            <img src={cover} alt="Image de couverture" />
            <input
              type="submit"
              value="Image de couverture"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(new Screen(page.id, blocs.length + 1, -1, true));

                setOpen(!open);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlocDisplay;
