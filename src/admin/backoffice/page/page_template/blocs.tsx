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
import BlocHeader from "./bloc_components/BlocHeader";
import Footer from "../../bloc/components/footer/Footer";
import Header from "../../bloc/components/header/Header";
import BlocFooter from "./bloc_components/BlocFooter";
import BlocParallaxe from "./bloc_components/BlocParallaxe";
import { Parallaxe } from "../../bloc/components/parallaxe/class/Parallaxe";

interface BlocData {
  blocs: Array<any>;
  setDragBegin: any;
  dragBegin: number;
  drag: boolean;
  toggle: boolean;
  setBlocs: any;
  setRefresh: any;
  setToggle: any;
  page_id: number;
  refresh: boolean;
  reload_blocs: any;
}

function Blocs({
  blocs,
  setDragBegin,
  dragBegin,
  drag,
  toggle,
  setBlocs,
  refresh,
  setRefresh,
  setToggle,
  page_id,
  reload_blocs,
}: BlocData) {
  const [contentState, setContentState] = useState<RawDraftContentState>();

  // edit with new component type when you add a bloc
  let component_types:
    | Carousel
    | TextPicture
    | PictureGroup
    | Button
    | Video
    | Parallaxe;
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

    setToggle(!toggle);
  };
  const updateVideo = (e: any, field: string, input_bloc: Video) => {
    const new_Bloc = input_bloc.update(e, field);

    blocs[input_bloc.bloc_number - 1] = new_Bloc;

    setBlocs(blocs);

    setToggle(!toggle);
  };
  const updateParallaxe = (e: any, field: string, input_bloc: Parallaxe) => {
    const new_Bloc = input_bloc.update(e, field);

    blocs[input_bloc.bloc_number - 1] = new_Bloc;

    setBlocs(blocs);

    setToggle(!toggle);
  };
  const updatePictureGroupData = (
    e: any,
    field: string,

    input_bloc: PictureGroup,
    index: number
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
  const [header, setHeader] = useState<Header>(new Header());
  const [footer, setFooter] = useState<Footer>(new Footer());
  const savePrerequisites = async () => {
    await saveHeaderAndFooter(header);
    await saveHeaderAndFooter(footer);
  };

  const saveHeaderAndFooter = async (bloc: Header | Footer) => {
    let update = null;
    update = await bloc.save_bloc();
    if (bloc.id === -1) {
      setRefresh(!refresh);
    } else {
      setToggle(!toggle);
    }
  };

  const updateHeader = async (
    e: any,
    field: string,
    input: string | undefined,
    id_network: number | undefined = undefined
  ) => {
    if (header !== undefined) {
      const new_bloc = await header.updateHeader(e, field, input, id_network);
      if (id_network !== undefined) {
        setToggle(!toggle);
      } else {
        setHeader(new_bloc);
        setToggle(!toggle);
      }
    }
  };

  const getHeader = async () => {
    const new_bloc = await header.get_bloc();

    if (new_bloc.id === 1) {
      setHeader(header);
    }
  };
  const getFooter = async () => {
    const new_bloc = await footer.get_bloc();

    if (new_bloc.id === 1) {
      setFooter(new_bloc);
    }
  };
  const getFooterAndHeader = async () => {
    await getHeader();
    await getFooter();
    setToggle(!toggle);
  };
  const updateFooter = async (
    e: any,
    field: string,
    input: string,
    id_network: number | undefined = undefined
  ) => {
    const new_bloc = await footer.updateFooter(e, field, input, id_network);
    if (id_network !== undefined) {
      setToggle(!toggle);
    } else {
      setFooter(new_bloc);
      setToggle(!toggle);
    }
  };

  const adaptRoot = () => {
    let root = document.getElementById("root");
    if (root !== null) {
      root.style.paddingTop = "0px";
      root.style.paddingBottom = "0px";
    }
  };
  useEffect(() => {
    getFooterAndHeader();
    adaptRoot();
  }, []);

  useEffect(() => {
    getFooterAndHeader();
  }, [refresh]);
  useEffect(() => {}, [refresh, toggle, blocs]);
  return (
    <div className={s.blocs_container}>
      <BlocHeader
        bloc={header}
        updateHeader={updateHeader}
        toggle={toggle}
        saveBloc={savePrerequisites}
      />
      {blocs.map((bloc, index) => {
        return bloc.type === "text_picture" ? (
          <BlocTextPicture
            key={index}
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
            key={index}
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
            key={index}
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
            key={index}
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
        ) : bloc.type === "video" ? (
          <BlocVideo
            key={index}
            bloc={bloc}
            setDragBegin={setDragBegin}
            updateDragBloc={updateDragBloc}
            handleDragOver={handleDragOver}
            updateVideo={updateVideo}
            removeBloc={removeBloc}
            saveBlocAll={saveBlocAll}
            drag={drag}
            toggle={toggle}
            refresh={refresh}
            reload_blocs={reload_blocs}
            index={index}
          />
        ) : (
          bloc.type === "parallaxe" && (
            <BlocParallaxe
              key={index}
              bloc={bloc}
              setDragBegin={setDragBegin}
              updateDragBloc={updateDragBloc}
              handleDragOver={handleDragOver}
              updateParallaxe={updateParallaxe}
              removeBloc={removeBloc}
              saveBlocAll={saveBlocAll}
              drag={drag}
              toggle={toggle}
              index={index}
            />
          )
        );
      })}
      <BlocFooter
        bloc={footer}
        updateFooter={updateFooter}
        toggle={toggle}
        saveBloc={savePrerequisites}
      />
    </div>
  );
}

export default Blocs;
