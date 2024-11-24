import { useEffect, useState } from "react";

import s from "./style.module.css";
import { Link, useParams } from "react-router-dom";
import Page from "../../../backend/bloc/components/page/class/Page";
import ButtonCard from "../../../backend/bloc/components/button/class/ButtonCard";

interface CardDatas {
  data: ButtonCard;
  width: number;
  height: number;
  link: boolean;
  toggle: boolean;
  isResponsive: boolean;
}

function InsideButton({
  data,
  width,
  height,
  link,
  toggle,
  isResponsive,
}: CardDatas) {
  const [external, isExternalLink] = useState<boolean>(true);
  const [page, setPage] = useState<Page>();
  const { id } = useParams();
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
    const conscerned_page = new Page(id);
    await conscerned_page.get_bloc();
    if (page !== undefined) {
      return page;
    }
  };
  const isLightOrDark = (hexcolor: string) => {
    var c = hexcolor.substring(1); // strip #
    var rgb = parseInt(c, 16); // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff; // extract red
    var g = (rgb >> 8) & 0xff; // extract green
    var b = (rgb >> 0) & 0xff; // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 90) {
      return "white";
    }
    return "black";
  };
  useEffect(() => {
    console.log("link", link);
    checkExternal(data.href_url);
    id !== undefined && localStorage.setItem("previous_page_id", id);
  }, [toggle]);
  useEffect(() => {}, [link]);
  const style_data = {
    cursor: "pointer",
    width: isResponsive ? `320px` : `${width}vw`,
    height: `${height}px`,
    lineHeight: `${height}px`,
    color: isLightOrDark(data.background_color),
    border: "1px solid " + `${isLightOrDark(data.background_color)}`,
    marginTop: "50px",
  };
  return link ? (
    external ? (
      <a href={data.href_url} className="buttons" style={style_data}>
        {data.text}
      </a>
    ) : (
      <Link
        to={{ pathname: `/` + page?.title + `/` + page?.id }}
        className={s.card_app}
      >
        {data.text.length > 0 && (
          <div className="buttons" style={style_data}>
            {data.text}
          </div>
        )}
      </Link>
    )
  ) : (
    <a
      href={`http://localhost:80/cms_v2/api/uploadfile/` + `${data.href_url}`}
      target="_blank"
      className="buttons"
      style={style_data}
    >
      {data.text}
    </a>
  );
}

export default InsideButton;
