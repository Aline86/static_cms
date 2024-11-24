import { useEffect, useState } from "react";

import s from "./styles/style.module.css";
import CardData from "./CardData";

import Bouton from "../bouton/bouton";
import PictureGroupCard from "../../../backend/bloc/components/picture_group/class/PictureGroupData";
import { PictureGroup } from "../../../backend/bloc/components/picture_group/class/PictureGroup";

interface CarouselData {
  bloc: PictureGroup;
  transitionFinished: boolean;
  cardWidth: number;
  updateCardRef: any;
  updateDataValue: any;
  cardRef: any;
  updateTransitionState: any;

  cardNumber: number;
  data: PictureGroupCard[] | undefined;
  resize: number;
  type: string;
  toggle: boolean;
  full: boolean;
  isResponsive: boolean;
}

function PictureGroupContainer({
  bloc,
  transitionFinished,
  cardWidth,
  updateCardRef,
  cardRef,
  updateTransitionState,
  updateDataValue,
  cardNumber,
  data,
  resize,
  type,
  toggle,
  full,
  isResponsive,
}: CarouselData) {
  const [trigger, setTrigger] = useState(false);
  const [move, setMove] = useState(0);
  const [isLeft, setIsLeft] = useState(true);
  const [firstchick, setFirstClick] = useState(0);

  const result = window.matchMedia("(max-width: 700px)");

  function updateTransitionLeft() {
    if (data !== undefined) {
      const popItem = data.pop();
      if (popItem !== undefined) {
        data.unshift(popItem);

        updateDataValue(data);
        updateTransitionState(true);
      }
    }
  }

  function updateTransitionRight() {
    if (data !== undefined) {
      const shiftItem = data.shift();
      if (shiftItem !== undefined) {
        data.push(shiftItem);
        updateDataValue(data);
        updateTransitionState(true);
      }
    }
  }

  function moveLeft() {
    setMove(-cardWidth - 15);
    setIsLeft(true);
    setTrigger(!trigger);
    updateTransitionState(true);
    setFirstClick(firstchick + 1);
  }

  function moveRight() {
    setMove(cardWidth + 15);
    setIsLeft(false);
    setTrigger(!trigger);
    updateTransitionState(true);
    setFirstClick(firstchick + 1);
  }
  function updateTransitionRightA() {
    if (data !== undefined) {
      const popItem = data.shift();
      if (popItem !== undefined) {
        data.push(popItem);
        updateDataValue(data);
      }
      updateTransitionState(false);
    }
  }
  function reorder() {
    if (data !== undefined) {
      let reordered_data_datas = [];
      let i = 0;
      let first = data[data.length - 1];
      console.log(data.length - 1);
      reordered_data_datas.push(first);
      while (i < data.length - 1) {
        reordered_data_datas.push(data[i]);
        i++;
      }
      updateDataValue(reordered_data_datas);
    }
  }
  function moveRightA() {
    setTrigger(!trigger);

    setMove(-cardWidth - bloc.gap / 2);

    updateTransitionState(true);
  }

  useEffect(() => {
    if (data !== undefined) {
      updateCardRef();
      if (type === "auto") {
        reorder();
        setTrigger(!trigger);
      }
    }
  }, []);
  useEffect(() => {
    updateCardRef();
  }, [isResponsive]);
  useEffect(() => {
    if (type === "carousel") {
      if (!isLeft && firstchick > 0) {
        updateTransitionLeft();
      } else if (firstchick > 0) {
        updateTransitionRight();
      }
    }
    if (type === "auto") {
      const interval = setInterval(() => {
        if (!transitionFinished) {
          moveRightA();
        }
        if (transitionFinished) {
          updateTransitionRightA();
        }
        setTrigger(!trigger);
      }, 2000);

      //Clearing the interval
      return () => clearInterval(interval);
    }
  }, [trigger]);

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
              !isResponsive
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
                    trigger={trigger}
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
