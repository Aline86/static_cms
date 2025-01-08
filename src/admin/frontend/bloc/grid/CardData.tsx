import PictureGroupCard from "../../../backoffice/bloc/components/picture_group/class/PictureGroupData";

import { BASE_URL_SITE } from "../../../../config";

interface CardDatas {
  data: PictureGroupCard;
}

function CardDataGrid({ data }: CardDatas) {
  const img_url = BASE_URL_SITE + "/api/uploadfile/" + data.image_url;
  console.log("data", data);
  return <img src={img_url} alt={data.title} />;
}

export default CardDataGrid;
