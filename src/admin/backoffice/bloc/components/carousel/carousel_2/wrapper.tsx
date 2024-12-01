import s from "./style/style.module.css";
import remove from "./../../../../../../assets/remove.png";
import CarouselData from "../class/CarouselData";
import { Carousel } from "../class/Carousel";
import DropdownData from "../dropdown/Dropdown";

interface CardDatas {
  width: number;
  height: number;
  gap: number;
  bloc: Carousel;
  data: CarouselData;
  toggle: boolean;
  index: number;
  updateCarousel: any;
  type: string;
  show_remove: boolean;
}

function CardData({
  width,
  height,
  gap,
  data,
  bloc,
  toggle,
  index,
  updateCarousel,
  type,
  show_remove,
}: CardDatas) {
  const result = window.matchMedia("(max-width: 1000px)");

  return (
    <div
      className={s.card_app}
      style={{
        width: "300px",
        minWidth: "300px",
        height: `fit-content`,
        marginRight: `${gap}px`,
      }}
    >
      <div className="button_remove_container">
        {show_remove ? (
          <img
            src={remove}
            alt="suppression box"
            onClick={(e) => {
              updateCarousel(e, "remove", bloc, index);
            }}
          />
        ) : (
          <div
            style={{
              color: "transparent",
              border: "none",
              height: "15px",
              width: "15px",
            }}
          ></div>
        )}
      </div>
      <DropdownData
        bloc={bloc}
        data={data}
        type={"carousel"}
        index={index}
        updateCarousel={updateCarousel}
      />
      <div
        style={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          width: "100%",
        }}
      ></div>

      <div
        style={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          width: "100%",
        }}
      >
        <label>
          <span>Choisir une image</span>
          <input
            type="file"
            className={s.image_url}
            placeholder="Url de l'image"
            onChange={(e) => {
              updateCarousel(e, "image_url", bloc, index);
            }}
          />
        </label>
      </div>

      <input
        className={s.card_text}
        value={data.text}
        placeholder="texte de la carte"
        onChange={(e) => {
          updateCarousel(e, "text", bloc, index);
        }}
      />
    </div>
  );
}

export default CardData;
