import { useEffect, useState } from "react";
import s from "./styles.module.css";
import Page from "../../../../page/class/Page";
import { Carousel } from "../class/Carousel";
import CarouselData from "../class/CarouselData";

interface DropdownInfo {
  bloc: Carousel;
  data: CarouselData;
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
  const [choice, isExternalLink] = useState<string>("");
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
      isExternalLink("Lien url externe");
    } else if (/.pdf/.test(url.substring(url.length - 4))) {
      setToggle(true);
    } else {
      isExternalLink("Page interne");
      let prefixe = Number(url.substring(0, 2));
      let pageData = await getPage(prefixe);
      setPage(pageData);
    }
  };
  const updateLink = (e: any) => {
    setToggle(true);
    isExternalLink(e.target.value);
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
      <select
        className={s.select_box}
        onChange={(e) => updateLink(e)}
        value={choice !== "" ? choice : "Choisir une page de redirection"}
      >
        <option key={0}>Choisir un type de redirection : </option>

        <option key={1} value="Lien url externe">
          Cible (url)
        </option>
        <option key={2} value="Page interne">
          Page du site
        </option>
      </select>
      {choice === "Lien url externe" ? (
        <div className={s.type}>
          <input
            className={s.href_url}
            value={toggle ? "" : data.href_url}
            placeholder="Url de redirection"
            onChange={(e) => {
              updateCarousel(e, "href_url", bloc, index);
              setToggle(false);
            }}
          />
        </div>
      ) : (
        <div className={s.type}>
          <select
            className={s.select_box}
            onChange={(e) => {
              updateCarousel(e, "href_url", bloc, index);
              setToggle(false);
            }}
            value={toggle ? "" : Number(data.href_url)}
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
