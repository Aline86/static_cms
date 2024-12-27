import { Carousel } from "../class/Carousel";
import CarouselData from "../class/CarouselData";
import s from "./style/style.module.css";
import CardData from "./wrapper";
import ajout from "./../../../../../../assets/ajouter.png";

interface CardDatas {
  toggle: boolean;
  updateCarousel: any;
  bloc: Carousel;
}

function CarouselOption2({ toggle, updateCarousel, bloc }: CardDatas) {
  const result = window.matchMedia("(max-width: 1000px)");
  const show_remove = bloc.carousel_data.length > 2 ? true : false;
  return (
    <div>
      <div
        className={s.addCard}
        onClick={(e) => {
          e.preventDefault();
          updateCarousel(e, "ajout", bloc);
        }}
      >
        <img src={ajout} alt="ajout" />
      </div>
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
                width={bloc.width * 0.5}
                gap={bloc.gap}
                height={bloc.height * 0.5}
                data={value}
                toggle={toggle}
                index={index}
                updateCarousel={updateCarousel}
                type={"carousel"}
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
