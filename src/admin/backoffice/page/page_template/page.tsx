import { useContext, useEffect, useState } from "react";
import s from "./style.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";

import Footer from "../../bloc/components/footer/Footer";
import Header from "../../bloc/components/header/Header";

import BlocDisplay from "./bloc_picker";
import Page from "../class/Page";
import Blocs from "./blocs";
import BlocTools from "../../../tools/blocs_tools";

import User from "../../../authentication/class/User";
import AuthContextProvider from "../../../../auth/AuthContext";

interface PageParams {}

function Visualization({}: PageParams) {
  const [toggle, setToggle] = useState(false);
  const [drag, setToDrag] = useState(false);
  const [dragBegin, setDragBegin] = useState(0);
  const [open, setOpen] = useState(false);
  const [footer, setFooter] = useState<Footer>(new Footer());
  const [header, setHeader] = useState<Header>(new Header());
  const { id, name } = useParams();
  const [refresh, setRefresh] = useState(false);
  const [goTo, setGoTo] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContextProvider);
  let page_type = new Page(Number(id));
  const tools = new BlocTools(page_type);

  const [blocs, setBlocs] = useState<Array<any>>([]);

  async function asynchronRequestsToPopulateBlocs(goToB: boolean = false) {
    setBlocs([]);
    await header.get_bloc();

    await footer.get_bloc();

    let bloc_pages = await tools.getAllBlocsPage();

    bloc_pages !== undefined && setBlocs(bloc_pages);
    if (goToB) {
      setGoTo(!goTo);
    } else {
      setToggle(!toggle);
    }
  }

  function handleScroll() {
    let timedelay = 0;
    let scrollId: number;
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
    localStorage.setItem("authToken", "");
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
  return (
    <div className="page">
      <div className={s.page_container}>
        <div className="flex">
          <Link to={{ pathname: `/admin/` + id + `/` + name }}>
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
          <li>
            <div
              className={s.navigate_2}
              onClick={(e) => {
                e.preventDefault();
                setToDrag(!drag);
                setOpen(false);
              }}
            >
              Changer l'ordre des blocs
            </div>
          </li>
        </div>

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
          />
        </div>
      </div>
    </div>
  );
}

export default Visualization;
