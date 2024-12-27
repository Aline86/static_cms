import Bloc from "../../../../frontend/bloc/text_picture/bloc";
import BlocInput from "../../../bloc/components/text_picture/bloc/bloc_input";
import { TextPicture } from "../../../bloc/components/text_picture/class/TextPicture";
import CssBlocPosition from "../../../bloc/components/text_picture/css_bloc_position/CssBlocPosition";
import BlockContainer from "./snippets/BlockContainer";

interface BlocData {
  bloc: TextPicture;
  setDragBegin: any;
  updateDragBloc: any;
  handleDragOver: any;
  updateBloc: any;
  removeBloc: any;
  saveBloc: any;
  saveBlocAll: any;
  onContentStateChange: any;
  drag: boolean;
  toggle: boolean;
  page_id: number;
  index: number;
}

function BlocTextPicture({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  removeBloc,
  updateBloc,
  saveBloc,
  saveBlocAll,
  onContentStateChange,
  drag,
  toggle,
  page_id,
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
        <Bloc
          bloc={bloc}
          num_bloc={index}
          css={bloc.css}
          toggle={toggle}
          full={false}
          index={index}
          isResponsive={false}
        />
      }
      css_position={
        <CssBlocPosition
          props={
            <BlocInput
              input_bloc={bloc}
              draggable={drag}
              updateBloc={updateBloc}
              onContentStateChange={onContentStateChange}
              toggle={toggle}
              index={index}
            />
          }
          updateBloc={updateBloc}
          context={"bloc"}
          bloc={bloc}
          draggable={drag}
          saveBloc={saveBloc}
          page_id={page_id}
          saveBlocAll={saveBlocAll}
        />
      }
    />
  );
}
export default BlocTextPicture;
