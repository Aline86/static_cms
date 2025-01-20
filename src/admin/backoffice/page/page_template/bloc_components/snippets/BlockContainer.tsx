import { useEffect } from "react";
import ShrinkParams from "./shrink_params";

interface BlocData {
  bloc: any;
  setDragBegin: any;
  updateDragBloc: any;
  handleDragOver: any;
  removeBloc: any;
  drag: boolean;
  index: number;
  component_visualization: any;
  css_position: any;
  isOpen: boolean;
  handleDragLeave: any | undefined;
}

function BlockContainer({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  removeBloc,
  drag,
  index,
  component_visualization,
  css_position,
  isOpen,
  handleDragLeave,
}: BlocData) {
  useEffect(() => {}, [isOpen]);
  return (
    <div
      className="blocs"
      draggable={drag}
      onDragStart={() => setDragBegin(index)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={() => updateDragBloc(index)}
      key={index}
    >
      <ShrinkParams
        key={index}
        setDragBegin={setDragBegin}
        updateDragBloc={updateDragBloc}
        drag={drag}
        index={index !== -1 ? index + 1 : index}
        bloc={bloc}
        handleDragOver={handleDragOver}
        removeBloc={removeBloc}
        component_visualization={component_visualization}
        css_position={css_position}
        isOpen={isOpen}
      />
    </div>
  );
}

export default BlockContainer;
