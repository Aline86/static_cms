import { Carousel } from "../../../bloc/components/carousel/class/Carousel";
import CssCarouselPosition from "../../../bloc/components/carousel/css_bloc_position/CssBlocPosition";
import CarouselOption2 from "../../../bloc/components/carousel/carousel_2/component";
import CarouselOption1 from "../../../bloc/components/carousel/carousel_1/component";
import CarouselVisualization from "../../../../frontend/bloc/carousel/Carousel";

import { useEffect } from "react";
import BlockContainer from "./snippets/BlockContainer";

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
        <CarouselVisualization
          input_bloc={bloc}
          toggle={toggle}
          refresh={refresh}
          full={false}
          isResponsive={false}
        />
      }
      css_position={
        <CssCarouselPosition
          props={
            bloc.is_automatique ? (
              <CarouselOption2 updateCarousel={updateCarousel} bloc={bloc} />
            ) : (
              <CarouselOption1 updateCarousel={updateCarousel} bloc={bloc} />
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
