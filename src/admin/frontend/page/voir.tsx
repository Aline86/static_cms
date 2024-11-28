import { useEffect, useState } from "react";
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

interface FooterInfo {}
function Voir({}: FooterInfo) {
  const [blocs, setBlocs] = useState<Array<Carousel | TextPicture>>([]);
  const { id, name } = useParams();

  const contentState = useState<RawDraftContentState>();
  const [toggle, setToggle] = useState(false);
  const [isReponsive, setResponsive] = useState(false);
  const [footer, setFooter] = useState<Footer>(new Footer());
  const [header, setHeader] = useState<Header>(new Header());

  const getBlocs = async () => {
    let new_page = new Page(Number(id));
    const page = await new_page.get_bloc();
    getAllRequests(await page.get_blocs_for_component());
  };
  const getHeader = async () => {
    header.set_id(1);
    const new_bloc = await header.get_bloc();
    setHeader(new_bloc);
    setToggle(!toggle);
  };
  const getFooter = async () => {
    footer.set_id(1);
    const new_bloc = await footer.get_bloc();
    setFooter(new_bloc);
    setToggle(!toggle);
  };
  const adaptRoot = () => {
    const root = document.getElementById("root");
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
  const getAllBlocsPage = async () => {
    await getHeader();
    //await getBlocsPage();
    await getBlocs();
    await getFooter();
    setToggle(!toggle);
  };

  async function getAllRequests(async_result: any[]) {
    let data: any[] = [];
    async_result.forEach(async (bloc) => {
      if (bloc.type === "text_picture") {
        let text_picture = new TextPicture(
          bloc.id,
          bloc.bloc_number,
          Number(id)
        );
        await requeteAsynchrone(text_picture.get_bloc(), data);
      }
      if (bloc.type === "carousel") {
        let carousel = new Carousel(Number(id), bloc.bloc_number, bloc.id);
        await requeteAsynchrone(carousel.get_bloc(), data);
      }
    });
  }
  async function requeteAsynchrone(nom: any, data: any[]) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(nom);
        nom.then((response: any) => {
          data.push(response);
        });
      }, 100); // Simule une requête qui prend 1 seconde
    });

    setBlocs(data);
  }
  useEffect(() => {
    if (
      localStorage.getItem("previous_page_id") !== null &&
      localStorage.getItem("previous_page_id") !== id
    ) {
      localStorage.removeItem("previous_page_id");
      window.location.reload();
      console.log(localStorage.getItem("previous_page_id"));
    }
    getAllBlocsPage();
  }, [id]);
  useEffect(() => {
    adaptRoot();
  }, [isReponsive]);
  useEffect(() => {}, [blocs]);
  return (
    <div className={s.blocs_container}>
      <HeaderVizualization
        input_bloc={header}
        toggle={toggle}
        isResponsive={isReponsive}
      />
      {!isReponsive && (
        <Link to={{ pathname: `/page/` + name + `/` + id }}>
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

      {blocs !== undefined &&
        blocs.map((value, index) => {
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
                setToggle={setToggle}
                full={true}
                onContentStateChange={undefined}
                contenstate={contentState}
                isResponsive={isReponsive}
              />
            </div>
          ) : (
            value instanceof Carousel && (
              <div className={s.carousel}>
                <CarouselVisualization
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
