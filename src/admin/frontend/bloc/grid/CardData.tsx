import s from "./styles/style.module.css";
import { BASE_URL_SITE } from "../../../../config";
import PictureGroupData from "../../../backoffice/page/page_template/bloc_components/components/picture_group/class/PictureGroupData";

interface CardDatas {
  data: PictureGroupData;
  index: number;
  isResponsive: boolean;
}

function CardDataGrid({ data, index, isResponsive }: CardDatas) {
  const img_url = BASE_URL_SITE + "/api/uploadfile/" + data.image_url;

  return data.image_url !== "" ? (
    <img
      style={{ marginTop: isResponsive ? "0" : "8px" }}
      src={img_url}
      alt={data.title}
    />
  ) : (
    <div className={s.card_item}>{Number(index + 1)}</div>
  );
}

export default CardDataGrid;
