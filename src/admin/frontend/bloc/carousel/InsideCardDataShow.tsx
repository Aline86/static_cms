import { Link, useParams } from "react-router-dom";
import s from "./styles/style.module.css";
import { useEffect, useState } from "react";
import Page from "../../../backoffice/page/class/Page";
import { BASE_URL_SITE } from "../../../../config";
import CarouselData from "../../../backoffice/page/page_template/bloc_components/components/carousel/class/CarouselData";

interface CardDatas {
  value: CarouselData;
  width: number | string;
  height: number;
  result: any;
  isResponsive: boolean;
}

function InsideCardDataShow({
  value,
  width,
  height,
  result,
  isResponsive,
}: CardDatas) {
  const [external, isExternalLink] = useState<boolean>(true);
  const image = BASE_URL_SITE + "/api/uploadfile/" + value.image_url;
  const [page, setPage] = useState<Page>();
  const { id } = useParams();
  const style_data = {
    background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url("${image}") no-repeat center / contain`,
    width: `${
      !result.matches && !isResponsive
        ? `${width}vw`
        : isResponsive
        ? `200px`
        : `200px`
    }`,

    height: `${height}vw`,
    minHeight: "200px",
    border: value.image_url !== "" ? "" : "1px solid rgb(168, 166, 166)",
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

    id !== undefined && sessionStorage.setItem("previous_page_id", id);
  }, []);

  return external ? (
    <a
      key={value.id}
      href={value.href_url}
      target="_blank"
      className={s.card_app}
      style={style_data}
    >
      {value.text.length > 0 && <div className={s.text}></div>}
    </a>
  ) : (
    <Link
      to={{ pathname: `/` + page?.id + `/` + page?.slug }}
      style={style_data}
      className={s.card_app}
      key={value.id}
    >
      {value.text.length > 0 && <div className={s.text}></div>}
    </Link>
  );
}

export default InsideCardDataShow;
