import { useContext, useEffect, useState } from "react";

import remove from "./../../../assets/remove.png";
import add_to_database from "./../../../assets/add_to_database.png";
import s from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import Page from "./class/Page";
import Header from "../bloc/components/header/Header";
import Footer from "../bloc/components/footer/Footer";
import AuthContextProvider from "../../../auth/AuthContext";
import User from "../../authentication/class/User";

interface PagesParams {}

function Pages({}: PagesParams) {
  const [toggle, setToggle] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [pages, setPages] = useState<Page[]>([]);
  const [header, setHeader] = useState<Header>(new Header());
  const { user, setUser } = useContext(AuthContextProvider);
  const page_type = new Page();
  const [footer, setFooter] = useState<Footer>(new Footer());
  const [drag, setToDrag] = useState(false);
  const [dragBegin, setDragBegin] = useState(0);
  const navigate = useNavigate();

  const updatePage = (e: any, field: string, page: Page, key: number) => {
    page.updatePage(e, field);
    pages[key] = page;
    setPages(pages);
    setToggle(!toggle);
  };
  const addPage = () => {
    pages.push(new Page(-1, pages.length - 1));
    setPages(pages);
    setToggle(!toggle);
  };

  const savePage = async (page: Page) => {
    console.log("page", page);
    let result = await page.save_bloc();
    if (result !== undefined) {
      if (page.id > 0) {
        setToggle(!toggle);
      } else {
        setRefresh(!refresh);
      }
    }
  };
  const removePage = async (page: Page) => {
    await page.remove_page();

    setRefresh(!refresh);
  };

  const getPages = async () => {
    let async_result = await page_type.get_pages();

    if (Array.isArray(async_result) && async_result.length >= 1) {
      setPages(async_result);
    }
  };
  const getHeader = async () => {
    const new_bloc = await header.get_bloc();

    if (new_bloc.id === 1) {
      setHeader(header);
    }
    setToggle(!toggle);
  };
  const getFooter = async () => {
    const new_bloc = await footer.get_bloc();
    if (new_bloc.id === 1) {
      setFooter(new_bloc);
    }
    setToggle(!toggle);
  };
  const logOut = () => {
    user.logOut();
    setUser(new User("", "", ""));
    navigate("/login");
    localStorage.setItem("authToken", "");
  };
  const updateDragBloc = async (lastKey: number) => {
    const start = dragBegin;
    const end = lastKey;
    moveElements(start, end);
  };
  const moveElements = (start: number, end: number) => {
    const newItems = [...pages];
    const draggedItemValue = newItems[start];
    newItems.splice(start, 1);
    newItems.splice(end, 0, draggedItemValue);
    let new_bloc_array: any = [];
    newItems.map(async (page: Page, index: number) => {
      page.set_page_number(index);
      new_bloc_array.push(page);
    });
    // saving the new info in database
    new_bloc_array.map(async (bloc_to_save: Page) => {
      await bloc_to_save.save_bloc();
    });
    setPages(new_bloc_array);
  };
  const handleDragOver = (event: any) => {
    event.preventDefault();
  };
  useEffect(() => {
    getHeader();
    getPages();
    getFooter();
  }, []);
  useEffect(() => {
    getHeader();
    getPages();
    getFooter();
  }, [refresh]);
  useEffect(() => {}, [toggle, header, footer, pages]);
  return (
    pages[0] !== undefined && (
      <div className={s.pages}>
        <div className="flex">
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
        </div>

        <label
          className={s.addLink}
          onClick={(e) => {
            e.preventDefault();
            addPage();
          }}
        >
          <span style={{ textTransform: "uppercase", width: "220px" }}>
            Ajouter une page +
          </span>
        </label>
        <div className={s.page}>
          <h2>1</h2>
          <input
            className={s.href_url}
            placeholder="Titre de la page"
            value={pages[0].title}
          />

          <Link
            to={{
              pathname:
                `/admin/page/` +
                pages[0].id +
                `/` +
                pages[0].title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "_"),
            }}
          >
            <label className={s.addLink}>
              <span
                style={{
                  textTransform: "uppercase",
                  width: "220px",
                  marginTop: "10px",
                }}
              >
                Modifier la page
              </span>
            </label>
          </Link>
        </div>
        {pages !== undefined &&
          pages.length > 0 &&
          pages.map((page, key) => {
            return (
              key >= 1 && (
                <div
                  className={s.page}
                  key={key}
                  draggable={true}
                  onDragStart={() => setDragBegin(key)}
                  onDragOver={handleDragOver}
                  onDrop={() => updateDragBloc(key)}
                >
                  <h2>{key + 1}</h2>
                  <input
                    className={s.href_url}
                    placeholder="Titre de la page"
                    value={page.title}
                    onChange={(e) => {
                      updatePage(e, "title", page, key);
                    }}
                  />
                  <div className={s.end}>
                    {key > 0 && (
                      <div
                        className={s.button_save_page}
                        onClick={() => {
                          savePage(page);
                        }}
                        style={{ top: "60px", right: "60px" }}
                      >
                        <img
                          src={add_to_database}
                          alt="ajouter en base de données"
                        />
                      </div>
                    )}
                    <Link
                      to={{
                        pathname:
                          `/admin/page/` +
                          page.id +
                          `/` +
                          page.title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "_"),
                      }}
                    >
                      <label className={s.addLink}>
                        <span
                          style={{
                            textTransform: "uppercase",
                            width: "220px",
                            marginTop: "10px",
                          }}
                        >
                          Modifier la page
                        </span>
                      </label>
                    </Link>
                    {key > 0 && (
                      <div
                        className={s.button_remove_page}
                        onClick={() => {
                          removePage(page);
                        }}
                      >
                        <img src={remove} alt="suppression box" />
                      </div>
                    )}
                  </div>
                </div>
              )
            );
          })}
      </div>
    )
  );
}

export default Pages;
