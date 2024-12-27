import { useEffect, useState } from "react";

import CardDataShow from "./CardDataShow";
import s from "./styles/style.module.css";
import CarouselCard from "../../../backoffice/bloc/components/carousel/class/CarouselData";
import { Carousel } from "../../../backoffice/bloc/components/carousel/class/Carousel";

interface CarouselData {
  bloc: Carousel;
  transitionFinished: boolean;
  cardWidth: number;
  updateCardRef: any;
  updateDataValue: any;
  cardRef: any;
  updateTransitionState: any;

  cardNumber: number;
  data: CarouselCard[];
  resize: number;
  type: string;
  toggle: boolean;
  full: boolean;
  isResponsive: boolean;
}

function CarouselContainer({
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
  const [firstclick, setFirstClick] = useState(0);
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
    setFirstClick(firstclick + 1);
  }
  function moveRight() {
    setMove(cardWidth + 15);
    setIsLeft(false);
    setTrigger(!trigger);
    updateTransitionState(true);
    setFirstClick(firstclick + 1);
  }
  function updateTransitionRightA() {
    if (data !== undefined) {
      const popItem = data.pop();
      if (popItem !== undefined) {
        data.unshift(popItem);
        updateDataValue(data);
      }
      updateTransitionState(false);
    }
  }

  function moveRightA() {
    setTrigger(!trigger);
    setMove(-(cardWidth + bloc.gap / 2));
    updateTransitionState(true);
  }

  useEffect(() => {
    if (data !== undefined) {
      updateCardRef();
      if (type === "auto") {
        setTrigger(!trigger);
      }
    }
  }, []);
  useEffect(() => {
    updateCardRef();
  }, [isResponsive, result.matches]);
  useEffect(() => {
    updateCardRef();
    if (type === "carousel") {
      if (!isLeft && firstclick > 0) {
        updateTransitionLeft();
      } else if (firstclick > 0) {
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

  return type === "carousel" ? (
    <div
      className={s.body}
      onTransitionEnd={() => updateTransitionState(false)}
      style={{
        width: full ? "90vw" : "43vw",
        margin: `${bloc.gap}px auto`,

        height: `${bloc.height}vh`,
      }}
    >
      <div
        className={s.arrow_container}
        style={{
          maxWidth: full ? "90vw" : "43vw",
        }}
      >
        {!result.matches ? (
          type === "carousel" && transitionFinished ? (
            <button
              className={s.left}
              style={{
                pointerEvents: "none",
                marginRight: `${bloc.gap}px`,
                color: "lightgray",
              }}
            >
              &#x27E8;
            </button>
          ) : (
            <button
              className={s.left}
              onClick={(e) => {
                e.preventDefault();
                moveRight();
              }}
              style={{ marginRight: `${bloc.gap}px` }}
            >
              <span>&#x27E8;</span>
            </button>
          )
        ) : (
          ""
        )}
        <div
          className={s.container_class}
          style={
            isResponsive || result.matches
              ? {
                  minWidth: `${cardWidth}px`,
                  margin: `${bloc.gap}px auto`,
                  overflow: `scroll`,
                  height: full
                    ? `${Number(bloc.height)}vh`
                    : `${Number(bloc.height) * 0.5}vh`,

                  marginLeft: `15px`,
                  width: `100%`,
                }
              : {
                  minWidth: `${cardWidth}px`,
                  margin: `${bloc.gap}px auto`,

                  height: full
                    ? `${Number(bloc.height)}vh`
                    : `calc(${Number(bloc.height) * 0.5}vh + 2px)`,

                  width: full
                    ? `calc(${bloc.width * cardNumber}vw + ${
                        bloc.gap * cardNumber
                      }px)`
                    : `calc(${bloc.width * 0.5 * cardNumber}vw + ${
                        bloc.gap * cardNumber
                      }px)`,
                }
          }
        >
          <div
            className={s.card_container}
            style={{
              height: `fit-content`,
              transform: !full
                ? `translateX(calc(${-bloc.width * 0.5}vw - ${bloc.gap}px))`
                : !result.matches && !isResponsive
                ? `translateX(calc(${-bloc.width}vw - ${bloc.gap}px))`
                : `translateX(0px))`,
            }}
          >
            <div
              className={s.cards}
              style={{
                height: full
                  ? `${Number(bloc.height)}vh`
                  : `${Number(bloc.height) * 0.5}vh`,
              }}
            >
              {data !== undefined &&
                data.map((value, index) => {
                  return (
                    <CardDataShow
                      key={index}
                      type={type}
                      cardRef={cardRef}
                      transitionFinished={transitionFinished}
                      trasnsType={"transform 0.5s ease-in"}
                      transX={move}
                      width={full ? bloc.width : bloc.width * 0.5}
                      gap={bloc.gap}
                      height={bloc.height}
                      value={value}
                      trigger={trigger}
                      toggle={toggle}
                      resize={resize}
                      full={full}
                      isResponsive={isResponsive}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        {!result.matches ? (
          type === "carousel" && transitionFinished ? (
            <button
              className={s.right}
              style={{
                marginLeft: `${!result.matches ? bloc.gap : 0}px`,
                pointerEvents: "none",
                color: "lightgray",
              }}
            >
              &#x27E9;
            </button>
          ) : (
            <button
              className={s.right}
              onClick={(e) => {
                e.preventDefault();
                moveLeft();
              }}
              style={{ marginLeft: `${bloc.gap}px` }}
            >
              <span>&#x27E9;</span>
            </button>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  ) : (
    type === "auto" && (
      <div
        className={s.container_class_auto}
        style={{
          minWidth: `${cardWidth}px`,
          margin: !full ? `${bloc.gap}px auto` : `auto -25px`,
          height: isResponsive ? `${bloc.height}vh` : `fit-content`,
          paddingTop: isResponsive ? `75px` : result.matches ? `40px` : `0px`,
          minHeight: isResponsive ? `170px` : `fit-content`,
          width: full ? (isResponsive ? `380px` : `100vw`) : `43vw`,
        }}
      >
        <div
          className={s.card_container_auto}
          style={{
            transform: `translateX(${-cardWidth + 0.7 * bloc.gap}px)`,
            height: `fit-content`,
          }}
        >
          <div className={s.cards_auto} style={{ height: `fit-content` }}>
            {data !== undefined &&
              data.map((value, index) => {
                return (
                  <CardDataShow
                    key={index}
                    type={"auto"}
                    cardRef={cardRef}
                    transitionFinished={transitionFinished}
                    trasnsType={"transform 1s ease-in"}
                    transX={move}
                    width={full ? (isResponsive ? `380px` : `100vw`) : `43vw`}
                    gap={bloc.gap}
                    height={bloc.height}
                    value={value}
                    trigger={trigger}
                    toggle={toggle}
                    resize={resize}
                    full={full}
                    isResponsive={isResponsive}
                  />
                );
              })}
          </div>
        </div>
      </div>
    )
  );
}

export default CarouselContainer;
