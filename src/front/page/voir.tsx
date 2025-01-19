import { useContext, useEffect, useState } from "react";
import s from "./styles.module.css";
import { useLocation, useParams } from "react-router-dom";
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
import GridVizualisation from "../../admin/frontend/bloc/grid/PictureGroup";

function Front() {
  const [blocs, setBlocs] = useState<
    Array<Carousel | TextPicture | PictureGroup | Button | Video | Parallaxe>
  >([]);
  const { id } = useParams();
  const [toggle, setToggle] = useState(false);
  const [, setResize] = useState(window.innerWidth);
  const [footer] = useState<Footer>(new Footer());
  const [header] = useState<Header>(new Header());
  const location = useLocation();
  const result_mid = window.matchMedia("(max-width: 1200px)");

  const result = window.matchMedia("(max-width: 800px)");
  let page_type = new Page(Number(id));
  const tools = new BlocTools(page_type);
  const { common } = useContext(ColorContext);
  async function asynchronRequestsToPopulateBlocs() {
    setBlocs([]);
    await header.get_bloc();

    let bloc_pages = await tools.getAllBlocsPage();
    bloc_pages !== undefined && setBlocs(bloc_pages);
    await footer.get_bloc();

    setToggle(!toggle);
  }

  const adaptRoot = () => {
    let root = document.getElementById("root");
    if (root !== null && result.matches) {
      root.style.width = "100%";
      root.style.paddingTop = "0px";
      root.style.paddingBottom = "220px";
    } else if (root !== null && result_mid.matches) {
      root.style.width = "100vw";
      root.style.paddingTop = "75px";
      root.style.paddingBottom = "75px";
    } else if (root !== null) {
      root.style.width = "100vw";
      root.style.paddingTop = "100px";
      root.style.paddingBottom = "75px";
    }
  };
  useEffect(() => {
    asynchronRequestsToPopulateBlocs();
  }, [location]);

  const styles = {
    backgroundColor: common !== null ? `${common?.fond}` : "#ffffff",
    "--titles": `${common?.titles}` ? `${common?.titles}` : "black",
    "--button-background-color": `${common?.background_color_buttons}`
      ? `${common?.background_color_buttons}`
      : "#2f6091",
    height: "fit-content",
    minHeight: "100vh",
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

  function updateSize() {
    window.location.reload();
  }
  useEffect(() => {
    if (!result.matches) {
      window.addEventListener("resize", updateSize);
      setResize(window.innerWidth);
    }
  }, [result.matches]);

  return (
    <div className={s.blocs_container} style={styles}>
      <HeaderVizualization
        input_bloc={header}
        toggle={toggle}
        full={true}
        isResponsive={false}
      />
      {blocs.map((value, index) => {
        return value instanceof TextPicture ? (
          <div key={index} className={s.bloc}>
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
        ) : value instanceof Carousel ? (
          <div
            key={index}
            className={s.carousel}
            style={{
              marginBottom: value.is_automatique ? `0px` : `30px`,
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
        ) : value instanceof PictureGroup ? (
          <div key={index} className={s.carousel}>
            {!value.is_grid ? (
              <PictureGroupVizualisation
                input_bloc={value}
                toggle={toggle}
                refresh={false}
                full={true}
                isResponsive={false}
              />
            ) : (
              <GridVizualisation
                input_bloc={value}
                toggle={toggle}
                refresh={false}
                isResponsive={false}
              />
            )}
          </div>
        ) : value instanceof Button ? (
          <div key={index} className={s.carousel}>
            <ButtonVisualization
              input_bloc={value}
              toggle={toggle}
              full={true}
              isResponsive={false}
            />
          </div>
        ) : value instanceof Video ? (
          <div key={index} className={s.video}>
            <VideoVizualisation
              bloc={value}
              full={true}
              isResponsive={false}
              toggle={toggle}
            />
          </div>
        ) : (
          value instanceof Parallaxe && (
            <div key={index} className={s.video}>
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
