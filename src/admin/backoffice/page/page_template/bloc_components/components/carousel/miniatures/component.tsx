import { Carousel } from "../class/Carousel";
import CarouselData from "../class/CarouselData";
import s from "./style/style.module.css";
import CardData from "./wrapper";

interface CardDatas {
  updateCarousel: any;
  bloc: Carousel;
}

function CarouselOption3({ updateCarousel, bloc }: CardDatas) {
  const show_remove =
    bloc !== undefined &&
    bloc.carousel_data !== undefined &&
    bloc.carousel_data.length > 4
      ? true
      : false;

  return (
    <div className={s.body}>
      <label
        className={s.addCard}
        onClick={(e) => {
          e.preventDefault();
          updateCarousel(e, "ajout", bloc);
        }}
      >
        <span style={{ textTransform: "uppercase", width: "220px" }}>
          Ajouter un élément +
        </span>
      </label>
      {bloc !== undefined &&
        bloc.carousel_data !== undefined &&
        bloc.carousel_data.map((value: CarouselData, index: number) => {
          return (
            <div
              className={s.cards}
              style={{ paddingBottom: "50px", height: "fit-content" }}
              key={index}
            >
              <CardData
                bloc={bloc}
                gap={bloc.gap}
                data={value}
                index={index}
                updateCarousel={updateCarousel}
                show_remove={show_remove}
              />
            </div>
          );
        })}
    </div>
  );
}
export default CarouselOption3;
