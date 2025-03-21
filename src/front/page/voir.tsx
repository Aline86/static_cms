import { lazy, useContext, useEffect, useState } from "react";
import s from "./styles.module.css";
import { useLocation, useParams } from "react-router-dom";

import Page from "../../admin/backoffice/page/class/Page";
import Bloc from "../../admin/frontend/bloc/text_picture/bloc";

import HeaderVizualization from "../../front/header/header";
import FooterVizualization from "../../admin/frontend/bloc/footer/footer";

import PictureGroupVizualisation from "../../admin/frontend/bloc/picture_group/PictureGroup";
import ButtonVisualization from "../../admin/frontend/bloc/bouton/Button";

import ColorContext from "../../ColorContext";

import ParallaxeVizualisation from "../../admin/frontend/bloc/parallaxe/parallaxe";
import GridVizualisation from "../../admin/frontend/bloc/grid/PictureGroup";
import ScreenVizualisation from "../../admin/frontend/bloc/screen/screen";

import { Carousel } from "../../admin/backoffice/page/page_template/bloc_components/components/carousel/class/Carousel";
import { TextPicture } from "../../admin/backoffice/page/page_template/bloc_components/components/text_picture/class/TextPicture";
import { PictureGroup } from "../../admin/backoffice/page/page_template/bloc_components/components/picture_group/class/PictureGroup";
import { Button } from "../../admin/backoffice/page/page_template/bloc_components/components/button/class/Button";
import { Video } from "../../admin/backoffice/page/page_template/bloc_components/components/video/class/Video";
import { Screen } from "../../admin/backoffice/page/page_template/bloc_components/components/screen/class/Screen";
import { Parallaxe } from "../../admin/backoffice/page/page_template/bloc_components/components/parallaxe/class/Parallaxe";
import Footer from "../../admin/backoffice/page/page_template/bloc_components/components/footer/Footer";
import Header from "../../admin/backoffice/page/page_template/bloc_components/components/header/Header";
import BlocTools from "../../admin/frontend/page/tools/blocs_tools";
import VideoVizualisation from "../../admin/frontend/bloc/video/video";

const CarouselVisualization = lazy(
  () => import("../../admin/frontend/bloc/carousel/Carousel")
);

const MiniaturesVisualization = lazy(
  () => import("../../admin/frontend/bloc/miniatures/Miniatures")
);

function Front() {
  const [blocs, setBlocs] = useState<
    Array<
      | Carousel
      | TextPicture
      | PictureGroup
      | Button
      | Video
      | Parallaxe
      | Screen
    >
  >([]);
  const { id } = useParams();
  const [toggle, setToggle] = useState(false);
  const [footer] = useState<Footer>(new Footer());
  const [header] = useState<Header>(new Header());
  const location = useLocation();
  const result_mid = window.matchMedia("(max-width: 1200px)");
  const result = window.matchMedia("(max-width: 800px)");
  let page_type = new Page(Number(id));
  const tools = new BlocTools(page_type);
  const { common, initCommon } = useContext(ColorContext);
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
      root.style.width = "100vw";

      root.style.paddingBottom = "0";
    } else if (root !== null && result_mid.matches) {
      root.style.width = "100vw";

      root.style.paddingBottom = "0";
    } else if (root !== null) {
      root.style.width = "100vw";

      root.style.paddingBottom = "0";
    }
  };
  useEffect(() => {
    asynchronRequestsToPopulateBlocs();
  }, [location]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const styles = {
    backgroundColor: common !== null ? `${common?.fond}` : "#ffffff",
    "--titles": `${common?.titles}` ? `${common?.titles}` : "black",
    "--button-background-color": `${common?.background_color_buttons}`
      ? `${common?.background_color_buttons}`
      : "#2f6091",

    "--background": `${common?.fond}` ? `${common?.fond}` : "white",
  };
  useEffect(() => {
    adaptRoot();
  }, [result.matches]);

  useEffect(() => {
    adaptRoot();
    if (blocs.length === 0 || blocs === undefined) {
      asynchronRequestsToPopulateBlocs();
    }
    initCommon();
  }, []);
  useEffect(() => {
    adaptRoot();
    if (blocs.length === 0 || blocs === undefined) {
      asynchronRequestsToPopulateBlocs();
    }
    initCommon();
  }, []);
  return (
    <div style={styles}>
      <div
        id="container"
        className={s.blocs_container}
        style={{ height: "fit-content", minHeight: "100vh" }}
      >
        <HeaderVizualization
          input_bloc={header}
          full={true}
          isResponsive={false}
        />

        {blocs.map((value, index) => {
          return value instanceof TextPicture ? (
            <div key={index} className={s.bloc}>
              <Bloc
                index={index}
                bloc={value}
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
                marginTop: value.bloc_number === 1 ? `60px` : `30px`,
                marginBottom: value.carousel_type === "auto" ? `0px` : `30px`,
              }}
            >
              {value.carousel_type === "miniatures" ? (
                <MiniaturesVisualization
                  input_bloc={value}
                  toggle={!toggle}
                  refresh={false}
                  full={true}
                  isResponsive={false}
                />
              ) : (
                <CarouselVisualization
                  input_bloc={value}
                  toggle={toggle}
                  refresh={false}
                  full={true}
                  isResponsive={false}
                />
              )}
            </div>
          ) : value instanceof PictureGroup ? (
            <div
              key={index}
              className={s.grid}
              style={{
                marginTop: value.bloc_number === 1 ? "60px" : "30px",
              }}
            >
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
              />
            </div>
          ) : value instanceof Parallaxe ? (
            <div key={index} className={s.parallaxe}>
              <ParallaxeVizualisation
                bloc={value}
                full={true}
                isResponsive={false}
              />
            </div>
          ) : (
            value instanceof Screen && (
              <div key={index} className={s.screen}>
                <ScreenVizualisation
                  bloc={value}
                  isResponsive={false}
                  toggle={false}
                  full={true}
                />
              </div>
            )
          );
        })}
      </div>
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
