import { useEffect } from "react";
import { Carousel } from "../class/Carousel";
import CarouselData from "../class/CarouselData";
import s from "./style/style.module.css";
import CardData from "./wrapper";

interface CardDatas {
  toggle: boolean;
  updateCarousel: any;
  bloc: Carousel;
}

function CarouselOption2({ toggle, updateCarousel, bloc }: CardDatas) {
  const result = window.matchMedia("(max-width: 1000px)");
  const show_remove =
    bloc !== undefined &&
    bloc.carousel_data !== undefined &&
    bloc.carousel_data.length > 2
      ? true
      : false;
  useEffect(() => {}, [toggle, bloc]);
  return (
    <div
      className={s.container_class}
      style={{
        margin: `${bloc.gap}px auto`,
        height: `fit-content`,
        overflowX: "scroll",
      }}
    >
      {bloc !== undefined &&
        bloc.carousel_data !== undefined &&
        bloc.carousel_data.map((value: CarouselData, index: number) => {
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
  );
}
export default CarouselOption2;
