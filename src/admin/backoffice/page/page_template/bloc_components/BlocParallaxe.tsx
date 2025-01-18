import { Video } from "../../../bloc/components/video/class/Video";
import CssVideoPosition from "../../../bloc/components/video/css_bloc_position/CssBlocPosition";
import VideoInput from "../../../bloc/components/video/video_template/video_input";
import VideoVizualisation from "../../../../frontend/bloc/video/video";
import BlockContainer from "./snippets/BlockContainer";
import { Parallaxe } from "../../../bloc/components/parallaxe/class/Parallaxe";
import ParallaxeVizualisation from "../../../../frontend/bloc/parallaxe/parallaxe";
import CssParallaxePosition from "../../../bloc/components/parallaxe/css_bloc_position/CssParallaxePosition";
import ParallaxeInput from "../../../bloc/components/parallaxe/bloc/parallaxe_input";

interface BlocData {
  bloc: Parallaxe;
  setDragBegin: any;
  updateDragBloc: any;
  handleDragOver: any;
  updateParallaxe: any;
  removeBloc: any;
  saveBlocAll: any;
  drag: boolean;
  toggle: boolean;
  index: number;
}

function BlocParallaxe({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  removeBloc,
  updateParallaxe,
  saveBlocAll,
  drag,
  toggle,
  index,
}: BlocData) {
  return (
    <BlockContainer
      bloc={bloc}
      setDragBegin={setDragBegin}
      updateDragBloc={updateDragBloc}
      handleDragOver={handleDragOver}
      removeBloc={removeBloc}
      index={index}
      drag={drag}
      isOpen={false}
      component_visualization={
        <ParallaxeVizualisation bloc={bloc} full={false} isResponsive={false} />
      }
      css_position={
        <CssParallaxePosition
          props={
            <ParallaxeInput
              updateParallaxe={updateParallaxe}
              input_bloc={bloc}
              toggle={toggle}
              draggable={drag}
            />
          }
          updateParallaxe={updateParallaxe}
          bloc={bloc}
          draggable={drag}
          saveBlocAll={saveBlocAll}
          context={""}
          saveBloc={undefined}
          page_id={bloc.page_id}
        />
      }
    />
  );
}
export default BlocParallaxe;
