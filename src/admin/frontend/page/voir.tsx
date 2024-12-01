import { SetStateAction, useEffect, useState } from "react";
import s from "./styles.module.css";

import { Link, useParams } from "react-router-dom";

import { RawDraftContentState } from "draft-js";

import { TextPicture } from "../../backend/bloc/components/text_picture/class/TextPicture";
import { Carousel } from "../../backend/bloc/components/carousel/class/Carousel";
import Footer from "../../backend/bloc/components/footer/Footer";
import Header from "../../backend/bloc/components/header/Header";
import Page from "../../backend/page/class/Page";
import Bloc from "../bloc/text_picture/bloc";
import CarouselVisualization from "../bloc/carousel/Carousel";
import HeaderVizualization from "../bloc/header/header";
import FooterVizualization from "../bloc/footer/footer";
import BlocTools from "../../tools/blocs_tools";
import { PictureGroup } from "../../backend/bloc/components/picture_group/class/PictureGroup";
import PictureGroupVizualisation from "../bloc/picture_group/PictureGroup";

interface FooterInfo {}
function Voir({}: FooterInfo) {
  const [blocs, setBlocs] = useState<
    Array<Carousel | TextPicture | PictureGroup>
  >([]);
  const { id, name } = useParams();

  const contentState = useState<RawDraftContentState>();
  const [toggle, setToggle] = useState(false);
  const [isReponsive, setResponsive] = useState(false);
  const [footer, setFooter] = useState<Footer>(new Footer());
  const [header, setHeader] = useState<Header>(new Header());

  let page_type = new Page(Number(id));
  const tools = new BlocTools(page_type);

  async function asynchronRequestsToPopulateBlocs() {
    await header.get_bloc();

    await footer.get_bloc();

    let bloc_pages = await tools.getAllBlocsPage();
    bloc_pages !== undefined && setBlocs(bloc_pages);
    setToggle(!toggle);
  }

  const adaptRoot = () => {
    let root = document.getElementById("root");
    if (root !== null && isReponsive) {
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

  useEffect(() => {
    adaptRoot();
  }, [isReponsive]);

  useEffect(() => {
    adaptRoot();
    if (blocs.length === 0 || blocs === undefined) {
      asynchronRequestsToPopulateBlocs();
    }
  }, []);
  useEffect(() => {}, [blocs, toggle]);
  return (
    <div className={s.blocs_container}>
      <HeaderVizualization
        input_bloc={header}
        toggle={toggle}
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
        return value instanceof TextPicture ? (
          <div
            className={s.bloc}
            style={{
              height: "fit-content",
            }}
          >
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
        ) : value instanceof Carousel ? (
          <div className={s.carousel}>
            <CarouselVisualization
              input_bloc={value}
              toggle={toggle}
              refresh={false}
              full={true}
              isResponsive={isReponsive}
            />
          </div>
        ) : (
          value instanceof PictureGroup && (
            <div className={s.carousel}>
              <PictureGroupVizualisation
                input_bloc={value}
                toggle={toggle}
                refresh={false}
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
      />
    </div>
  );
}

export default Voir;
