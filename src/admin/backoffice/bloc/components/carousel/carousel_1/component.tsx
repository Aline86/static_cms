import { Carousel } from "../class/Carousel";
import CarouselData from "../class/CarouselData";
import s from "./style/style.module.css";
import ajout from "./../../../../../../assets/ajouter.png";
import CardData from "./wrapper";

interface CardDatas {
  toggle: boolean;
  updateCarousel: any;
  bloc: Carousel;
}

function CarouselOption1({ toggle, updateCarousel, bloc }: CardDatas) {
  const result = window.matchMedia("(max-width: 1000px)");
  const show_remove =
    bloc !== undefined &&
    bloc.carousel_data !== undefined &&
    bloc.carousel_data.length > 4
      ? true
      : false;

  return (
    <div className={s.body}>
      <div
        className={s.addCard}
        onClick={(e) => {
          e.preventDefault();
          updateCarousel(e, "ajout", bloc);
        }}
      >
        <img src={ajout} alt="ajout" />
      </div>
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
export default CarouselOption1;
