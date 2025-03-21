import ButtonVisualization from "../../../../frontend/bloc/bouton/Button";
import ButtonInput from "./components/button/bouton/component";
import { Button } from "./components/button/class/Button";
import CssButtonPosition from "./components/button/css_bloc_position/CssButtonPosition";
import BlockContainer from "./snippets/BlockContainer";

interface BlocData {
  bloc: Button;
  setDragBegin: any;
  updateDragBloc: any;
  handleDragOver: any;
  updateButton: any;
  removeBloc: any;
  saveBlocAll: any;
  drag: boolean;
  toggle: boolean;
  index: number;
  isOpen: boolean;
  handleDragLeave: any;
}

function BlocButton({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  removeBloc,
  updateButton,
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
      drag={drag}
      index={index}
      isOpen={isOpen}
      component_visualization={
        <ButtonVisualization
          input_bloc={bloc}
          toggle={toggle}
          full={false}
          isResponsive={false}
        />
      }
      css_position={
        <CssButtonPosition
          props={<ButtonInput updateButton={updateButton} bloc={bloc} />}
          updateBloc={updateButton}
          bloc={bloc}
          draggable={drag}
          saveBlocAll={saveBlocAll}
        />
      }
    />
  );
}

export default BlocButton;
