import CssButtonPosition from "../../../bloc/components/button/css_bloc_position/CssButtonPosition";
import ButtonInput from "../../../bloc/components/button/bouton/component";
import { Button } from "../../../bloc/components/button/class/Button";
import ButtonVisualization from "../../../../frontend/bloc/bouton/Button";
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
  refresh: boolean;
  isOpen: boolean;
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
  refresh,
  isOpen,
}: BlocData) {
  return (
    <BlockContainer
      bloc={bloc}
      setDragBegin={setDragBegin}
      updateDragBloc={updateDragBloc}
      handleDragOver={handleDragOver}
      removeBloc={removeBloc}
      drag={drag}
      index={index}
      isOpen={isOpen}
      component_visualization={
        <ButtonVisualization
          input_bloc={bloc}
          toggle={toggle}
          refresh={refresh}
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
