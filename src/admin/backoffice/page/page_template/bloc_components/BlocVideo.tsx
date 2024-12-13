import { Video } from "../../../bloc/components/video/class/Video";
import CssVideoPosition from "../../../bloc/components/video/css_bloc_position/CssBlocPosition";
import VideoInput from "../../../bloc/components/video/video_template/video_input";
import VideoVizualisation from "../../../../frontend/bloc/video/video";
import BlockContainer from "./snippets/BlockContainer";

interface BlocData {
  bloc: Video;
  setDragBegin: any;
  updateDragBloc: any;
  handleDragOver: any;
  updateVideo: any;
  removeBloc: any;
  saveBlocAll: any;
  drag: boolean;
  toggle: boolean;
  index: number;
}

function BlocVideo({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  removeBloc,
  updateVideo,
  saveBlocAll,
  drag,
  toggle,
  index,
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
        <VideoVizualisation
          bloc={bloc}
          updateLoaded={undefined}
          full={false}
          isResponsive={false}
          videoLoaded={false}
        />
      }
      css_position={
        <CssVideoPosition
          props={
            <VideoInput
              updateVideo={updateVideo}
              toggle={toggle}
              input_bloc={bloc}
            />
          }
          updateVideo={updateVideo}
          bloc={bloc}
          draggable={drag}
          saveBlocAll={saveBlocAll}
          context={""}
          saveBloc={undefined}
          page_id={bloc.page_id}
        />
      }
    />
  );
}
export default BlocVideo;
