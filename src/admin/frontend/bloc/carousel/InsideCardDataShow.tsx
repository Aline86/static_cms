import { Link, useParams } from "react-router-dom";

import s from "./styles/style.module.css";
import { useEffect, useState } from "react";
import Page from "../../../backend/page/class/Page";
import CarouselData from "../../../backend/bloc/components/carousel/class/CarouselData";

interface CardDatas {
  value: CarouselData;
  width: number;
  height: number;
  full: boolean;
  result: any;
  isResponsive: boolean;
}

function InsideCardDataShow({
  value,
  width,
  height,
  full,
  result,
  isResponsive,
}: CardDatas) {
  const [external, isExternalLink] = useState<boolean>(true);

  const [page, setPage] = useState<Page>();
  const { id } = useParams();
  const style_data = {
    background: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url("http://localhost:80/cms_v2/api/uploadfile/${value.image_url}") no-repeat center / cover`,
    width: `${
      !result.matches
        ? full
          ? isResponsive
            ? `360px`
            : `${width}vw`
          : `${width * 0.5}vw`
        : `80vw`
    }`,
    height: full ? `${height}vh` : `${height}vh`,
  };
  const checkExternal = async (url: string) => {
    let prefixe = url.substring(0, 4);
    if (prefixe === "http" || prefixe === "") {
      isExternalLink(true);
    } else {
      isExternalLink(false);
      let prefixe = Number(url.substring(0, 2));
      let pageData = await getPage(prefixe);
      setPage(pageData);
    }
  };

  const getPage = async (id: number) => {
    let page = new Page(id);
    page = await page.get_bloc();
    return page;
  };

  useEffect(() => {
    checkExternal(value.href_url);

    id !== undefined && localStorage.setItem("previous_page_id", id);
  }, []);

  return external ? (
    <a
      href={value.href_url}
      target="_blank"
      className={s.card_app}
      style={{
        background: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url("http://localhost:80/cms_v2/api/uploadfile/${value.image_url}") no-repeat center / cover`,
        width: `${
          !result.matches
            ? isResponsive
              ? `360px`
              : `calc(${width}vw)`
            : `80vw`
        }`,
        height: `${height}vh`,
      }}
    >
      {value.text.length > 0 && <div className={s.text}></div>}
    </a>
  ) : (
    <Link
      to={{ pathname: `/` + page?.title + `/` + page?.id }}
      style={style_data}
      className={s.card_app}
    >
      {value.text.length > 0 && <div className={s.text}></div>}
    </Link>
  );
}

export default InsideCardDataShow;
