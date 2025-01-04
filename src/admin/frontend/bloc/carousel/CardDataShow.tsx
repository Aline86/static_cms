import { BASE_URL_SITE } from "../../../../config";
import CarouselData from "../../../backoffice/bloc/components/carousel/class/CarouselData";
import InsideCardDataShow from "./InsideCardDataShow";
import s from "./styles/style.module.css";
import { useEffect } from "react";

interface CardDatas {
  type: string;
  cardRef: any;
  transitionFinished: boolean;
  trasnsType: string;
  transX: number;
  width: number | string;
  height: number;
  gap: number;
  value: CarouselData;
  trigger: boolean;
  resize: number;
  toggle: boolean;
  full: boolean;
  isResponsive: boolean;
}

function CardDataShow({
  type,
  cardRef,
  transitionFinished,
  trasnsType,
  transX,
  width,
  gap,
  height,
  value,
  trigger,
  resize,
  toggle,
  full,
  isResponsive,
}: CardDatas) {
  useEffect(() => {}, [toggle]);
  const result = window.matchMedia("(max-width: 1200px)");

  const style_data_transition_finished_auto = {
    background:
      value.image_url !== ""
        ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(${BASE_URL_SITE}/api/uploadfile/${value.image_url}) no-repeat center / cover`
        : `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0))`,
    width: width,
    height: `200px`,
    transition: `${trasnsType}`,
    transform: `translateX(${width})`,
  };
  const style_data_transition_start_auto = {
    background:
      value.image_url !== ""
        ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(${BASE_URL_SITE}/api/uploadfile/${value.image_url}) no-repeat center / cover`
        : `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0))`,
    width: width,
    height: `200px`,
  };
  const style_data_transition_finished_carousel = {
    marginRight: `${!result.matches && !isResponsive ? gap : 10}px`,
    height: !isResponsive && !result.matches ? `${height}vw` : "200px",
    minHeight: "200px",
    transition: `${trasnsType}`,
    transform: `translateX(${transX}px)`,
  };

  const style_data_transition_start_carousel = {
    marginRight: `${!result.matches && !isResponsive ? gap : 10}px`,
    height: !isResponsive && !result.matches ? `${height}vw` : "200px",
    minHeight: "200px",
  };

  if (type === "auto") {
    if (transitionFinished) {
      return (
        <div
          className={s.card_app_auto}
          style={style_data_transition_finished_auto}
          ref={cardRef}
          key={value.id}
        >
          {value.text.length > 0 && (
            <div
              className={s.card_text}
              style={{
                lineHeight: `fit-content`,
                color: `${value.image_url ? "white" : "gray"}`,
                fontSize: full
                  ? !isResponsive && !result.matches
                    ? `36px`
                    : "22px"
                  : "22px",
              }}
            >
              {value.text}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div
          className={s.card_app_auto}
          ref={cardRef}
          style={style_data_transition_start_auto}
          key={value.id}
        >
          {value.text.length > 0 && (
            <div
              className={s.card_text}
              style={{
                lineHeight: `100%`,
                color: `${value.image_url ? "white" : "gray"}`,
                fontSize: full
                  ? !isResponsive && !result.matches
                    ? `36px`
                    : "22px"
                  : "22px",
              }}
            >
              {value.text}
            </div>
          )}
        </div>
      );
    }
  }
  if (type === "carousel") {
    if (transitionFinished) {
      return (
        <div
          className={s.card_app_carousel}
          style={style_data_transition_finished_carousel}
          ref={cardRef}
          key={value.id}
        >
          <InsideCardDataShow
            value={value}
            width={width}
            height={height}
            full={full}
            result={result}
            isResponsive={isResponsive}
          />

          {value.text.length > 0 && (
            <div className={s.card_app_carousel_text}>
              {value.text.length > 0 && value.text}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div
          className={s.card_app_carousel}
          style={style_data_transition_start_carousel}
          ref={cardRef}
          key={value.id}
        >
          <InsideCardDataShow
            value={value}
            width={width}
            height={height}
            full={full}
            result={result}
            isResponsive={isResponsive}
          />
          {value.text.length > 0 && (
            <div className={s.card_app_carousel_text}>
              {value.text.length > 0 && value.text}
            </div>
          )}
        </div>
      );
    }
  }
}

export default CardDataShow;
