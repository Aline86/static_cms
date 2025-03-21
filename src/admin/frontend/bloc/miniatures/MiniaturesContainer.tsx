import { useEffect, useState } from "react";
import Card from "./Card";
import BigCard from "./BigCard";
import fleche from "./img/fleche.png";
import CarouselData from "../../../backoffice/page/page_template/bloc_components/components/carousel/class/CarouselData";
import s from "./styles/style.module.css";

interface CarouselDataValue {
  colors: CarouselData[];
  transitionFinished: boolean;
  cardWidth: number;
  updateCardRef: any;
  updateColors: any;
  cardRef: any;
  updateTransitionState: any;
  width: number;
  height: number;
  gap: number;
  full: boolean;
  setIsClic: any;
  setCardValue: any;
  updateCardEnd: any;
  clic: boolean;
  cardValue: number;
}

function MiniaturesContainer({
  colors,
  transitionFinished,
  cardWidth,
  updateCardRef,
  cardRef,
  updateTransitionState,
  updateColors,
  width,
  gap,
  height,
  full,
  setIsClic,
  setCardValue,
  updateCardEnd,
  clic,
  cardValue,
}: CarouselDataValue) {
  const [trigger, setTrigger] = useState(0);
  const [move, setMove] = useState(0);
  const [isLeft, setIsLeft] = useState(true);

  const [card, setCard] = useState(colors[1]);

  const result = window.matchMedia("(max-width: 700px)");

  function updateCard(e: any) {
    setCard(colors[e.target.getAttribute("data-value")]);
    if (e.target.getAttribute("data-value") > 0) {
      setCardValue(e.target.getAttribute("data-value") - 2);
      setIsClic(true);
      const trans = Number(e.target.getAttribute("data-value")) - 1;
      setMove(-(cardWidth + gap * 0.5) * trans);
      setIsLeft(true);
      setTrigger(trigger + 1);

      updateTransitionState(true);
    }
  }

  function updateTransitionLeft() {
    const popItem = colors.pop();
    if (popItem !== undefined) {
      colors.unshift(popItem);

      updateColors(colors);
      updateTransitionState(true);
    }
  }

  function updateTransitionRight() {
    const shiftItem = colors.shift();
    if (shiftItem !== undefined) {
      colors.push(shiftItem);
      updateColors(colors);

      updateTransitionState(true);
    }
  }

  function moveLeft() {
    setMove(-cardWidth - gap * 0.5);
    setIsLeft(true);
    setTrigger(trigger + 1);
    updateTransitionState(true);
    setCard(colors[2]);
  }

  function moveRight() {
    setMove(cardWidth + gap * 0.5);
    setIsLeft(false);
    setTrigger(trigger + 1);
    updateTransitionState(true);
    setCard(colors[0]);
  }

  useEffect(() => {
    updateCardRef();
    console.log("cardValue", cardValue);
  }, []);

  useEffect(() => {
    if (!isLeft) {
      updateTransitionLeft();
    } else {
      updateTransitionRight();
    }
  }, [trigger]);

  return (
    <div>
      <div className={s.center}>
        <BigCard
          key={-1}
          index={1}
          value={card}
          width={width}
          updateCard={updateCard}
          moveLeft={moveLeft}
          moveRight={moveRight}
          height={height}
        />
      </div>

      <div
        className={s.body}
        style={{
          width: `${result.matches ? "95vw" : !full ? "47vw" : "60vw"}`,
        }}
        onTransitionEnd={() => {
          clic && cardValue > 0 && updateCardEnd();
          updateTransitionState(false);
        }}
      >
        {transitionFinished ? (
          <span
            className={s.left}
            style={{
              marginRight: `${!result.matches ? gap : 0}px`,
              pointerEvents: "none",
            }}
          >
            <img src={fleche} alt="flèche de doite" />
          </span>
        ) : (
          <span
            className={s.left}
            onClick={() => moveRight()}
            style={{
              marginRight: `${!result.matches ? gap : 0}px`,
            }}
          >
            <img src={fleche} alt="flèche de doite" />
          </span>
        )}
        <div
          className={s.container_class}
          style={{
            minWidth: `${cardWidth} px`,
            margin: `${gap}px auto`,
            height: `${
              !result.matches ? height * 0.5 + 2 : height * 0.3 + 3
            }vw`,
            width: `${result.matches ? "95vw" : !full ? "43vw" : "60vw"}`,
          }}
        >
          <div
            className={s.card_container}
            style={{
              minWidth: `fit-content`,
              transform: `translateX(${-cardWidth - gap / 2}px)`,
            }}
          >
            <div className={s.cards}>
              {colors !== undefined &&
                colors.map((value: CarouselData, index: number) => {
                  return (
                    <Card
                      key={index}
                      index={index}
                      value={value}
                      cardRef={cardRef}
                      transitionFinished={transitionFinished}
                      trasnsType={"transform 0.4s ease-in"}
                      transX={move}
                      width={width}
                      height={height}
                      updateCard={updateCard}
                      toggle={false}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        {transitionFinished ? (
          <span
            className={s.right}
            style={{
              marginLeft: `${!result.matches ? gap : gap * 0.5}px`,
              pointerEvents: "none",
              color: "lightgray",
            }}
          >
            <img src={fleche} alt="flèche de gauche" />
          </span>
        ) : (
          <span
            className={s.right}
            onClick={() => moveLeft()}
            style={{
              marginLeft: `${!result.matches ? gap : gap * 0.5}px`,
            }}
          >
            <img src={fleche} alt="flèche de gauche" />
          </span>
        )}
      </div>
    </div>
  );
}

export default MiniaturesContainer;
