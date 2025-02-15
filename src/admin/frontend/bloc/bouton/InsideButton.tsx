import { useEffect, useState } from "react";
import s from "./styles/style.module.css";
import { Link, useParams } from "react-router-dom";
import Page from "../../../backoffice/page/class/Page";
import { BASE_URL_SITE } from "../../../../config";
import { Button } from "../../../backoffice/page/page_template/bloc_components/components/button/class/Button";

interface CardDatas {
  data: Button;
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
  const [external, isExternalLink] = useState<boolean>(false);
  const [page, setPage] = useState<Page>();
  const { id } = useParams();
  const result = window.matchMedia("(max-width: 700px)");

  const checkExternal = async (url: string) => {
    if (link && typeof url !== "number") {
      isExternalLink(true);
    } else {
      let prefixe = Number(url);
      let conscerned_page = new Page(prefixe);
      let pageData = await conscerned_page.get_bloc();
      setPage(pageData);
    }
  };

  // adapt text color to chosed color
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
    checkExternal(data.href_url);
    id !== undefined && sessionStorage.setItem("previous_page_id", id);
  }, [toggle]);
  useEffect(() => {}, [link]);
  const style_data = {
    cursor: "pointer",
    width: isResponsive || result.matches ? `320px` : `${width}vw`,
    height: `${height}px`,
    lineHeight: `${height}px`,
    backgroundColor: data.image_url === "" ? "" : "rgba(0, 0, 0, 0.2)",
    color:
      data.image_url === "" ? isLightOrDark(data.background_color) : "#ffffff",
    border:
      "1px solid " +
      `${
        data.image_url === "" ? isLightOrDark(data.background_color) : "#ffffff"
      }`,
    marginTop: "50px",
  };
  return external ? (
    link ? (
      <a href={data.href_url} className="buttons" style={style_data}>
        {data.text}
      </a>
    ) : (
      <a
        href={BASE_URL_SITE + `/api/uploadfile/` + `${data.href_url}`}
        className="buttons"
        style={style_data}
      >
        {data.text}
      </a>
    )
  ) : (
    <Link
      //
      to={{ pathname: `/` + page?.id + `/` + page?.slug }}
      className={s.card_app_image_group}
    >
      {data.text.length > 0 && (
        <div className="buttons" style={style_data}>
          {data.text}
        </div>
      )}
    </Link>
  );
}

export default InsideButton;
