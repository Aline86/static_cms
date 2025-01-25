import s from "./style.module.css";
import { useEffect, useState, Suspense, lazy } from "react";
import { RawDraftContentState } from "draft-js";
import { TextPicture } from "../../bloc/components/text_picture/class/TextPicture";
import { Carousel } from "../../bloc/components/carousel/class/Carousel";
import { PictureGroup } from "../../bloc/components/picture_group/class/PictureGroup";
import { Button } from "../../bloc/components/button/class/Button";
import { Video } from "../../bloc/components/video/class/Video";
import { Screen } from "../../bloc/components/screen/class/Screen";
import BlocHeader from "./bloc_components/BlocHeader";
import Footer from "../../bloc/components/footer/Footer";
import Header from "../../bloc/components/header/Header";
import BlocFooter from "./bloc_components/BlocFooter";
import { Parallaxe } from "../../bloc/components/parallaxe/class/Parallaxe";

const BlocTextPictureComponent = lazy(
  () => import("./bloc_components/BlocTextPicture")
);
const BlocCarouselComponent = lazy(
  () => import("./bloc_components/BlocCarousel")
);
const BlocPictureGroupComponent = lazy(
  () => import("./bloc_components/BlocPictureGroup")
);
const BlocButtonComponent = lazy(() => import("./bloc_components/BlocButton"));
const BlocVideoComponent = lazy(() => import("./bloc_components/BlocVideo"));

const BlocParallaxeComponent = lazy(
  () => import("./bloc_components/BlocParallaxe")
);
const BlocGridComponent = lazy(() => import("./bloc_components/BlocGrid"));
const BlocScreenComponent = lazy(() => import("./bloc_components/BlocScreen"));

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
  highlight: any;
  setHighlight: any;
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
  highlight,
  setHighlight,
}: BlocData) {
  const [, setContentState] = useState<RawDraftContentState>();

  // edit with new component type when you add a bloc
  let component_types:
    | Carousel
    | TextPicture
    | PictureGroup
    | Button
    | Video
    | Parallaxe
    | Screen;
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
  const updateBloc = async (
    e: any,
    field: string,
    input: string,
    input_bloc: TextPicture
  ) => {
    const new_Bloc = await input_bloc.update(e, field, input);
    blocs !== undefined && setHighlight(new_Bloc);
    blocs[input_bloc.bloc_number - 1] = new_Bloc;
    setBlocs(blocs);
    setToggle(!toggle);
  };
  const updateButton = async (e: any, field: string, input_bloc: Button) => {
    const new_Bloc = await input_bloc.update(e, field);
    blocs !== undefined && setHighlight(new_Bloc);
    blocs[input_bloc.bloc_number - 1] = new_Bloc;
    setBlocs(blocs);

    setToggle(!toggle);
  };
  const updateCarousel = async (
    e: any,
    field: string,
    input_bloc: Carousel,
    index: number
  ) => {
    const new_Bloc = await input_bloc.update(e, field, index);
    if (new_Bloc !== undefined) {
      blocs !== undefined && setHighlight(new_Bloc);
      blocs[input_bloc.bloc_number - 1] = new_Bloc;
      setBlocs(blocs);

      setToggle(!toggle);
    }
  };
  const updateVideo = async (e: any, field: string, input_bloc: Video) => {
    const new_Bloc = await input_bloc.update(e, field);
    if (new_Bloc !== undefined) {
      blocs !== undefined && setHighlight(new_Bloc);
      blocs[input_bloc.bloc_number - 1] = new_Bloc;

      setBlocs(blocs);

      setToggle(!toggle);
    }
  };

  const updateScreen = async (e: any, field: string, input_bloc: Video) => {
    const new_Bloc = await input_bloc.update(e, field);
    if (new_Bloc !== undefined) {
      blocs !== undefined && setHighlight(new_Bloc);
      blocs[input_bloc.bloc_number - 1] = new_Bloc;

      setBlocs(blocs);

      setToggle(!toggle);
    }
  };
  const updateParallaxe = async (
    e: any,
    field: string,
    input_bloc: Parallaxe
  ) => {
    const new_Bloc = await input_bloc.update(e, field);
    if (new_Bloc !== undefined) {
      blocs !== undefined && setHighlight(new_Bloc);
      blocs[input_bloc.bloc_number - 1] = new_Bloc;

      setBlocs(blocs);

      setToggle(!toggle);
    }
  };
  const updatePictureGroupData = async (
    e: any,
    field: string,

    input_bloc: PictureGroup,
    index: number
  ) => {
    const new_Bloc = await input_bloc.update(e, field, index);
    if (new_Bloc !== undefined) {
      blocs !== undefined && setHighlight(new_Bloc);
      blocs[input_bloc.bloc_number - 1] = new_Bloc;
      setBlocs(blocs);

      setToggle(!toggle);
    }
  };

  const removeBloc = async (bloc: typeof component_types) => {
    blocs.splice(blocs.indexOf(bloc), 1);
    setBlocs(blocs);
    await bloc.remove();
    blocs.map(async (bloc_in_blocs: typeof component_types, index) => {
      bloc_in_blocs.update(index + 1, "bloc_number", undefined);

      await bloc_in_blocs.save_bloc();
    });
    setToggle(!toggle);
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
    setRefresh(!refresh);
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

    event.target.style.backgroundColor = "white";
    event.currentTarget.style.fontSize = "50px";
    event.target.style.border = "3px solid lightgray";
  };
  const handleDragLeave = (event: any) => {
    event.preventDefault();
    event.target.style.fontSize = "25px";
    event.target.style.border = "1px solid white";
  };
  const [header, setHeader] = useState<Header>(new Header());
  const [footer, setFooter] = useState<Footer>(new Footer());
  const savePrerequisites = async () => {
    await saveHeaderAndFooter(header);
    await saveHeaderAndFooter(footer);
  };

  const saveHeaderAndFooter = async (bloc: Header | Footer) => {
    await bloc.save_bloc();
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
  }, [refresh, blocs]);
  useEffect(() => {}, [toggle, blocs, highlight]);
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
          <Suspense fallback={<div>Chargement...</div>}>
            <BlocTextPictureComponent
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
              handleDragLeave={handleDragLeave}
              isOpen={
                highlight !== undefined &&
                highlight.bloc_number === bloc.bloc_number
              }
            />
          </Suspense>
        ) : bloc.type === "carousel" ? (
          <Suspense fallback={<div>Chargement...</div>}>
            <BlocCarouselComponent
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
              handleDragLeave={handleDragLeave}
              isOpen={
                highlight !== undefined &&
                highlight.bloc_number === bloc.bloc_number
              }
            />
          </Suspense>
        ) : bloc.type === "picture_group" ? (
          !bloc.is_grid ? (
            <Suspense fallback={<div>Chargement...</div>}>
              <BlocPictureGroupComponent
                key={index}
                bloc={blocs[index]}
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
                handleDragLeave={handleDragLeave}
                isOpen={
                  highlight !== undefined &&
                  highlight.bloc_number === bloc.bloc_number
                }
              />
            </Suspense>
          ) : (
            <Suspense fallback={<div>Chargement...</div>}>
              <BlocGridComponent
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
                setToggle={setToggle}
                index={index}
                handleDragLeave={handleDragLeave}
                refresh={refresh}
                isOpen={
                  highlight !== undefined &&
                  highlight.bloc_number === bloc.bloc_number
                }
              />
            </Suspense>
          )
        ) : bloc.type === "button" ? (
          <Suspense fallback={<div>Chargement...</div>}>
            <BlocButtonComponent
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
              handleDragLeave={handleDragLeave}
              isOpen={
                highlight !== undefined &&
                highlight.bloc_number === bloc.bloc_number
              }
            />
          </Suspense>
        ) : bloc.type === "video" ? (
          <Suspense fallback={<div>Chargement...</div>}>
            <BlocVideoComponent
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
              handleDragLeave={handleDragLeave}
              isOpen={
                highlight !== undefined &&
                highlight.bloc_number === bloc.bloc_number
              }
            />
          </Suspense>
        ) : bloc.type === "parallaxe" ? (
          <Suspense fallback={<div>Chargement...</div>}>
            <BlocParallaxeComponent
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
              handleDragLeave={handleDragLeave}
              isOpen={
                highlight !== undefined &&
                highlight.bloc_number === bloc.bloc_number
              }
            />
          </Suspense>
        ) : (
          <Suspense fallback={<div>Chargement...</div>}>
            <BlocScreenComponent
              key={index}
              bloc={bloc}
              setDragBegin={setDragBegin}
              updateDragBloc={updateDragBloc}
              handleDragOver={handleDragOver}
              updateScreen={updateScreen}
              removeBloc={removeBloc}
              saveBlocAll={saveBlocAll}
              drag={drag}
              toggle={toggle}
              index={index}
              handleDragLeave={handleDragLeave}
              isOpen={
                highlight !== undefined &&
                highlight.bloc_number === bloc.bloc_number
              }
            />
          </Suspense>
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
