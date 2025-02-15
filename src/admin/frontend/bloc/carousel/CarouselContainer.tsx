import { useEffect, useState } from "react";

import CardDataShow from "./CardDataShow";
import s from "./styles/style.module.css";
import right from "./../../../../assets/right.png";
import left from "./../../../../assets/left.png";
import { Carousel } from "../../../backoffice/page/page_template/bloc_components/components/carousel/class/Carousel";
import CarouselData from "../../../backoffice/page/page_template/bloc_components/components/carousel/class/CarouselData";

interface CarouselDatas {
  bloc: Carousel;
  transitionFinished: boolean;
  cardWidth: number;
  updateCardRef: any;
  updateDataValue: any;
  cardRef: any;
  updateTransitionState: any;
  cardNumber: number;
  data: CarouselData[];
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
  type,
  toggle,
  full,
  isResponsive,
}: CarouselDatas) {
  const [trigger, setTrigger] = useState(false);
  const [move, setMove] = useState(0);
  const [isLeft, setIsLeft] = useState(true);
  const [firstclick, setFirstClick] = useState(0);
  const result = window.matchMedia("(max-width: 1200px)");

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
        width: full ? "100%" : isResponsive ? `360px` : `50vw`,
        margin: `${bloc.gap}px auto`,
        marginBottom: isResponsive || result.matches ? "0px" : "30px",
        marginLeft: isResponsive || result.matches ? "-15px" : "0",
      }}
      key={bloc.bloc_number}
    >
      {!result.matches && !isResponsive && (
        <div
          className={s.left_arrows}
          style={{
            width: full ? (isResponsive ? "360px" : ``) : `43vw`,
          }}
        >
          {type === "carousel" && transitionFinished ? (
            <button
              key={0}
              className={s.left}
              style={{
                pointerEvents: "none",
                /*  marginRight: `${bloc.gap}px`,*/
                color: "lightgray",
              }}
            >
              <img src={left} alt="flèche pour regarder les images de gauche" />
            </button>
          ) : (
            <button
              key={0}
              className={s.left}
              onClick={(e) => {
                e.preventDefault();
                moveRight();
              }}
              /*  style={{ marginRight: `${bloc.gap}px` }}*/
            >
              <img src={left} alt="flèche pour regarder les images de gauche" />
            </button>
          )}

          {type === "carousel" && transitionFinished ? (
            <button
              key={1}
              className={s.right}
              style={{
                /*  marginLeft: `${!result.matches ? bloc.gap : 0}px`,*/
                pointerEvents: "none",
                color: "lightgray",
              }}
            >
              <img
                src={right}
                alt="flèche pour regarder les images de droite"
              />
            </button>
          ) : (
            <button
              key={1}
              className={s.right}
              onClick={(e) => {
                e.preventDefault();
                moveLeft();
              }}
            >
              <img
                src={right}
                alt="flèche pour regarder les images de droite"
              />
            </button>
          )}
        </div>
      )}
      <div
        className={s.arrow_container}
        style={{
          maxWidth: full ? (isResponsive ? "360px" : "100%") : "43vw",
        }}
      >
        <div
          className={s.container_class}
          style={
            isResponsive || result.matches
              ? {
                  minWidth: "360px",
                  /*  margin: `${bloc.gap}px auto`,*/

                  overflowY: "hidden",
                  overflowX: "scroll",
                  height: full
                    ? !result.matches && !isResponsive
                      ? `${Number(bloc.height)}vw`
                      : "220px"
                    : `${Number(bloc.height)}vw`,
                  marginLeft: `15px`,
                  width: full
                    ? ``
                    : `calc(${bloc.width * bloc.card_number}vw + ${
                        bloc.gap * (cardNumber - 1)
                      }px)`,
                }
              : {
                  minWidth: `${cardWidth}px`,
                  height:
                    !isResponsive && !result.matches
                      ? `calc(${bloc.height}vw)`
                      : "180px",
                  width: isResponsive
                    ? `360px`
                    : `calc(${bloc.width * 3}vw + ${bloc.gap * 2}px)`,
                }
          }
        >
          <div
            className={s.card_container}
            style={{
              width: result.matches ? "95vw" : "",
              maxWidth: full && !result.matches ? "calc(100% - 60px)" : "",
              marginLeft:
                full && !result.matches
                  ? "-15px"
                  : result.matches
                  ? "15px"
                  : "",

              height: `fit-content`,
              transform: full
                ? !result.matches && !isResponsive
                  ? `translateX(calc(${-bloc.width}vw - 15px) )`
                  : !isResponsive
                  ? `translateX(0vw)`
                  : `translateX(0vw )`
                : `translateX(calc(${-bloc.width}vw - 15px) )`,
            }}
          >
            <div
              className={s.cards}
              style={{
                height: full
                  ? !result.matches && !isResponsive
                    ? `${Number(bloc.height)}vw`
                    : "220px"
                  : `${Number(bloc.height)}vw`,
              }}
            >
              {data !== undefined &&
                data.map((value, index) => {
                  return (
                    <div key={index}>
                      <CardDataShow
                        key={index}
                        type={type}
                        cardRef={cardRef}
                        transitionFinished={transitionFinished}
                        trasnsType={"transform 0.5s ease-in"}
                        transX={move}
                        width={full ? bloc.width : bloc.width}
                        gap={bloc.gap}
                        height={bloc.height}
                        value={value}
                        toggle={toggle}
                        full={full}
                        isResponsive={isResponsive}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    type === "auto" && (
      <div
        key={bloc.bloc_number}
        className={s.container_class_auto}
        style={{
          margin: !full ? `${bloc.gap}px auto` : `0px`,
          height: isResponsive ? `230px` : `fit-content`,
          paddingTop: isResponsive ? `120px` : result.matches ? `30px` : `0px`,
          minHeight: isResponsive || result.matches ? `200px` : `fit-content`,
          width: full ? (isResponsive ? `380px` : `100vw`) : `45vw`,
          marginBottom: result.matches ? "60px" : isResponsive ? "60px" : "0",
        }}
      >
        <div
          className={s.card_container_auto}
          style={{
            transform: `translateX(${-cardWidth * 2 + 1 * bloc.gap}px)`,
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
                    width={full ? (isResponsive ? `380px` : `100%`) : `45vw`}
                    gap={bloc.gap}
                    height={bloc.height}
                    value={value}
                    toggle={toggle}
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
