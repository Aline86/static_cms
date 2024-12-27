import { PictureGroup } from "../../../bloc/components/picture_group/class/PictureGroup";
import CssPictureGroupPosition from "../../../bloc/components/picture_group/css_bloc_position/CssBlocPosition";
import ImageGroup from "../../../bloc/components/picture_group/image_group/component";
import PictureGroupVizualisation from "../../../../frontend/bloc/picture_group/PictureGroup";
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
      isOpen={true}
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
              toggle={toggle}
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
