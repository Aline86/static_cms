import { Screen } from "../../../bloc/components/screen/class/Screen";
import CssScreenPosition from "../../../bloc/components/screen/css_bloc_position/CssScreenPosition";
import BlockContainer from "./snippets/BlockContainer";
import ScreenInput from "../../../bloc/components/screen/screen_template/screen_input";
import ScreenVizualisation from "../../../../frontend/bloc/screen/screen";

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
          full={false}
          isResponsive={false}
          toggle={toggle}
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
