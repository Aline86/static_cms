import { Carousel } from "../class/Carousel";
import CarouselData from "../class/CarouselData";
import s from "./style/style.module.css";
import CardData from "./wrapper";

interface CardDatas {
  updateCarousel: any;
  bloc: Carousel;
}

function CarouselOption2({ updateCarousel, bloc }: CardDatas) {
  const show_remove = bloc.carousel_data.length > 2 ? true : false;
  return (
    <div>
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
      <div
        className={s.container_class}
        style={{
          margin: `${bloc.gap}px auto`,
          height: `fit-content`,
          overflowX: "scroll",
        }}
      >
        {bloc.carousel_data.map((value: CarouselData, index: number) => {
          return (
            <div
              className={s.cards}
              style={{ height: `fit-content` }}
              key={index}
            >
              <CardData
                key={index}
                gap={bloc.gap}
                data={value}
                index={index}
                updateCarousel={updateCarousel}
                show_remove={show_remove}
                bloc={bloc}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default CarouselOption2;
