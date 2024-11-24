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
  const [page, setPage] = useState<Page>();
  const [choice, isExternalLink] = useState<boolean>();
  const [toggle, setToggle] = useState<boolean>(false);

  const getPages = async () => {
    let page = new Page();
    let pages = await page.get_pages();
    setPages(pages);
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
    let page = new Page(id);
    let resulting_page = await page.get_bloc();
    return resulting_page;
  };
  useEffect(() => {
    checkExternal(data.href_url);
    getPages();
  }, []);
  useEffect(() => {}, [choice]);
  return (
    <div className={s.container}>
      {toggle ? (
        <h3
          className={s.explain_redirect}
          aria-label="Actuellement le bouton redirige vers un fichier. Le click sur le lien ci-dessous donne la possibilité de rediriger vers une page interne ou externe."
        >
          Page de redirection
        </h3>
      ) : (
        <h3>Rediriger vers un fichier</h3>
      )}
      <input type="checkbox" onClick={() => setToggle(!toggle)} />
      {!toggle ? (
        <div className={s.container}>
          {!choice ? <h3>Lien externe</h3> : <h3>Lien interne</h3>}
          <input
            type="checkbox"
            defaultChecked={Boolean(choice)}
            onClick={() => isExternalLink(!choice)}
          />

          {choice ? (
            <div className={s.type}>
              <h5>Page externe :</h5>
              <input
                className={s.href_url}
                value={data.href_url}
                placeholder="Url de redirection"
                onChange={(e) => {
                  updateCarousel(e, "href_url", bloc, index);
                }}
              />
            </div>
          ) : (
            <div className={s.type}>
              <h5>Page interne :</h5>
              <select
                className={s.select_box}
                onClick={(e) => updateCarousel(e, "href_url", bloc, index)}
                defaultValue={data.href_url}
              >
                <option key={0}>Choisir une page de redirection</option>

                {pages !== undefined &&
                  pages.map((value, index) => {
                    return (
                      <option
                        key={index}
                        value={value.id}
                        selected={
                          Number(data.href_url) === Number(value.id)
                            ? true
                            : false
                        }
                      >
                        {value.title}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}
        </div>
      ) : (
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
                updateCarousel(e, "href_url", bloc, index);
              }}
            />
          </label>
        </div>
      )}
    </div>
  );
}

export default DropdownData;
