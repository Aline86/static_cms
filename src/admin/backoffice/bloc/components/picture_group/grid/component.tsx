import s from "./style/style.module.css";
import { PictureGroup } from "../class/PictureGroup";
import PictureGroupData from "../class/PictureGroupData";
import { useEffect, useState } from "react";
import Grid from "./wrapper";
import Picture from "../../../../services/picture";

interface ImageGroupData {
  toggle: boolean;
  updatePictureGroupData: any;
  bloc: PictureGroup;
  setToggle: any;
}

function GridGroup({ updatePictureGroupData, bloc }: ImageGroupData) {
  const show_remove = bloc.picture_group_data.length > 2 ? true : false;

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
