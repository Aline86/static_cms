import s from "./style.module.css";
import { useEffect, useState } from "react";
import remove from "./../../../../assets/remove.png";
import Shrink from "./shrink/shrink";
import { RawDraftContentState } from "draft-js";
import { TextPicture } from "../../bloc/components/text_picture/class/TextPicture";
import { Carousel } from "../../bloc/components/carousel/class/Carousel";
import CssBlocPosition from "../../../../css_bloc_position/CssBlocPosition";
import BlocInput from "../../bloc/components/text_picture/bloc/bloc_input";
import Bloc from "../../../frontend/bloc/text_picture/bloc";
import CarouselOption1 from "../../bloc/components/carousel/carousel_1/component";
import CarouselOption2 from "../../bloc/components/carousel/carousel_2/component";
import CarouselVisualization from "../../../frontend/bloc/carousel/Carousel";
import CssCarouselPosition from "../../bloc/components/carousel/css_bloc_position/CssBlocPosition";

interface BlocData {
  blocs: Array<any>;
  setDragBegin: any;
  dragBegin: number;
  getAllBlocsPage: any;
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
  getAllBlocsPage,
  drag,
  toggle,
  setBlocs,
  setToggle,
  page_id,
}: BlocData) {
  const [contentState, setContentState] = useState<RawDraftContentState>();
  const [refresh, setRefresh] = useState(false);

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
    input_bloc: TextPicture,
    index: number
  ) => {
    input_bloc.update(e, field, input);

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
    console.log(new_Bloc);
    //blocs[input_bloc.bloc_number - 1] = new_Bloc;

    setBlocs(blocs);
    setToggle(!toggle);
  };
  const removeBloc = async (bloc: Carousel | TextPicture) => {
    /* blocs.map(async (bloc, index) => {
      bloc.update(index, "bloc_number");
      await bloc.save_bloc();
    });*/
    blocs.splice(blocs.indexOf(bloc), 1);
    setBlocs(blocs);
    blocs.map(async (bloc, index) => {
      bloc.update(index + 1, "bloc_number");
      await bloc.save_bloc();
    });
    await bloc.remove();
    setRefresh(!refresh);

    // setRefresh(!refresh);
  };
  /* const updateBlocs = async (lastKey: number) => {
    const new_blocs = updateBlocs(lastKey, dragBegin, blocs);
    new_blocs.map((value, key) => {
   
      new_blocs[key].bloc_numbler = key;
    });
    setBlocs(new_blocs);
    let save = await saveBlocAll();
    if (save === "ok") {
      setToggle(!toggle);
    } else if (blocs.length === 0) {
      setToggle(!toggle);
    }
    setToggle(!toggle);
  };*/
  const saveBlocAll = async () => {
    let i = 0;
    blocs.map(async (bloc: Carousel | TextPicture) => {
      await bloc.save_bloc();
      i++;
    });
    if (i === blocs.length - 1) {
      setRefresh(!refresh);
    }
  };
  const saveBloc = async (bloc: TextPicture | Carousel) => {
    bloc.save_bloc();
    setRefresh(!refresh);
  };
  useEffect(() => {}, [blocs]);
  useEffect(() => {
    getAllBlocsPage();
  }, [refresh]);
  return (
    <div className={s.blocs_container}>
      {blocs.map((value, index) => {
        return value.type === "text_picture" ? (
          <Shrink
            key={index}
            setDragBegin={setDragBegin}
            updateBlocs={undefined}
            drag={drag}
            index={index + 1}
            bloc={value}
            props={
              <div key={index} className={s.drag_bloc}>
                <div className={s.bloc_input}>
                  <div
                    className="button_remove_container"
                    onClick={() => {
                      removeBloc(value);
                    }}
                    style={{ top: "30px", right: "30px" }}
                  >
                    <img src={remove} alt="suppression box" />
                    Supprimer le bloc
                  </div>
                  <CssBlocPosition
                    props={
                      <BlocInput
                        input_bloc={value}
                        draggable={drag}
                        updateBloc={updateBloc}
                        onContentStateChange={onContentStateChange}
                        toggle={toggle}
                        index={index}
                      />
                    }
                    updateBloc={updateBloc}
                    context={"bloc"}
                    bloc={value}
                    draggable={drag}
                    saveBloc={saveBloc}
                    page_id={page_id}
                    saveBlocAll={saveBlocAll}
                  />
                </div>
                <div className={s.bloc}>
                  <Bloc
                    bloc={value}
                    contenstate={contentState}
                    num_bloc={index}
                    css={value.css}
                    toggle={toggle}
                    full={false}
                    setToggle={setToggle}
                    index={0}
                    onContentStateChange={undefined}
                    isResponsive={false}
                  />
                </div>
              </div>
            }
          />
        ) : (
          value.type === "carousel" && (
            <Shrink
              key={index}
              setDragBegin={setDragBegin}
              updateBlocs={updateCarousel}
              drag={drag}
              index={index + 1}
              bloc={value}
              props={
                <div key={index} className={s.drag_bloc}>
                  <div className={s.carousel_input}>
                    <div
                      className="button_remove_container"
                      onClick={(e) => {
                        removeBloc(value);
                      }}
                      style={{ top: "30px", right: "30px" }}
                    >
                      <img src={remove} alt="suppression box" />
                      Supprimer le bloc
                    </div>

                    <CssCarouselPosition
                      props={
                        value.isAutomatique ? (
                          <CarouselOption2
                            updateCarousel={updateCarousel}
                            toggle={toggle}
                            bloc={value}
                          />
                        ) : (
                          <CarouselOption1
                            updateCarousel={updateCarousel}
                            toggle={toggle}
                            bloc={value}
                          />
                        )
                      }
                      updateCarousel={updateCarousel}
                      context={"carousel"}
                      bloc={value}
                      draggable={drag}
                      saveBloc={saveBloc}
                      page_id={page_id}
                      saveBlocAll={saveBlocAll}
                    />
                  </div>
                  <div className={s.carousel}>
                    <CarouselVisualization
                      input_bloc={value}
                      toggle={toggle}
                      refresh={refresh}
                      full={false}
                      isResponsive={false}
                    />
                  </div>
                </div>
              }
            />
          )
        );
      })}
    </div>
  );
}

export default Blocs;
