import Bloc from "../../../../frontend/bloc/text_picture/bloc";
import BlocInput from "../../../bloc/components/text_picture/bloc/bloc_input";
import { TextPicture } from "../../../bloc/components/text_picture/class/TextPicture";
import CssBlocPosition from "../../../bloc/components/text_picture/css_bloc_position/CssBlocPosition";

import s from "./style.module.css";
import remove from "./../../../../../assets/remove.png";
import ajout from "./../../../../../assets/ajouter.png";
import { Carousel } from "../../../bloc/components/carousel/class/Carousel";
import CssCarouselPosition from "../../../bloc/components/carousel/css_bloc_position/CssBlocPosition";
import CarouselOption2 from "../../../bloc/components/carousel/carousel_2/component";
import CarouselOption1 from "../../../bloc/components/carousel/carousel_1/component";
import CarouselVisualization from "../../../../frontend/bloc/carousel/Carousel";
import { PictureGroup } from "../../../bloc/components/picture_group/class/PictureGroup";

import CssPictureGroupPosition from "../../../bloc/components/picture_group/css_bloc_position/CssBlocPosition";
import ImageGroup from "../../../bloc/components/picture_group/image_group/component";
import PictureGroupVizualisation from "../../../../frontend/bloc/picture_group/PictureGroup";
import ShrinkParams from "./snippets/shrink_params";

interface BlocData {
  bloc: PictureGroup;
  setDragBegin: any;
  updateDragBloc: any;
  handleDragOver: any;
  updatePictureGroupData: any;
  removeBloc: any;
  saveBlocAll: any;
  drag: boolean;
  toggle: boolean;
  index: number;
  refresh: boolean;
}

function BlocPictureGroup({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  removeBloc,
  updatePictureGroupData,
  saveBlocAll,
  drag,
  toggle,
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
          <PictureGroupVizualisation
            input_bloc={bloc}
            toggle={toggle}
            refresh={refresh}
            full={false}
            isResponsive={false}
          />
        }
        css_position={
          <CssPictureGroupPosition
            props={
              <ImageGroup
                updatePictureGroupData={updatePictureGroupData}
                toggle={toggle}
                bloc={bloc}
              />
            }
            updatePictureGroupData={updatePictureGroupData}
            bloc={bloc}
            draggable={drag}
            saveBlocAll={saveBlocAll}
          />
        }
        isOpen={true}
      />
    </div>
  );
}
export default BlocPictureGroup;
