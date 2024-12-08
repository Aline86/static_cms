import s from "./style.module.css";
import { useEffect, useState } from "react";
import { RawDraftContentState } from "draft-js";
import { TextPicture } from "../../bloc/components/text_picture/class/TextPicture";
import { Carousel } from "../../bloc/components/carousel/class/Carousel";
import { PictureGroup } from "../../bloc/components/picture_group/class/PictureGroup";
import { Button } from "../../bloc/components/button/class/Button";
import { Video } from "../../bloc/components/video/class/Video";
import BlocTextPicture from "./bloc_components/BlocTextPicture";
import BlocCarousel from "./bloc_components/BlocCarousel";
import BlocPictureGroup from "./bloc_components/BlocPictureGroup";
import BlocButton from "./bloc_components/BlocButton";
import BlocVideo from "./bloc_components/BlocVideo";

interface BlocData {
  blocs: Array<any>;
  setDragBegin: any;
  dragBegin: number;
  drag: boolean;
  toggle: boolean;
  setBlocs: any;
  setToggle: any;
  page_id: number;
}

function Blocs({
  blocs,
  setDragBegin,
  dragBegin,
  drag,
  toggle,
  setBlocs,
  setToggle,
  page_id,
}: BlocData) {
  const [contentState, setContentState] = useState<RawDraftContentState>();
  const [refresh, setRefresh] = useState(false);
  // edit with new component type when you add a bloc
  let component_types: Carousel | TextPicture | PictureGroup | Button | Video;
  const onContentStateChange = (
    contentState: any,
    input_bloc: TextPicture,
    index: number
  ) => {
    input_bloc.text = contentState;
    blocs[index] = input_bloc;
    setBlocs(blocs);
    setContentState(contentState);
  };
  const updateBloc = (
    e: any,
    field: string,
    input: string,
    input_bloc: TextPicture
  ) => {
    const new_Bloc = input_bloc.update(e, field, input);

    blocs[input_bloc.bloc_number - 1] = new_Bloc;
    setBlocs(blocs);
    setToggle(!toggle);
  };
  const updateButton = (e: any, field: string, input_bloc: Button) => {
    const new_Bloc = input_bloc.update(e, field);

    blocs[input_bloc.bloc_number - 1] = new_Bloc;
    setBlocs(blocs);

    setToggle(!toggle);
  };
  const updateCarousel = (
    e: any,
    field: string,
    input_bloc: Carousel,
    index: number
  ) => {
    const new_Bloc = input_bloc.update(e, field, index);
    blocs[input_bloc.bloc_number - 1] = new_Bloc;
    setBlocs(blocs);
    if (field === "width" || field === "height") {
      setRefresh(!refresh);
    } else {
      setToggle(!toggle);
    }
  };
  const updateVideo = (e: any, field: string, input_bloc: Video) => {
    const new_Bloc = input_bloc.update(e, field);

    blocs[input_bloc.bloc_number - 1] = new_Bloc;

    setBlocs(blocs);

    setToggle(!toggle);
  };
  const updatePictureGroupData = (
    e: any,
    field: string,
    index: number,
    input_bloc: PictureGroup
  ) => {
    const new_Bloc = input_bloc.update(e, field, index);
    blocs[input_bloc.bloc_number - 1] = new_Bloc;
    setBlocs(blocs);
    setToggle(!toggle);
  };

  const removeBloc = async (bloc: typeof component_types) => {
    blocs.splice(blocs.indexOf(bloc), 1);
    setBlocs(blocs);
    await bloc.remove();
    blocs.map(async (bloc_in_blocs: typeof component_types, index) => {
      bloc_in_blocs.update(index + 1, "bloc_number", undefined);
      console.log("bloc", bloc_in_blocs);
      await bloc_in_blocs.save_bloc();
    });
    setRefresh(!refresh);
  };

  const saveBlocAll = async () => {
    let new_bloc_array: any = [];
    blocs.map(async (bloc, index) => {
      bloc.update(index + 1, "bloc_number");
      new_bloc_array.push(bloc);
    });
    setBlocs(new_bloc_array);
    blocs.map(async (bloc_to_save: typeof component_types) => {
      await bloc_to_save.save_bloc();
    });
  };
  const updateDragBloc = async (lastKey: number) => {
    const start = dragBegin;
    const end = lastKey;
    moveElements(start, end);
  };
  const moveElements = (start: number, end: number) => {
    const newItems = [...blocs];
    const draggedItemValue = newItems[start];
    newItems.splice(start, 1);
    newItems.splice(end, 0, draggedItemValue);
    let new_bloc_array: any = [];
    newItems.map(async (bloc: typeof component_types, index) => {
      bloc.set_bloc_number(index + 1);
      new_bloc_array.push(bloc);
    });
    // saving the new info in database
    new_bloc_array.map(async (bloc_to_save: typeof component_types) => {
      await bloc_to_save.save_bloc();
    });
    setBlocs(new_bloc_array);
  };

  const saveBloc = async (bloc: typeof component_types) => {
    bloc.save_bloc();
    setRefresh(!refresh);
  };
  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {}, [refresh, toggle, blocs]);
  return (
    <div className={s.blocs_container}>
      {blocs.map((bloc, index) => {
        return bloc.type === "text_picture" ? (
          <BlocTextPicture
            bloc={bloc}
            setDragBegin={setDragBegin}
            updateDragBloc={updateDragBloc}
            handleDragOver={handleDragOver}
            removeBloc={removeBloc}
            updateBloc={updateBloc}
            saveBloc={saveBloc}
            saveBlocAll={saveBlocAll}
            onContentStateChange={onContentStateChange}
            drag={drag}
            toggle={toggle}
            page_id={page_id}
            index={index}
          />
        ) : bloc.type === "carousel" ? (
          <BlocCarousel
            bloc={bloc}
            setDragBegin={setDragBegin}
            updateDragBloc={updateDragBloc}
            handleDragOver={handleDragOver}
            updateCarousel={updateCarousel}
            removeBloc={removeBloc}
            saveBloc={saveBloc}
            saveBlocAll={saveBlocAll}
            drag={drag}
            toggle={toggle}
            page_id={page_id}
            index={index}
            refresh={refresh}
          />
        ) : bloc.type === "picture_group" ? (
          <BlocPictureGroup
            bloc={bloc}
            setDragBegin={setDragBegin}
            updateDragBloc={updateDragBloc}
            handleDragOver={handleDragOver}
            updatePictureGroupData={updatePictureGroupData}
            removeBloc={removeBloc}
            saveBlocAll={saveBlocAll}
            drag={drag}
            toggle={toggle}
            index={index}
            refresh={refresh}
          />
        ) : bloc.type === "button" ? (
          <BlocButton
            bloc={bloc}
            setDragBegin={setDragBegin}
            updateDragBloc={updateDragBloc}
            handleDragOver={handleDragOver}
            updateButton={updateButton}
            removeBloc={removeBloc}
            saveBlocAll={saveBlocAll}
            drag={drag}
            toggle={toggle}
            index={index}
            refresh={refresh}
          />
        ) : (
          bloc.type === "video" && (
            <BlocVideo
              bloc={bloc}
              setDragBegin={setDragBegin}
              updateDragBloc={updateDragBloc}
              handleDragOver={handleDragOver}
              updateVideo={updateVideo}
              removeBloc={removeBloc}
              saveBlocAll={saveBlocAll}
              drag={drag}
              toggle={toggle}
              index={index}
            />
          )
        );
      })}
    </div>
  );
}

export default Blocs;
