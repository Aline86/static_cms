import { useSwipeable } from "react-swipeable";
import CarouselData from "../../../backoffice/page/page_template/bloc_components/components/carousel/class/CarouselData";
import s from "./styles/style.module.css";
import { BASE_URL_SITE } from "../../../../config";
interface CardData {
  value: CarouselData;
  height: number;
  width: number;
  updateCard: any;
  index: number;
  moveLeft: any;
  moveRight: any;
}

function BigCard({
  value,
  width,
  height,
  updateCard,
  index,
  moveLeft,
  moveRight,
}: CardData) {
  const result = window.matchMedia("(max-width: 700px)");
  const image = BASE_URL_SITE + "/api/uploadfile/" + value.image_url;

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => moveLeft(),
    onSwipedRight: () => moveRight(),
  });
  return (
    <div style={{ transition: "transform 0.4s ease-in-out" }}>
      <div
        {...swipeHandlers}
        onClick={updateCard}
        className={s.card_app_big}
        data-value={index}
        style={{
          background: `url("${image}") no-repeat center / contain`,

          transform: `translate(${width}px)`,
          height: `${!result.matches ? `${height * 1.5}vw` : `${height}vw`}`,
          width: `${!result.matches ? `${width * 1.5}vw` : `${width}vw`}`,
          margin: `0 auto`,
        }}
      ></div>
    </div>
  );
}

export default BigCard;
