import { SetStateAction, useContext, useEffect, useState } from "react";
import s from "./styles.module.css";

import { Link, useParams } from "react-router-dom";

import { RawDraftContentState } from "draft-js";

import { TextPicture } from "../../backoffice/bloc/components/text_picture/class/TextPicture";
import { Carousel } from "../../backoffice/bloc/components/carousel/class/Carousel";
import Footer from "../../backoffice/bloc/components/footer/Footer";
import Header from "../../backoffice/bloc/components/header/Header";
import Page from "../../backoffice/page/class/Page";
import Bloc from "../bloc/text_picture/bloc";
import CarouselVisualization from "../bloc/carousel/Carousel";
import HeaderVizualization from "../bloc/header/header";
import FooterVizualization from "../bloc/footer/footer";
import BlocTools from "../../tools/blocs_tools";
import { PictureGroup } from "../../backoffice/bloc/components/picture_group/class/PictureGroup";
import PictureGroupVizualisation from "../bloc/picture_group/PictureGroup";
import ButtonVisualization from "../bloc/bouton/Button";
import VideoVizualisation from "../bloc/video/video";
import { Button } from "../../backoffice/bloc/components/button/class/Button";
import { Video } from "../../backoffice/bloc/components/video/class/Video";
import ColorContext from "../../../ColorContext";
import { Parallaxe } from "../../backoffice/bloc/components/parallaxe/class/Parallaxe";
import ParallaxeVizualisation from "../bloc/parallaxe/parallaxe";

function Voir() {
  const [blocs, setBlocs] = useState<
    Array<Carousel | TextPicture | PictureGroup | Button | Video | Parallaxe>
  >([]);
  const { id, name } = useParams();
  const [toggle, setToggle] = useState(false);
  const [isReponsive, setResponsive] = useState(false);
  const [footer, setFooter] = useState<Footer>(new Footer());
  const [header, setHeader] = useState<Header>(new Header());
  const [videoLoaded, isVideoLoaded] = useState<boolean>(false);
  const result = window.matchMedia("(max-width: 700px)");
  let page_type = new Page(Number(id));
  const tools = new BlocTools(page_type);
  const { common } = useContext(ColorContext);
  async function asynchronRequestsToPopulateBlocs() {
    await header.get_bloc();

    await footer.get_bloc();

    let bloc_pages = await tools.getAllBlocsPage();
    bloc_pages !== undefined && setBlocs(bloc_pages);
    //isVideoLoaded(false);
    setToggle(!toggle);
  }

  const updateLoaded = (loaded: boolean) => {
    isVideoLoaded(loaded);
  };
  const adaptRoot = () => {
    let root = document.getElementById("root");
    if (root !== null && (isReponsive || result.matches)) {
      root.style.width = "380px";
      root.style.paddingTop = "0px";
      root.style.paddingBottom = "220px";
    } else if (root !== null) {
      root.style.width = "100vw";
      root.style.paddingTop = "130px";
      root.style.paddingBottom = "75px";
    }
  };
  /* useEffect(() => {
    if (
      localStorage.getItem("previous_page_id") !== null &&
      localStorage.getItem("previous_page_id") !== id
    ) {
      localStorage.removeItem("previous_page_id");
      window.location.reload();
      console.log(localStorage.getItem("previous_page_id"));
    }
  }, [id]);*/
  const checkIfVideo = () => {
    const result = blocs.filter((bloc) => bloc.type === "video");
    console.log("result", result);
    if (result.length === 0) {
      isVideoLoaded(true);
    } else if (result.length > 0) {
      isVideoLoaded(false);
    }
  };
  const styles = {
    backgroundColor: common !== null ? `${common?.fond}` : "transparent",
    "--titles": `${common?.titles}` ? `${common?.titles}` : "black",
    "--button-background-color": `${common?.background_color_buttons}`
      ? `${common?.background_color_buttons}`
      : "#2f6091",
    height: "fit-content",
  };
  useEffect(() => {
    adaptRoot();
  }, [isReponsive]);

  useEffect(() => {
    adaptRoot();
    if (blocs.length === 0 || blocs === undefined) {
      asynchronRequestsToPopulateBlocs();
    }
  }, []);
  useEffect(() => {
    checkIfVideo();
  }, [blocs]);
  useEffect(() => {}, [videoLoaded]);

  return (
    <div className={s.blocs_container} style={styles}>
      <HeaderVizualization
        input_bloc={header}
        toggle={toggle}
        full={true}
        isResponsive={isReponsive}
      />
      {!isReponsive && (
        <Link to={{ pathname: `/page/` + id + `/` + name }}>
          <li>
            <div className={s.navigate}>Retour</div>
          </li>
        </Link>
      )}

      <a
        className={s.responsive_mode}
        onClick={() => setResponsive(!isReponsive)}
      >
        Mode responsive
      </a>

      {blocs.map((value, index) => {
        return videoLoaded && value instanceof TextPicture ? (
          <div className={s.bloc}>
            <Bloc
              index={index}
              bloc={value}
              css={value.css}
              num_bloc={index}
              toggle={toggle}
              full={true}
              isResponsive={isReponsive}
            />
          </div>
        ) : videoLoaded && value instanceof Carousel ? (
          <div
            className={s.carousel}
            style={{
              marginBottom: `${
                (isReponsive || result.matches) && value.is_automatique
                  ? "-90px"
                  : "30px"
              }`,
            }}
          >
            <CarouselVisualization
              input_bloc={value}
              toggle={toggle}
              refresh={false}
              full={true}
              isResponsive={isReponsive}
            />
          </div>
        ) : videoLoaded && value instanceof PictureGroup ? (
          <div className={s.carousel}>
            <PictureGroupVizualisation
              input_bloc={value}
              toggle={toggle}
              refresh={false}
              full={true}
              isResponsive={isReponsive}
            />
          </div>
        ) : videoLoaded && value instanceof Button ? (
          <div className={s.carousel}>
            <ButtonVisualization
              input_bloc={value}
              toggle={toggle}
              refresh={false}
              full={true}
              isResponsive={isReponsive}
            />
          </div>
        ) : value instanceof Video ? (
          <div className={s.video}>
            <VideoVizualisation
              bloc={value}
              updateLoaded={updateLoaded}
              full={true}
              isResponsive={isReponsive}
              videoLoaded={videoLoaded}
            />
          </div>
        ) : (
          value instanceof Parallaxe && (
            <div className={s.video}>
              <ParallaxeVizualisation
                bloc={value}
                full={true}
                isResponsive={isReponsive}
              />
            </div>
          )
        );
      })}
      <FooterVizualization
        input_bloc={footer}
        toggle={toggle}
        isResponsive={isReponsive}
        full={true}
      />
    </div>
  );
}

export default Voir;
