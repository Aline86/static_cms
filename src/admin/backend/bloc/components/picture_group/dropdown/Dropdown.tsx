import { useEffect, useState } from "react";
import s from "./styles.module.css";
import Page from "../../../../page/class/Page";
import { PictureGroup } from "../class/PictureGroup";
import PictureGroupData from "../class/PictureGroupData";

interface DropdownInfo {
  bloc: PictureGroup;
  data: PictureGroupData;
  type: string;
  index: number;
  updateCarousel: any;
}

function DropdownData({
  bloc,
  data,
  type,
  index,
  updateCarousel,
}: DropdownInfo) {
  const [pages, setPages] = useState<Page[]>();
  const [page, setPage] = useState<Page>(new Page());
  const [choice, isExternalLink] = useState<boolean>();
  const [toggle, setToggle] = useState<boolean>(false);

  const getPages = async () => {
    let async_result = await page.get_pages();
    if (Array.isArray(async_result) && async_result.length >= 1) {
      setPages(async_result);
    }
  };
  const checkExternal = async (url: string) => {
    let prefixe = url.substring(0, 4);
    if (prefixe === "http" || prefixe === "") {
      isExternalLink(true);
    } else if (/.pdf/.test(url.substring(url.length - 4))) {
      setToggle(true);
    } else {
      isExternalLink(false);
      let prefixe = Number(url.substring(0, 2));
      let pageData = await getPage(prefixe);
      setPage(pageData);
    }
  };

  const getPage = async (id: number) => {
    page.set_id(id);
    let new_page = await page.get_bloc();

    return new_page;
  };
  useEffect(() => {
    checkExternal(data.href_url);
    getPages();
  }, []);
  useEffect(() => {}, [choice]);
  return (
    <div className={s.container}>
      {!choice ? <h3>Lien externe</h3> : <h3>Lien interne</h3>}
      <input
        type="checkbox"
        defaultChecked={choice}
        onClick={() => isExternalLink(!choice)}
      />

      {choice ? (
        <div className={s.type}>
          <h5>Lien externe :</h5>
          <input
            className={s.href_url}
            value={data.href_url}
            placeholder="Url de redirection"
            onChange={(e) => {
              updateCarousel(e, "href_url", index, bloc);
            }}
          />
        </div>
      ) : (
        <div className={s.type}>
          <h5>Lien interne :</h5>
          <select
            className={s.select_box}
            onChange={(e) => updateCarousel(e, "href_url", index, bloc)}
            value={
              typeof Number(data.href_url) === "number"
                ? Number(data.href_url)
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
