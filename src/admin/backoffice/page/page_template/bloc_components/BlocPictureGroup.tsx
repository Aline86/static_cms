import PictureGroupVizualisation from "../../../../frontend/bloc/picture_group/PictureGroup";
import { PictureGroup } from "./components/picture_group/class/PictureGroup";
import CssPictureGroupPosition from "./components/picture_group/css_bloc_position/CssBlocPosition";
import ImageGroup from "./components/picture_group/image_group/component";
import BlockContainer from "./snippets/BlockContainer";

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
  isOpen: boolean;
  handleDragLeave: any;
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
              bloc={bloc}
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
export default BlocPictureGroup;
