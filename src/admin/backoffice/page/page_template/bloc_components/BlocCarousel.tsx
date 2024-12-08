import { Carousel } from "../../../bloc/components/carousel/class/Carousel";
import CssCarouselPosition from "../../../bloc/components/carousel/css_bloc_position/CssBlocPosition";
import CarouselOption2 from "../../../bloc/components/carousel/carousel_2/component";
import CarouselOption1 from "../../../bloc/components/carousel/carousel_1/component";
import CarouselVisualization from "../../../../frontend/bloc/carousel/Carousel";
import ShrinkParams from "./snippets/shrink_params";

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
}

function BlocCarousel({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  removeBloc,
  updateCarousel,
  saveBloc,
  saveBlocAll,
  drag,
  toggle,
  page_id,
  index,
  refresh,
}: BlocData) {
  return (
    <div
      className="blocs"
      draggable={drag}
      onDragStart={() => setDragBegin(index)}
      onDragOver={handleDragOver}
      onDrop={() => updateDragBloc(index)}
      key={index}
    >
      <ShrinkParams
        key={index}
        setDragBegin={setDragBegin}
        updateDragBloc={updateDragBloc}
        drag={drag}
        index={index + 1}
        bloc={bloc}
        handleDragOver={handleDragOver}
        removeBloc={removeBloc}
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
              bloc.isAutomatique ? (
                <CarouselOption2
                  updateCarousel={updateCarousel}
                  toggle={toggle}
                  bloc={bloc}
                />
              ) : (
                <CarouselOption1
                  updateCarousel={updateCarousel}
                  toggle={toggle}
                  bloc={bloc}
                />
              )
            }
            updateCarousel={updateCarousel}
            context={"carousel"}
            bloc={bloc}
            draggable={drag}
            saveBloc={saveBloc}
            page_id={page_id}
            saveBlocAll={saveBlocAll}
          />
        }
      />
    </div>
  );
}
export default BlocCarousel;
