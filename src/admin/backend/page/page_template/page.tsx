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
  const [blocs, setBlocs] = useState<Array<any>>([]);
  const [toggle, setToggle] = useState(false);
  const [drag, setToDrag] = useState(false);
  const [dragBegin, setDragBegin] = useState(0);
  const [open, setOpen] = useState(false);
  const [footer, setFooter] = useState<Footer>(new Footer());
  const [header, setHeader] = useState<Header>(new Header());
  const [loaded, setLoaded] = useState(false);
  const { id, name } = useParams();
  let page_type = new Page(Number(id));
  const [tools, setTools] = useState<BlocTools>(
    new BlocTools(header, footer, page_type)
  );

  async function AsynchronRequestsToPopulateBlocs() {
    const new_header = await header.get_bloc();

    if (new_header.id === 1) {
      setHeader(new_header);
    }
    const new_footer = await footer.get_bloc();

    if (new_footer.id === 1) {
      setFooter(new_footer);
    }

    setTools(new BlocTools(header, footer, page_type));
    let data = await tools.getAllBlocsPage();
    console.log("data", data);
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
    AsynchronRequestsToPopulateBlocs();
  }, [id]);
  useEffect(() => {
    setLoaded(true);
  }, [blocs]);

  useEffect(() => {}, [drag]);
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

        {loaded && tools !== undefined && blocs.length >= 1 && (
          <div>
            <BlocDisplay
              handleScroll={handleScroll}
              blocs={blocs}
              setToDrag={setToDrag}
              drag={drag}
              open={open}
              setOpen={setOpen}
              page={page_type}
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
              getAllBlocsPage={AsynchronRequestsToPopulateBlocs}
              setDragBegin={setDragBegin}
              dragBegin={dragBegin}
              drag={drag}
              toggle={toggle}
              setBlocs={setBlocs}
              setToggle={setToggle}
              page_id={Number(id)}
            />{" "}
          </div>
        )}

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
