import BlockContainer from "./snippets/BlockContainer";

import ParallaxeVizualisation from "../../../../frontend/bloc/parallaxe/parallaxe";
import { Parallaxe } from "./components/parallaxe/class/Parallaxe";
import CssParallaxePosition from "./components/parallaxe/css_bloc_position/CssParallaxePosition";
import ParallaxeInput from "./components/parallaxe/bloc/parallaxe_input";

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
  isOpen: boolean;
  handleDragLeave: any;
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
  isOpen,
  handleDragLeave,
}: BlocData) {
  return (
    <BlockContainer
      bloc={bloc}
      setDragBegin={setDragBegin}
      updateDragBloc={updateDragBloc}
      handleDragLeave={handleDragLeave}
      handleDragOver={handleDragOver}
      removeBloc={removeBloc}
      index={index}
      drag={drag}
      isOpen={isOpen}
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
          bloc={bloc}
          draggable={drag}
          saveBlocAll={saveBlocAll}
        />
      }
    />
  );
}
export default BlocParallaxe;
