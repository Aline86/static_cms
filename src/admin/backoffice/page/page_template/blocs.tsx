import s from "./style.module.css";
import { useEffect, useState } from "react";
import remove from "./../../../../assets/remove.png";
import Shrink from "./shrink/shrink";
import { RawDraftContentState } from "draft-js";
import { TextPicture } from "../../bloc/components/text_picture/class/TextPicture";
import { Carousel } from "../../bloc/components/carousel/class/Carousel";

import BlocInput from "../../bloc/components/text_picture/bloc/bloc_input";
import Bloc from "../../../frontend/bloc/text_picture/bloc";
import CarouselOption1 from "../../bloc/components/carousel/carousel_1/component";
import CarouselOption2 from "../../bloc/components/carousel/carousel_2/component";
import CarouselVisualization from "../../../frontend/bloc/carousel/Carousel";
import CssCarouselPosition from "../../bloc/components/carousel/css_bloc_position/CssBlocPosition";
import ajout from "./../../../../assets/ajouter.png";
import CssPictureGroupPosition from "../../bloc/components/picture_group/css_bloc_position/CssBlocPosition";
import { PictureGroup } from "../../bloc/components/picture_group/class/PictureGroup";

import PictureGroupVizualisation from "../../../frontend/bloc/picture_group/PictureGroup";
import { Button } from "../../bloc/components/button/class/Button";
import ButtonInput from "../../bloc/components/button/bouton/component";

import ButtonVisualization from "../../../frontend/bloc/bouton/Button";
import CssButtonPosition from "../../bloc/components/button/css_bloc_position/CssButtonPosition";
import ImageGroup from "../../bloc/components/picture_group/image_group/component";
import CssBlocPosition from "../../bloc/components/text_picture/css_bloc_position/CssBlocPosition";

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
  const updatePictureGroupData = (
    e: any,
    field: string,
    index: number,
    input_bloc: PictureGroup
  ) => {
    console.log(input_bloc);
    const new_Bloc = input_bloc.update(e, field, index);
    blocs[input_bloc.bloc_number - 1] = new_Bloc;
    setBlocs(blocs);
    setToggle(!toggle);
  };
  const removeBloc = async (
    bloc: Carousel | TextPicture | PictureGroup | Button
  ) => {
    blocs.splice(blocs.indexOf(bloc), 1);
    setBlocs(blocs);
    await bloc.remove();
    blocs.map(
      async (bloc_in_blocs: Carousel | TextPicture | PictureGroup, index) => {
        bloc_in_blocs.update(index + 1, "bloc_number", undefined);
        console.log("bloc", bloc_in_blocs);
        await bloc_in_blocs.save_bloc();
      }
    );
    setToggle(!toggle);
  };

  const saveBlocAll = async () => {
    let new_bloc_array: any = [];
    blocs.map(async (bloc, index) => {
      bloc.update(index + 1, "bloc_number");
      new_bloc_array.push(bloc);
    });
    setBlocs(new_bloc_array);
    blocs.map(
      async (bloc_to_save: Carousel | TextPicture | PictureGroup | Button) => {
        await bloc_to_save.save_bloc();
      }
    );
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
    newItems.map(
      async (bloc: TextPicture | Carousel | PictureGroup | Button, index) => {
        bloc.set_bloc_number(index + 1);
        new_bloc_array.push(bloc);
      }
    );
    // saving the new info in database
    new_bloc_array.map(
      async (bloc_to_save: Carousel | TextPicture | PictureGroup | Button) => {
        await bloc_to_save.save_bloc();
      }
    );
    setBlocs(new_bloc_array);
  };

  const saveBloc = async (
    bloc: TextPicture | Carousel | PictureGroup | Button
  ) => {
    bloc.save_bloc();
    setRefresh(!refresh);
  };
  const handleDragOver = (event: any) => {
    event.preventDefault();
  };
  useEffect(() => {
    // getAllBlocsPage();
  }, [blocs]);
  useEffect(() => {
    // getAllBlocsPage();
  }, [refresh]);
  return (
    <div className={s.blocs_container}>
      {blocs.map((value, index) => {
        return value.type === "text_picture" ? (
          <div
            key={index}
            className="blocs"
            draggable={drag}
            onDragStart={() => setDragBegin(index)}
            onDragOver={handleDragOver}
            onDrop={() => updateDragBloc(index)}
          >
            <Shrink
              key={index}
              setDragBegin={setDragBegin}
              updateDragBloc={updateDragBloc}
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
                      num_bloc={index}
                      css={value.css}
                      toggle={toggle}
                      full={false}
                      index={index}
                      isResponsive={false}
                    />
                  </div>
                </div>
              }
            />
          </div>
        ) : value.type === "carousel" ? (
          <div
            className="blocs"
            draggable={drag}
            onDragStart={() => setDragBegin(index)}
            onDragOver={handleDragOver}
            onDrop={() => updateDragBloc(index)}
            key={index}
          >
            <Shrink
              key={index}
              setDragBegin={setDragBegin}
              updateDragBloc={updateDragBloc}
              drag={drag}
              index={index + 1}
              bloc={value}
              props={
                <div key={index} className={s.drag_bloc}>
                  <div className={s.carousel_input}>
                    {value.card_number > 1 && (
                      <div
                        className={s.addCard}
                        onClick={(e) => {
                          e.preventDefault();
                          updateCarousel(e, "ajout", value, -1);
                        }}
                      >
                        <img src={ajout} />
                      </div>
                    )}
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
          </div>
        ) : value.type === "picture_group" ? (
          <div
            className="blocs"
            draggable={drag}
            onDragStart={() => setDragBegin(index)}
            onDragOver={handleDragOver}
            onDrop={() => updateDragBloc(index)}
            key={index}
          >
            <Shrink
              key={index}
              setDragBegin={setDragBegin}
              updateDragBloc={updateDragBloc}
              drag={drag}
              index={index + 1}
              bloc={value}
              props={
                <div key={index} className={s.drag_bloc}>
                  <div className={s.carousel_input}>
                    {value.card_number > 1 && (
                      <div
                        className={s.addCard}
                        onClick={(e) => {
                          e.preventDefault();
                          updateCarousel(e, "ajout", value, -1);
                        }}
                      >
                        <img src={ajout} />
                      </div>
                    )}
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

                    <CssPictureGroupPosition
                      props={
                        <ImageGroup
                          updatePictureGroupData={updatePictureGroupData}
                          toggle={toggle}
                          bloc={value}
                        />
                      }
                      updatePictureGroupData={updatePictureGroupData}
                      bloc={value}
                      draggable={drag}
                      saveBlocAll={saveBlocAll}
                    />
                  </div>
                  <div className={s.carousel}>
                    <PictureGroupVizualisation
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
          </div>
        ) : (
          value.type === "button" && (
            <div
              className="blocs"
              draggable={drag}
              onDragStart={() => setDragBegin(index)}
              onDragOver={handleDragOver}
              onDrop={() => updateDragBloc(index)}
              key={index}
            >
              <Shrink
                key={index}
                setDragBegin={setDragBegin}
                updateDragBloc={updateDragBloc}
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

                      <CssButtonPosition
                        props={
                          <ButtonInput
                            updateButton={updateButton}
                            toggle={toggle}
                            bloc={value}
                          />
                        }
                        updateButton={updateButton}
                        bloc={value}
                        draggable={drag}
                        saveBlocAll={saveBlocAll}
                      />
                    </div>
                    <div className={s.carousel}>
                      <ButtonVisualization
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
            </div>
          )
        );
      })}
    </div>
  );
}

export default Blocs;
