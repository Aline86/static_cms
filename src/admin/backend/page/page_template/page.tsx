import { useEffect, useState } from "react";
import s from "./style.module.css";
import { Link, useParams } from "react-router-dom";
import ajout from "./../../../../assets/ajouter.png";
import Footer from "../../bloc/components/footer/Footer";
import Header from "../../bloc/components/header/Header";
import { TextPicture } from "../../bloc/components/text_picture/class/TextPicture";
import HeaderVizualization from "../../../frontend/bloc/header/header";
import FooterVizualization from "../../../frontend/bloc/footer/footer";
import BlocDisplay from "./bloc_display";
import Page from "../class/Page";
import Blocs from "./blocs";
import { Carousel } from "../../bloc/components/carousel/class/Carousel";

interface PageParams {}

function Visualization({}: PageParams) {
  const [blocs, setBlocs] = useState<Array<any>>([]);
  const [toggle, setToggle] = useState(false);
  const [drag, setToDrag] = useState(false);
  const [dragBegin, setDragBegin] = useState(0);
  const [open, setOpen] = useState(false);
  const [footer, setFooter] = useState<Footer>(new Footer());
  const [header, setHeader] = useState<Header>(new Header());
  const { id, name } = useParams();
  let page_type = new Page(Number(id));

  const getHeader = async () => {
    const new_bloc = await header.get_bloc();

    if (new_bloc.id === 1) {
      setHeader(header);
    }
  };
  const getFooter = async () => {
    const new_bloc = await footer.get_bloc();

    if (new_bloc.id === 1) {
      setFooter(new_bloc);
    }
  };

  const getAllBlocsPage = async () => {
    await getHeader();
    //await getBlocsPage();
    await getPage();
    await getFooter();
    setToggle(!toggle);
  };
  const getPage = async () => {
    page_type = await page_type.get_bloc();
    let async_result = await page_type.get_blocs_for_page();

    if (Array.isArray(async_result) && async_result.length >= 1) {
      await getAllRequests(async_result);
    }
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
  function handleScroll() {
    window.scrollTo({
      top: 2 * Number(document.body.offsetHeight),
      left: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    getAllBlocsPage();
    setBlocs(blocs);
  }, []);
  useEffect(() => {
    console.log("drag", drag);
  }, [blocs, drag]);
  return (
    <div className="page">
      <div className={s.page_container}>
        <HeaderVizualization
          input_bloc={header}
          toggle={toggle}
          isResponsive={false}
        />
        <Link to={{ pathname: `/` + id + `/` + name }}>
          <li>
            <div className={s.navigate}>Visualiser</div>
          </li>
        </Link>
        <BlocDisplay
          getPage={getPage}
          handleScroll={handleScroll}
          blocs={blocs}
          setToDrag={setToDrag}
          drag={drag}
          open={open}
          setOpen={setOpen}
          page={page_type}
        />
        <h1>{name}</h1>
        <div className={s.bloc_creation_wrapper} onClick={() => setOpen(!open)}>
          <div className={s.bloc_creation}>
            <img src={ajout} />
          </div>
        </div>
        <Blocs
          blocs={blocs}
          getAllBlocsPage={getAllBlocsPage}
          setDragBegin={setDragBegin}
          dragBegin={dragBegin}
          drag={drag}
          toggle={toggle}
          setBlocs={setBlocs}
          setToggle={setToggle}
          page_id={Number(id)}
        />
        <FooterVizualization
          input_bloc={footer}
          toggle={toggle}
          isResponsive={false}
        />
      </div>
    </div>
  );
}

export default Visualization;
