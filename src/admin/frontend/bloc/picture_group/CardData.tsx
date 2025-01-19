import { Link, useParams } from "react-router-dom";

import InsideCardData from "./InsideCardData";
import s from "./styles/style.module.css";
import { useEffect, useState } from "react";

import PictureGroupCard from "../../../backoffice/bloc/components/picture_group/class/PictureGroupData";
import Page from "../../../backoffice/page/class/Page";
import { BASE_URL_SITE } from "../../../../config";
import { RawDraftContentState } from "react-draft-wysiwyg";
import TextReader from "../text_picture/texte/text_reader";

interface CardDatas {
  width: number;
  height: number;
  toggle: boolean;
  data: PictureGroupCard;

  full: boolean;
  isResponsive: boolean;
}

function CardData({
  width,
  height,
  data,
  toggle,

  full,
  isResponsive,
}: CardDatas) {
  const result = window.matchMedia("(max-width: 1200px)");
  const [external, isExternalLink] = useState<boolean>(true);
  const [page, setPage] = useState<Page>();
  const { id } = useParams();
  const [contentState, setContentState] = useState<RawDraftContentState>();
  let style_data: any = undefined;
  if (!Boolean(data.is_data_button)) {
    style_data = {
      background: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url("${BASE_URL_SITE}/api/uploadfile/${data.image_url}") no-repeat center / cover`,
      width: full
        ? isResponsive || result.matches
          ? `350px`
          : `${width}vw`
        : `${width * 0.5}vw`,
      height: full
        ? isResponsive || result.matches
          ? `350px`
          : `${height}vw`
        : `${height * 0.5}vw`,

      marginBottom: "60px",
      boxShadow: "2px 2px 3px rgba(0,0,0,0.2)",
    };
  } else {
    style_data = {
      width: full
        ? isResponsive || result.matches
          ? `350px`
          : `${width}vw`
        : `${width * 0.5}vw`,

      borderRadius: "1px",
      height: full
        ? isResponsive || result.matches
          ? `350px`
          : `fit-content`
        : `fit-content`,
      border: "none",
      backgroundColor: `${data.background_color}`,
      paddingTop: "15px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    };
  }

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
    let concerned_page = new Page(id);
    let page = await concerned_page.get_bloc();
    if (page !== undefined) {
      return page;
    }
  };

  useEffect(() => {
    checkExternal(data.href_url);
  }, [toggle]);
  useEffect(() => {
    id !== undefined && localStorage.setItem("previous_page_id", id);
  }, []);
  useEffect(() => {
    setContentState(typeof data.text === "object" ? data.text : contentState);
  }, [data.text]);
  useEffect(() => {
    setContentState(typeof data.text === "object" ? data.text : contentState);
  }, []);
  return external ? (
    <a
      target="_blank"
      href={data.href_url}
      className={s.card_app_image_group}
      style={style_data}
    >
      {!Boolean(data.is_data_button) ? (
        <div className={s.text_image_group}>
          {contentState !== undefined ? (
            <TextReader
              bloc_input={undefined}
              index={data.card_number}
              read_more={false}
              color={data.background_color}
              toggle={toggle}
              contenState={contentState}
              setContentState={undefined}
              onContentStateChange={undefined}
              isResponsive={isResponsive}
            />
          ) : (
            data.text
          )}
        </div>
      ) : (
        <InsideCardData
          data={data}
          isLightOrDark={isLightOrDark}
          isResponsive={isResponsive}
        />
      )}
    </a>
  ) : (
    <Link
      //
      to={{ pathname: `/` + page?.id + `/` + page?.title }}
      style={style_data}
      className={s.card_app_image_group}
    >
      {!Boolean(data.is_data_button) ? (
        <div className={s.text_image_group}>
          {contentState !== undefined ? (
            <TextReader
              bloc_input={undefined}
              index={data.card_number}
              read_more={false}
              color={data.background_color}
              toggle={toggle}
              contenState={contentState}
              setContentState={undefined}
              onContentStateChange={undefined}
              isResponsive={isResponsive}
            />
          ) : (
            data.text
          )}
        </div>
      ) : (
        <InsideCardData
          data={data}
          isLightOrDark={isLightOrDark}
          isResponsive={isResponsive}
        />
      )}
    </Link>
  );
}

export default CardData;
