import { useContext, useEffect, useState } from "react";
import s from "./style.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";

import BlocDisplay from "./bloc_components/bloc_picker";
import Page from "../class/Page";
import Blocs from "./bloc_components/blocs";

import User from "../../../authentication/class/User";
import AuthContextProvider from "../../../../auth/AuthContext";
import Header from "./bloc_components/components/header/Header";
import Footer from "./bloc_components/components/footer/Footer";
import BlocTools from "../../../frontend/page/tools/blocs_tools";

interface PageParams {}

function Visualization({}: PageParams) {
  const [toggle, setToggle] = useState(false);
  const [drag, setToDrag] = useState(false);
  const [dragBegin, setDragBegin] = useState(0);
  const [open, setOpen] = useState(false);
  const [footer] = useState<Footer>(new Footer());
  const [header] = useState<Header>(new Header());
  const [focus, setFocus] = useState<boolean>(false);
  const { id, slug } = useParams();
  const [refresh, setRefresh] = useState(false);
  const [goTo, setGoTo] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContextProvider);
  let page_type = new Page(Number(id));
  const tools = new BlocTools(page_type);

  const [blocs, setBlocs] = useState<Array<any>>([]);
  const [highlight, setHighlight] = useState<any>();
  async function asynchronRequestsToPopulateBlocs(goToB: boolean = false) {
    setBlocs([]);
    await header.get_bloc();

    await footer.get_bloc();

    let bloc_pages = await tools.getAllBlocsPage();

    bloc_pages !== undefined && setBlocs(bloc_pages);
    if (goToB) {
      blocs !== undefined && setHighlight(bloc_pages[bloc_pages.length - 1]);
      setGoTo(!goTo);
    } else {
      setToggle(!toggle);
    }
  }

  function handleScroll() {
    let timedelay = 0;
    let scrollId: any;
    let height: number = 0;
    let minScrollHeight: number = 100;
    scrollId = setInterval(function () {
      if (height <= document.body.scrollHeight) {
        window.scrollBy(0, minScrollHeight);
      } else {
        clearInterval(scrollId);
      }
      height += minScrollHeight;
    }, timedelay);
  }
  const logOut = () => {
    user.logOut();
    setUser(new User("", "", ""));
    navigate("/login");
    sessionStorage.setItem("authToken", "");
  };
  useEffect(() => {
    asynchronRequestsToPopulateBlocs();
  }, []);
  const reload_blocs = async () => {
    let bloc_pages = await tools.getAllBlocsPage();

    bloc_pages !== undefined && setBlocs(bloc_pages);

    setRefresh(!refresh);
  };

  useEffect(() => {}, [toggle, blocs]);
  useEffect(() => {
    asynchronRequestsToPopulateBlocs();
  }, [refresh]);

  useEffect(() => {
    handleScroll();
  }, [goTo]);

  useEffect(() => {}, [highlight]);
  return (
    <div className="page">
      <div className={s.page_container}>
        <div className="flex">
          <Link to={{ pathname: `/admin/` + id + `/` + slug }}>
            <li>
              <div className={s.navigate_2}>Visualiser la page</div>
            </li>
          </Link>
          <Link to={{ pathname: `/admin/pages` }}>
            <li>
              <div className={s.navigate_2}>Liste des pages</div>
            </li>
          </Link>

          <li>
            <div className={s.navigate} onClick={() => setOpen(!open)}>
              Ajouter un bloc
            </div>
          </li>
          <Link to={{ pathname: `/admin` }}>
            <li>
              <div className={s.navigate}>Paramètres généraux</div>
            </li>
          </Link>
          <li>
            <div className={s.navigate} onClick={() => logOut()}>
              Se déconnecter
            </div>
          </li>
          {blocs.length > 0 && (
            <li>
              <div
                className={s.navigate_2}
                style={{ backgroundColor: focus ? "#0d45a5" : "" }}
                onClick={(e) => {
                  e.preventDefault();
                  setToDrag(!drag);
                  setOpen(false);
                  setFocus(!focus);
                }}
              >
                Changer l'ordre des blocs
              </div>
            </li>
          )}
        </div>

        <div>
          <BlocDisplay
            blocs={blocs}
            open={open}
            setOpen={setOpen}
            page={page_type}
            getPage={asynchronRequestsToPopulateBlocs}
          />
          <h1>{slug}</h1>

          <Blocs
            blocs={blocs}
            setBlocs={setBlocs}
            setDragBegin={setDragBegin}
            dragBegin={dragBegin}
            drag={drag}
            toggle={toggle}
            setRefresh={setRefresh}
            reload_blocs={reload_blocs}
            refresh={refresh}
            setToggle={setToggle}
            page_id={Number(id)}
            highlight={highlight}
            setHighlight={setHighlight}
          />
        </div>
      </div>
    </div>
  );
}

export default Visualization;
