import BlockContainer from "./snippets/BlockContainer";
import GridVizualisation from "../../../../frontend/bloc/grid/PictureGroup";
import CssPictureGroupPosition from "./components/picture_group/css_bloc_position/CssBlocPosition";
import GridGroup from "./components/picture_group/grid/component";
import { PictureGroup } from "./components/picture_group/class/PictureGroup";

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
  setToggle: any;
  isOpen: boolean;
  handleDragLeave: any;
}

function BlocGridGroup({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  removeBloc,
  updatePictureGroupData,
  saveBlocAll,
  drag,
  toggle,
  isOpen,
  index,
  refresh,
  setToggle,
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
        <GridVizualisation
          input_bloc={bloc}
          toggle={toggle}
          refresh={refresh}
          isResponsive={false}
        />
      }
      css_position={
        <CssPictureGroupPosition
          props={
            <GridGroup
              updatePictureGroupData={updatePictureGroupData}
              bloc={bloc}
              toggle={toggle}
              setToggle={setToggle}
            />
          }
          updatePictureGroupData={updatePictureGroupData}
          bloc={bloc}
          draggable={drag}
          saveBlocAll={saveBlocAll}
        />
      }
    />
  );
}
export default BlocGridGroup;
