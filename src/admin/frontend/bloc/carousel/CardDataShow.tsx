import CarouselData from "../../../backend/bloc/components/carousel/class/CarouselData";
import InsideCardDataShow from "./InsideCardDataShow";
import s from "./styles/style.module.css";
import { useEffect } from "react";

interface CardDatas {
  type: string;
  cardRef: any;
  transitionFinished: boolean;
  trasnsType: string;
  transX: number;
  width: number;
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
  const result = window.matchMedia("(max-width: 700px)");

  const style_data_transition_finished_auto = {
    background: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url("http://localhost:80/cms_v2/api/uploadfile/${value.image_url}") no-repeat center / cover`,
    width: full ? (isResponsive ? `380px` : `100vw`) : `45vw`,
    height: `${height}vh`,
    transition: `${trasnsType}`,
    transform: `translateX(${transX}px)`,
    fontSize: isResponsive ? `18px` : `24px`,
  };
  const style_data_transition_start_auto = {
    background: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url("http://localhost:80/cms_v2/api/uploadfile/${value.image_url}") no-repeat center / cover`,
    width: full ? (isResponsive ? `380px` : `100vw`) : `45vw`,
    height: `${height}vh`,
    fontSize: isResponsive ? `18px` : `24px`,
  };
  const style_data_transition_finished_carousel = {
    marginRight: `${!result.matches ? gap : 10}px`,
    height: full ? `${height}vh` : `${height}vh`,
    transition: `${trasnsType}`,
    transform: `translateX(${transX}px)`,
  };

  const style_data_transition_start_carousel = {
    marginRight: `${!result.matches ? gap : 10}px`,
    height: full ? `${height}vh` : `${height}vh`,
  };
  if (type === "auto") {
    if (transitionFinished) {
      return (
        <div
          className={s.card_app_auto}
          style={style_data_transition_finished_auto}
          ref={cardRef}
        >
          {value.text.length > 0 && (
            <div className={s.card_text} style={{ lineHeight: `fit-content` }}>
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
        >
          {value.text.length > 0 && (
            <div
              className={s.card_text}
              style={{
                lineHeight: `100%`,
                color: `${value.image_url ? "white" : "gray"}`,
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
