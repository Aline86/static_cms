import { useContext, useEffect, useState } from "react";
import s from "./styles.module.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { TextPicture } from "../../admin/backoffice/bloc/components/text_picture/class/TextPicture";
import { Carousel } from "../../admin/backoffice/bloc/components/carousel/class/Carousel";
import Footer from "../../admin/backoffice/bloc/components/footer/Footer";
import Header from "../../admin/backoffice/bloc/components/header/Header";
import Page from "../../admin/backoffice/page/class/Page";
import Bloc from "../../admin/frontend/bloc/text_picture/bloc";
import CarouselVisualization from "../../admin/frontend/bloc/carousel/Carousel";
import HeaderVizualization from "../../front/header/header";
import FooterVizualization from "../../admin/frontend/bloc/footer/footer";
import BlocTools from "../../admin/tools/blocs_tools";
import { PictureGroup } from "../../admin/backoffice/bloc/components/picture_group/class/PictureGroup";
import PictureGroupVizualisation from "../../admin/frontend/bloc/picture_group/PictureGroup";
import ButtonVisualization from "../../admin/frontend/bloc/bouton/Button";
import VideoVizualisation from "../../admin/frontend/bloc/video/video";
import { Button } from "../../admin/backoffice/bloc/components/button/class/Button";
import { Video } from "../../admin/backoffice/bloc/components/video/class/Video";
import ColorContext from "../../ColorContext";
import { Parallaxe } from "../../admin/backoffice/bloc/components/parallaxe/class/Parallaxe";
import ParallaxeVizualisation from "../../admin/frontend/bloc/parallaxe/parallaxe";

function Front() {
  const [blocs, setBlocs] = useState<
    Array<Carousel | TextPicture | PictureGroup | Button | Video | Parallaxe>
  >([]);
  const { id, name } = useParams();
  const [toggle, setToggle] = useState(false);

  const [footer, setFooter] = useState<Footer>(new Footer());
  const [header, setHeader] = useState<Header>(new Header());
  const location = useLocation();
  const [videoLoaded, isVideoLoaded] = useState<boolean>(false);
  const result = window.matchMedia("(max-width: 700px)");
  let page_type = new Page(Number(id));
  const tools = new BlocTools(page_type);
  const { common } = useContext(ColorContext);
  async function asynchronRequestsToPopulateBlocs() {
    await header.get_bloc();

    let bloc_pages = await tools.getAllBlocsPage();
    bloc_pages !== undefined && setBlocs(bloc_pages);
    await footer.get_bloc();
    //isVideoLoaded(false);
    setToggle(!toggle);
  }

  const updateLoaded = (loaded: boolean) => {
    isVideoLoaded(loaded);
  };
  const adaptRoot = () => {
    let root = document.getElementById("root");
    if (root !== null && result.matches) {
      root.style.width = "100%";
      root.style.paddingTop = "0px";
      root.style.paddingBottom = "220px";
    } else if (root !== null) {
      root.style.width = "100vw";
      root.style.paddingTop = "130px";
      root.style.paddingBottom = "75px";
    }
  };
  useEffect(() => {
    setBlocs([]);

    asynchronRequestsToPopulateBlocs();
  }, [location]);
  const checkIfVideo = () => {
    const result = blocs.filter((bloc) => bloc.type === "video");

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
  }, [result.matches]);

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
        isResponsive={false}
      />
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
              isResponsive={false}
            />
          </div>
        ) : videoLoaded && value instanceof Carousel ? (
          <div
            className={s.carousel}
            style={{
              marginBottom: `${
                (false || result.matches) && value.is_automatique
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
              isResponsive={false}
            />
          </div>
        ) : videoLoaded && value instanceof PictureGroup ? (
          <div className={s.carousel}>
            <PictureGroupVizualisation
              input_bloc={value}
              toggle={toggle}
              refresh={false}
              full={true}
              isResponsive={false}
            />
          </div>
        ) : videoLoaded && value instanceof Button ? (
          <div className={s.carousel}>
            <ButtonVisualization
              input_bloc={value}
              toggle={toggle}
              refresh={false}
              full={true}
              isResponsive={false}
            />
          </div>
        ) : value instanceof Video ? (
          <div className={s.video}>
            <VideoVizualisation
              bloc={value}
              updateLoaded={updateLoaded}
              full={true}
              isResponsive={false}
              videoLoaded={videoLoaded}
            />
          </div>
        ) : (
          videoLoaded &&
          value instanceof Parallaxe && (
            <div className={s.video}>
              <ParallaxeVizualisation
                bloc={value}
                full={true}
                isResponsive={false}
              />
            </div>
          )
        );
      })}
      <FooterVizualization
        input_bloc={footer}
        toggle={toggle}
        isResponsive={false}
        full={true}
      />
    </div>
  );
}

export default Front;
