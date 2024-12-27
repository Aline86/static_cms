import { useEffect, useState } from "react";
import s from "./styles/style.module.css";
import CardData from "./CardData";
import PictureGroupCard from "../../../backoffice/bloc/components/picture_group/class/PictureGroupData";
import { PictureGroup } from "../../../backoffice/bloc/components/picture_group/class/PictureGroup";

interface CarouselData {
  bloc: PictureGroup;

  updateDataValue: any;

  data: PictureGroupCard[] | undefined;

  toggle: boolean;
  full: boolean;
  isResponsive: boolean;
}

function PictureGroupContainer({
  bloc,

  data,

  toggle,
  full,
  isResponsive,
}: CarouselData) {
  const result = window.matchMedia("(max-width: 700px)");

  return (
    <div
      className={s.body_image_group}
      style={{ width: full ? "100%" : "fit-content", height: `fit-content` }}
    >
      <div
        className={s.container_class_image_group}
        style={{
          width: full ? `100%` : "fit-content",
          margin: `30 auto`,
          height: `fit-content`,
        }}
      >
        <div
          className={s.card_container_image_group}
          style={{
            height: `100%`,
            margin: "0 auto",
            width: `100%`,
            textAlign: "center",
          }}
        >
          <div
            className={s.cards_image_group}
            style={
              !isResponsive && !result.matches
                ? {
                    minHeight: `${bloc.height}vh`,
                    height: `fit-content`,
                    display: "grid",
                    gridTemplateColumns: `repeat(2, 1fr)`,
                    textAlign: "center",
                    justifyContent: "center",
                    gap: `30px`,
                    margin: `0 auto`,
                    width: full ? `90vw` : "43vw",
                  }
                : {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    gap: `30px`,
                  }
            }
          >
            {data !== undefined &&
              data.map((value, index) => {
                return (
                  <CardData
                    key={index}
                    width={bloc.width}
                    height={bloc.height}
                    data={value}
                    toggle={toggle}
                    full={full}
                    isResponsive={isResponsive}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PictureGroupContainer;
