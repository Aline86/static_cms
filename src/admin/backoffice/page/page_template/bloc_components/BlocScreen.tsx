import BlockContainer from "./snippets/BlockContainer";

import { Screen } from "./components/screen/class/Screen";
import ScreenVizualisation from "../../../../frontend/bloc/screen/screen";
import CssScreenPosition from "./components/screen/css_bloc_position/CssScreenPosition";
import ScreenInput from "./components/screen/screen_template/screen_input";

interface BlocData {
  bloc: Screen;
  setDragBegin: any;
  updateDragBloc: any;
  handleDragOver: any;
  updateScreen: any;
  removeBloc: any;
  saveBlocAll: any;
  drag: boolean;
  toggle: boolean;
  index: number;
  isOpen: boolean;
  handleDragLeave: any;
}

function BlocScreen({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  removeBloc,
  updateScreen,
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
        <ScreenVizualisation
          bloc={bloc}
          isResponsive={false}
          toggle={toggle}
          full={false}
        />
      }
      css_position={
        <CssScreenPosition
          props={
            <ScreenInput
              updateScreen={updateScreen}
              toggle={toggle}
              input_bloc={bloc}
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
export default BlocScreen;
