import VideoVizualisation from "../../../../frontend/bloc/video/video";
import { Video } from "./components/video/class/Video";
import CssVideoPosition from "./components/video/css_bloc_position/CssBlocPosition";
import VideoInput from "./components/video/video_template/video_input";
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
  reload_blocs: any;
  refresh: boolean;
  toggle: boolean;
  index: number;
  isOpen: boolean;
  handleDragLeave: any;
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
  reload_blocs,
  refresh,
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
        <VideoVizualisation bloc={bloc} full={false} isResponsive={false} />
      }
      css_position={
        <CssVideoPosition
          props={
            <VideoInput
              updateVideo={updateVideo}
              toggle={toggle}
              input_bloc={bloc}
              refresh={refresh}
              reload_blocs={reload_blocs}
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
export default BlocVideo;
