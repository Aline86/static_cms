import CarouselVisualization from "../../../../frontend/bloc/carousel/Carousel";

import { useEffect } from "react";
import BlockContainer from "./snippets/BlockContainer";
import { Carousel } from "./components/carousel/class/Carousel";
import CarouselOption2 from "./components/carousel/carousel_2/component";
import CssCarouselPosition from "./components/carousel/css_bloc_position/CssBlocPosition";
import CarouselOption1 from "./components/carousel/carousel_1/component";
import CarouselOption3 from "./components/carousel/miniatures/component";
import MiniaturesVisualization from "../../../../frontend/bloc/miniatures/Miniatures";

interface BlocData {
  bloc: Carousel;
  setDragBegin: any;
  updateDragBloc: any;
  handleDragOver: any;
  updateCarousel: any;
  removeBloc: any;
  saveBloc: any;
  saveBlocAll: any;
  drag: boolean;
  toggle: boolean;
  page_id: number;
  index: number;
  refresh: boolean;
  isOpen: boolean;
  handleDragLeave: any;
}

function BlocCarousel({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  removeBloc,
  updateCarousel,
  saveBlocAll,
  drag,
  toggle,
  index,
  refresh,
  isOpen,
  handleDragLeave,
}: BlocData) {
  useEffect(() => {}, []);
  return (
    <BlockContainer
      bloc={bloc}
      setDragBegin={setDragBegin}
      updateDragBloc={updateDragBloc}
      handleDragLeave={handleDragLeave}
      handleDragOver={handleDragOver}
      removeBloc={removeBloc}
      drag={drag}
      index={index}
      isOpen={isOpen}
      component_visualization={
        bloc.carousel_type !== "miniatures" ? (
          <CarouselVisualization
            input_bloc={bloc}
            toggle={toggle}
            refresh={false}
            full={false}
            isResponsive={false}
          />
        ) : (
          <MiniaturesVisualization
            input_bloc={bloc}
            toggle={toggle}
            refresh={false}
            full={false}
            isResponsive={false}
          />
        )
      }
      css_position={
        <CssCarouselPosition
          props={
            bloc.carousel_type === "auto" ? (
              <CarouselOption2 updateCarousel={updateCarousel} bloc={bloc} />
            ) : bloc.carousel_type === "carousel" ? (
              <CarouselOption1 updateCarousel={updateCarousel} bloc={bloc} />
            ) : (
              <CarouselOption3 updateCarousel={updateCarousel} bloc={bloc} />
            )
          }
          updateCarousel={updateCarousel}
          bloc={bloc}
          draggable={drag}
          saveBlocAll={saveBlocAll}
        />
      }
    />
  );
}
export default BlocCarousel;
