import s from "./style/style.module.css";
import { PictureGroup } from "../class/PictureGroup";
import PictureGroupData from "../class/PictureGroupData";
import { useState } from "react";
import Grid from "./wrapper";
import Picture from "../../../../services/picture";

interface ImageGroupData {
  toggle: boolean;
  updatePictureGroupData: any;
  bloc: PictureGroup;
  setToggle: any;
}

function GridGroup({
  toggle,
  updatePictureGroupData,
  bloc,
  setToggle,
}: ImageGroupData) {
  console.log("bloc", bloc);
  const show_remove = bloc.picture_group_data.length > 2 ? true : false;
  const [dragBegin, setDragBegin] = useState(0);
  const [blocData, setBlocData] = useState(bloc);

  const updateDragBloc = async (lastKey: number) => {
    const start = dragBegin;
    const end = lastKey;
    moveElements(start, end);
  };
  const moveElements = async (start: number, end: number) => {
    let newItems = [...blocData.picture_group_data];
    let tmp = newItems[start];
    newItems[start] = newItems[end];
    let new_bloc_array: PictureGroupData[] = [];
    newItems[end] = tmp;
    newItems.map(async (bloc_data: PictureGroupData, index) => {
      bloc_data.card_number = index;
      new_bloc_array.push(bloc_data);
    });
    bloc.set_picture_group_data(new_bloc_array);
    let bloc_result = await bloc.save_bloc();
    console.log("bloc_result", bloc_result);
    setBlocData(bloc_result);
    setToggle(!toggle);
  };
  const handleDragOver = (event: any) => {
    event.preventDefault();
  };
  return (
    <div className={s.body}>
      <div
        className={s.cards}
        style={{
          minHeight: `${bloc.height}px`,

          height: `fit-content`,
          display: "grid",
          gridTemplateColumns: `repeat(2, 1fr)`,
          gap: `${bloc.gap}px`,
          justifyContent: "space-around",
        }}
      >
        {bloc.picture_group_data.map(
          (value: PictureGroupData, index: number) => {
            return (
              <div
                className={s.cards}
                style={{ height: `fit-content` }}
                key={index}
                /* draggable={true}
                onDragStart={() => setDragBegin(index)}
                onDragOver={handleDragOver}
                onDrop={() => updateDragBloc(index)}*/
              >
                <Grid
                  gap={bloc.gap}
                  bloc={bloc}
                  data={value}
                  index={index}
                  updatePictureGroupData={updatePictureGroupData}
                  show_remove={show_remove}
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
export default GridGroup;
