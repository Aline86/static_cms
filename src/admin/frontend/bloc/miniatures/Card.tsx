import { useEffect } from "react";
import CarouselData from "../../../backoffice/page/page_template/bloc_components/components/carousel/class/CarouselData";
import s from "./styles/style.module.css";
import { BASE_URL_SITE } from "../../../../config";

interface CardData {
  value: CarouselData;
  cardRef: any;
  transitionFinished: boolean;
  trasnsType: string;
  transX: number;
  width: number;
  height: number;

  updateCard: any;
  toggle: boolean;

  index: number;
}

function Card({
  value,
  cardRef,
  transitionFinished,
  trasnsType,
  transX,
  width,

  height,
  updateCard,
  toggle,

  index,
}: CardData) {
  useEffect(() => {}, [toggle]);
  const result = window.matchMedia("(max-width: 700px)");
  const image = BASE_URL_SITE + "/api/uploadfile/" + value.image_url;

  const style_data_transition_finished_carousel: any = {
    background: `url("${image}") no-repeat center / contain`,

    width: `${!result.matches ? `${width * 0.5}vw` : `200px`}`,
    height: `${!result.matches ? `${height * 0.5}vw` : `200px`}`,

    pointerEvents: `${index === 1 ? "none" : "pointer"}`,

    //  marginRight: `${!result.matches ? `${gap}px` : `${gap * 0.5}px`}`,
    transform: `translateX(${transX}px)`,
  };

  const style_data_transition_start_carousel: any = {
    background: `url("${image}") no-repeat center / contain`,
    transition: `${trasnsType}`,
    width: `${!result.matches ? `${width * 0.5}vw` : `200px`}`,
    height: `${!result.matches ? `${height * 0.5}vw` : `200px`}`,
    //   marginRight: `${!result.matches ? `${gap}px` : `${gap * 0.5}px`}`,
    pointerEvents: `${index === 1 ? "none" : "pointer"}`,
  };

  if (transitionFinished) {
    return (
      value !== undefined && (
        <div
          className={s.card_app_carousel}
          style={style_data_transition_finished_carousel}
          ref={cardRef}
          key={value.id}
        ></div>
      )
    );
  } else {
    return (
      value !== undefined && (
        <div
          className={s.card_app_carousel}
          style={style_data_transition_start_carousel}
          ref={cardRef}
          key={value.id}
          data-value={index}
          onClick={updateCard}
        ></div>
      )
    );
  }
}

export default Card;
