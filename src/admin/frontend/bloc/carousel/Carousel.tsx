import { useEffect, useState, useRef, createRef } from "react";
import CarouselContainer from "./CarouselContainer";
import s from "./styles/style.module.css";
import CarouselData from "../../../backoffice/page/page_template/bloc_components/components/carousel/class/CarouselData";
import { Carousel } from "../../../backoffice/page/page_template/bloc_components/components/carousel/class/Carousel";

interface CustomCarouselInfo {
  input_bloc: Carousel;
  toggle: boolean;
  refresh: boolean;
  full: boolean;
  isResponsive: boolean;
}
function CarouselVisualization({
  input_bloc,
  toggle,
  refresh,
  full,
  isResponsive,
}: CustomCarouselInfo) {
  const [dataValue, setData] = useState<CarouselData[]>();
  const [dataToProcess, setDataToProcess] = useState<CarouselData[]>();
  const [type, setType] = useState<string>("");
  const [transitionFinished, setTransitionFinished] = useState(false);
  const [cardWidth, setCardWidth] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>();
  const result = window.matchMedia("(max-width: 1200px)");
  function updateCardRef() {
    const cardWidth: number | undefined = cardRef.current?.clientWidth;
    if (cardWidth !== undefined) {
      setCardWidth(cardWidth + input_bloc.gap / 2);
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

  function reorder_automatic() {
    if (dataToProcess !== undefined) {
      let first = dataToProcess.splice(1, 1);
      first !== undefined && dataToProcess.unshift(first[0]);
      let chunk = dataToProcess.splice(2, dataToProcess.length - 1).reverse();
      dataToProcess.push(...chunk);

      setData(dataToProcess);
    }
  }

  function reorder_carousel() {
    if (dataToProcess !== undefined) {
      let reordered_data_cards = [];
      let i = 0;
      let first = dataToProcess[dataToProcess.length - 1];

      reordered_data_cards.push(first);
      while (i < dataToProcess.length - 1) {
        reordered_data_cards.push(dataToProcess[i]);
        i++;
      }
      setData(reordered_data_cards);
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
  }, [toggle, refresh]);
  useEffect(() => {
    if (input_bloc.carousel_type === "auto") {
      reorder_automatic();
    }
    if ((!isResponsive && !result.matches) || !full) {
      reorder_carousel();
    } else {
      updateCardRef();
      setData(dataToProcess);
    }
  }, [result.matches, isResponsive, input_bloc, toggle, dataToProcess]);
  useEffect(() => {}, [isResponsive, input_bloc, dataValue]);

  return (
    <div
      className={s.body_container}
      style={{
        marginTop: `${
          input_bloc.carousel_type === "auto" &&
          isResponsive &&
          input_bloc.bloc_number > 1
            ? "-170px"
            : input_bloc.carousel_type === "auto" &&
              (isResponsive || result.matches) &&
              input_bloc.bloc_number === 1
            ? "-25px"
            : (isResponsive || result.matches) &&
              input_bloc.bloc_number === 1 &&
              input_bloc.carousel_type === "carousel"
            ? "65px"
            : input_bloc.bloc_number === 1 &&
              input_bloc.carousel_type === "auto"
            ? "-10px"
            : "20px"
        }`,
        marginBottom: `${
          input_bloc.carousel_type === "auto" &&
          input_bloc.bloc_number === 1 &&
          result.matches
            ? "-40px"
            : isResponsive && input_bloc.carousel_type === "auto"
            ? "80px"
            : "30px"
        }`,
      }}
    >
      {dataValue !== undefined && (
        <CarouselContainer
          bloc={input_bloc}
          updateDataValue={updateDataValue}
          transitionFinished={transitionFinished}
          updateTransitionState={updateTransitionState}
          cardWidth={cardWidth}
          updateCardRef={updateCardRef}
          cardRef={cardRef}
          cardNumber={input_bloc.card_number}
          data={dataValue}
          type={type}
          toggle={toggle}
          full={full}
          isResponsive={isResponsive}
        />
      )}
    </div>
  );
}

export default CarouselVisualization;
