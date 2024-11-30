import { useEffect, useState } from "react";
import s from "./style.module.css";
import { Link, useParams } from "react-router-dom";
import ajout from "./../../../../assets/ajouter.png";
import Footer from "../../bloc/components/footer/Footer";
import Header from "../../bloc/components/header/Header";
import HeaderVizualization from "../../../frontend/bloc/header/header";
import FooterVizualization from "../../../frontend/bloc/footer/footer";
import BlocDisplay from "./bloc_display";
import Page from "../class/Page";
import Blocs from "./blocs";
import BlocTools from "../../../tools/blocs_tools";

interface PageParams {}

function Visualization({}: PageParams) {
  const [toggle, setToggle] = useState(false);
  const [drag, setToDrag] = useState(false);
  const [dragBegin, setDragBegin] = useState(0);
  const [open, setOpen] = useState(false);
  const [footer, setFooter] = useState<Footer>(new Footer());
  const [header, setHeader] = useState<Header>(new Header());
  const { id, name } = useParams();
  let page_type = new Page(Number(id));
  const tools = new BlocTools(page_type);

  const [blocs, setBlocs] = useState<Array<any>>([]);

  async function asynchronRequestsToPopulateBlocs() {
    await header.get_bloc();

    await footer.get_bloc();

    let bloc_pages = await tools.getAllBlocsPage();

    bloc_pages !== undefined && setBlocs(bloc_pages);

    setToggle(!toggle);
  }

  function handleScroll() {
    window.scrollTo({
      top: 2 * Number(document.body.offsetHeight),
      left: 0,
      behavior: "smooth",
    });
  }
  useEffect(() => {
    asynchronRequestsToPopulateBlocs();
  }, []);
  /*useEffect(() => {
    asynchronRequestsToPopulateBlocs();
  }, [id]);*/
  useEffect(() => {}, [toggle, blocs]);
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

        <div>
          <BlocDisplay
            handleScroll={handleScroll}
            blocs={blocs}
            setToDrag={setToDrag}
            drag={drag}
            open={open}
            setOpen={setOpen}
            page={page_type}
            getPage={asynchronRequestsToPopulateBlocs}
          />
          <h1>{name}</h1>
          <div
            className={s.bloc_creation_wrapper}
            onClick={() => setOpen(!open)}
          >
            <div className={s.bloc_creation}>
              <img src={ajout} />
            </div>
          </div>
          <Blocs
            blocs={blocs}
            setBlocs={setBlocs}
            setDragBegin={setDragBegin}
            dragBegin={dragBegin}
            drag={drag}
            toggle={toggle}
            setToggle={setToggle}
            page_id={Number(id)}
          />
        </div>

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
