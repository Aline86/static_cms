import { lazy, Suspense, useContext, useEffect, useState } from "react";
import s from "./styles.module.css";
import { Link, useLocation, useParams } from "react-router-dom";

import Page from "../../backoffice/page/class/Page";
import Bloc from "../bloc/text_picture/bloc";
import HeaderVizualization from "../bloc/header/header";
import FooterVizualization from "../bloc/footer/footer";

import PictureGroupVizualisation from "../bloc/picture_group/PictureGroup";
import ButtonVisualization from "../bloc/bouton/Button";
import VideoVizualisation from "../bloc/video/video";

import ColorContext from "../../../ColorContext";

import ParallaxeVizualisation from "../bloc/parallaxe/parallaxe";
import GridVizualisation from "../bloc/grid/PictureGroup";
import ScreenVizualisation from "../bloc/screen/screen";
import { Carousel } from "../../backoffice/page/page_template/bloc_components/components/carousel/class/Carousel";
import { TextPicture } from "../../backoffice/page/page_template/bloc_components/components/text_picture/class/TextPicture";
import { PictureGroup } from "../../backoffice/page/page_template/bloc_components/components/picture_group/class/PictureGroup";
import { Button } from "../../backoffice/page/page_template/bloc_components/components/button/class/Button";
import { Video } from "../../backoffice/page/page_template/bloc_components/components/video/class/Video";
import { Screen } from "../../backoffice/page/page_template/bloc_components/components/screen/class/Screen";

import { Parallaxe } from "../../backoffice/page/page_template/bloc_components/components/parallaxe/class/Parallaxe";
import Footer from "../../backoffice/page/page_template/bloc_components/components/footer/Footer";
import Header from "../../backoffice/page/page_template/bloc_components/components/header/Header";
import BlocTools from "./tools/blocs_tools";

const MiniaturesVisualization = lazy(
  () => import("../bloc/miniatures/Miniatures")
);
const CarouselVisualization = lazy(() => import("../bloc/carousel/Carousel"));
function Voir() {
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
  const { id, slug } = useParams();
  const [toggle, setToggle] = useState(false);
  const [refresh] = useState(false);
  const [isReponsive, setResponsive] = useState(false);
  const [footer] = useState<Footer>(new Footer());
  const [header] = useState<Header>(new Header());
  const location = useLocation();
  const result = window.matchMedia("(max-width: 800px)");
  const result_mid = window.matchMedia("(max-width: 1200px)");
  let page_type = new Page(Number(id));
  const tools = new BlocTools(page_type);
  const { common, initCommon } = useContext(ColorContext);
  async function asynchronRequestsToPopulateBlocs() {
    await header.get_bloc();

    let bloc_pages = await tools.getAllBlocsPage();
    bloc_pages !== undefined && setBlocs(bloc_pages);
    await footer.get_bloc();

    setToggle(!toggle);
  }

  const adaptRoot = () => {
    let root = document.getElementById("root");
    if (root !== null && (isReponsive || result.matches)) {
      root.style.width = "380px";

      root.style.paddingBottom = "220px";
    } else if (root !== null && result_mid.matches) {
      root.style.width = "100vw";

      root.style.paddingBottom = "0px";
    } else if (root !== null) {
      root.style.width = "100vw";

      root.style.paddingBottom = "0px";
    }
  };
  useEffect(() => {
    asynchronRequestsToPopulateBlocs();
  }, [location, refresh]);

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
  }, [isReponsive]);

  useEffect(() => {
    initCommon();
    adaptRoot();
    if (blocs.length === 0 || blocs === undefined) {
      asynchronRequestsToPopulateBlocs();
    }
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
          toggle={toggle}
          full={true}
          isResponsive={isReponsive}
        />
        {!isReponsive && (
          <Link to={{ pathname: `/admin/page/` + id + `/` + slug }}>
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
          return value instanceof TextPicture ? (
            <div className={s.bloc} key={index}>
              <Bloc
                index={index}
                bloc={value}
                num_bloc={index}
                toggle={toggle}
                full={true}
                isResponsive={isReponsive}
              />
            </div>
          ) : value instanceof Carousel ? (
            <div
              key={index}
              className={s.carousel}
              style={{
                marginBottom: `${
                  (isReponsive || result.matches) &&
                  value.carousel_type === "auto"
                    ? "-90px"
                    : "0px"
                }`,
              }}
            >
              {value.carousel_type !== "miniatures" ? (
                <Suspense fallback={<div>Chargement...</div>}>
                  <CarouselVisualization
                    input_bloc={value}
                    toggle={toggle}
                    refresh={false}
                    full={true}
                    isResponsive={isReponsive}
                  />
                </Suspense>
              ) : (
                <Suspense fallback={<div>Chargement...</div>}>
                  <MiniaturesVisualization
                    input_bloc={value}
                    toggle={toggle}
                    refresh={false}
                    full={true}
                    isResponsive={isReponsive}
                  />
                </Suspense>
              )}
            </div>
          ) : value instanceof PictureGroup ? (
            <div
              key={index}
              className={s.carousel}
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
                  isResponsive={isReponsive}
                />
              ) : (
                <GridVizualisation
                  input_bloc={value}
                  toggle={toggle}
                  refresh={false}
                  isResponsive={isReponsive}
                />
              )}
            </div>
          ) : value instanceof Button ? (
            <div key={index} className={s.carousel}>
              <ButtonVisualization
                input_bloc={value}
                toggle={toggle}
                full={true}
                isResponsive={isReponsive}
              />
            </div>
          ) : value instanceof Video ? (
            <div key={index} className={s.video}>
              <VideoVizualisation
                bloc={value}
                full={true}
                isResponsive={isReponsive}
              />
            </div>
          ) : value instanceof Parallaxe ? (
            <div key={index} className={s.video}>
              <ParallaxeVizualisation
                bloc={value}
                full={true}
                isResponsive={isReponsive}
              />
            </div>
          ) : (
            value instanceof Screen && (
              <div key={index} className={s.screen}>
                <ScreenVizualisation
                  bloc={value}
                  isResponsive={isReponsive}
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
        isResponsive={isReponsive}
        full={true}
      />
    </div>
  );
}

export default Voir;
