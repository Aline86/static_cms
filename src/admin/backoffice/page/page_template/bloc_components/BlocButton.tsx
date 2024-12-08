import CssButtonPosition from "../../../bloc/components/button/css_bloc_position/CssButtonPosition";
import ButtonInput from "../../../bloc/components/button/bouton/component";
import { Button } from "../../../bloc/components/button/class/Button";
import ButtonVisualization from "../../../../frontend/bloc/bouton/Button";
import ShrinkParams from "./snippets/shrink_params";

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
            props={
              <ButtonInput
                updateButton={updateButton}
                toggle={toggle}
                bloc={bloc}
              />
            }
            updateButton={updateButton}
            bloc={bloc}
            draggable={drag}
            saveBlocAll={saveBlocAll}
          />
        }
      />
    </div>
  );
}

export default BlocButton;
