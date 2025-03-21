import { useEffect, useState, useRef, createRef } from "react";

import { Carousel } from "../../../backoffice/page/page_template/bloc_components/components/carousel/class/Carousel";
import CarouselData from "../../../backoffice/page/page_template/bloc_components/components/carousel/class/CarouselData";
import s from "./styles/style.module.css";
import MiniaturesContainer from "./MiniaturesContainer";
interface CustomCarouselInfo {
  input_bloc: Carousel;
  toggle: boolean;
  refresh: boolean;
  full: boolean;
  isResponsive: boolean;
}
function MiniaturesVisualization({
  input_bloc,
  toggle,
  refresh,
  full,
  isResponsive,
}: CustomCarouselInfo) {
  const [dataValue, setData] = useState<CarouselData[]>();
  const [dataToProcess, setDataToProcess] = useState<CarouselData[]>();
  const [, setType] = useState<string>("");

  const [transitionFinished, setTransitionFinished] = useState(false);
  const [cardWidth, setCardWidth] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>();
  const [clic, setIsClic] = useState(false);
  const result = window.matchMedia("(max-width: 700px)");
  const [cardValue, setCardValue] = useState(0);

  function updateCardEnd() {
    document.addEventListener("transitionend", function (e) {
      e.preventDefault();

      if (
        dataValue !== undefined &&
        dataValue.length === input_bloc.card_number
      ) {
        let res = dataValue.splice(0, cardValue);
        console.log("cardValue", cardValue);

        let col = dataValue.concat(res);
        setData(col);
        console.log("col", col);
        setIsClic(false);
      }
    });
  }

  function updateCardRef() {
    const cardWidth: number | undefined = cardRef.current?.clientWidth;
    if (cardWidth !== undefined) {
      if (result.matches) {
        setCardWidth(cardWidth + input_bloc.gap * 0.5);
      } else {
        setCardWidth(cardWidth + input_bloc.gap * 0.5);
      }
    }
  }

  function updateTransitionState(state: boolean) {
    setTransitionFinished(state);
  }

  function updateDataValue(cards: CarouselData[]) {
    setData(cards);
  }
  function updateType(input_bloc: Carousel) {
    const type = input_bloc.carousel_type;
    setType(type);
  }

  function reorder_carousel() {
    if (dataToProcess !== undefined) {
      let reordered_data_cards = [];

      let first = dataToProcess.splice(
        dataToProcess.length - 1,
        dataToProcess.length - 1
      );

      reordered_data_cards = first.concat(dataToProcess);
      return reordered_data_cards;
      //setData(reordered_data_cards);
    }
  }
  useEffect(() => {
    if (!result.matches) {
      updateCardRef();
    }
  }, [result.matches]);
  useEffect(() => {
    updateType(input_bloc);
    setDataToProcess((elRefs) =>
      Array(input_bloc.carousel_data.length)
        .fill(elRefs)
        .map((_, i) => input_bloc.carousel_data[i] || createRef())
    );
  }, [refresh, toggle]);
  useEffect(() => {
    let data = reorder_carousel();
    updateCardRef();
    setData(data);
  }, [result.matches, isResponsive, dataToProcess]);

  return (
    <div className={s.body_container} style={{ marginTop: "30px" }}>
      {dataValue !== undefined &&
        dataValue.length === input_bloc.card_number && (
          <MiniaturesContainer
            width={input_bloc.width}
            height={input_bloc.height}
            gap={input_bloc.gap}
            updateColors={updateDataValue}
            colors={dataValue}
            transitionFinished={transitionFinished}
            updateTransitionState={updateTransitionState}
            cardWidth={cardWidth}
            updateCardRef={updateCardRef}
            cardRef={cardRef}
            setIsClic={setIsClic}
            setCardValue={setCardValue}
            updateCardEnd={updateCardEnd}
            full={full}
            clic={clic}
            cardValue={cardValue}
          />
        )}
    </div>
  );
}

export default MiniaturesVisualization;
