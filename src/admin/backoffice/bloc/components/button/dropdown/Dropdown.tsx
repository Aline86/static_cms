import { useEffect, useState } from "react";
import s from "./styles.module.css";
import Page from "../../../../page/class/Page";

import { Button } from "../class/Button";

interface DropdownInfo {
  bloc: Button;

  updateButton: any;
}

function DropdownData({ bloc, updateButton }: DropdownInfo) {
  const [pages, setPages] = useState<Page[]>();
  const [page, setPage] = useState<Page>(new Page());
  const [choice, isExternalLink] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);

  const getPages = async () => {
    let pages = await page.get_pages();
    setPages(pages);
  };
  const checkExternal = async (url: string) => {
    let prefixe = url.substring(0, 4);
    if (prefixe === "http" || prefixe === "") {
      isExternalLink("Lien url externe");
    } else if (/.pdf/.test(url.substring(url.length - 4))) {
      isExternalLink("Fichier");
      setToggle(true);
    } else {
      isExternalLink("Page interne");
      let prefixe = Number(url.substring(0, 2));
      let pageData = await getPage(prefixe);
      setPage(pageData);
    }
  };

  const getPage = async (id: number) => {
    let page = new Page(id);
    let resulting_page = await page.get_bloc();
    return resulting_page;
  };
  const updateLink = (e: any) => {
    isExternalLink(e.target.value);
  };
  useEffect(() => {
    checkExternal(bloc.href_url);
    getPages();
  }, []);
  useEffect(() => {}, [choice]);
  return (
    <div className={s.container}>
      <select
        className={s.select_box}
        onChange={(e) => updateLink(e)}
        value={choice !== "" ? choice : "Choisir une page de redirection"}
      >
        <option key={0}>Choisir un type de redirection : </option>

        <option key={1} value="Lien url externe">
          Lien url externe
        </option>
        <option key={2} value="Page externe">
          Page externe{" "}
        </option>
        <option key={3} value="Fichier">
          Fichier{" "}
        </option>
      </select>
      {choice === "Lien url externe" ? (
        <div className={s.type}>
          <input
            className={s.href_url}
            value={bloc.href_url}
            placeholder="Url de redirection"
            onChange={(e) => {
              updateButton(e, "href_url", bloc);
            }}
          />
        </div>
      ) : choice === "Fichier" ? (
        <div className={s.type}>
          <div
            style={{
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              width: "100%",
            }}
          >
            <label>
              <span>Charger un fichier</span>
              <input
                type="file"
                className={s.image_url}
                onChange={(e) => {
                  updateButton(e, "href_url", bloc);
                }}
              />
            </label>
          </div>
        </div>
      ) : (
        <div className={s.type}>
          <select
            className={s.select_box}
            onChange={(e) => updateButton(e, "href_url", bloc)}
            value={
              typeof Number(bloc.href_url) === "number"
                ? Number(bloc.href_url)
                : "Choisir une page de redirection"
            }
          >
            <option key={0}>Choisir une page de redirection</option>

            {pages !== undefined &&
              pages.map((value, index) => {
                return (
                  <option key={index} value={value.id}>
                    {value.title}
                  </option>
                );
              })}
          </select>
        </div>
      )}
    </div>
  );
}

export default DropdownData;
