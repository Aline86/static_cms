import { useEffect, useState, useRef, createRef } from "react";

import CarouselContainer from "./ButtonContainer";
import s from "./styles/style.module.css";
import { Button } from "../../../backend/bloc/components/button/class/Button";
import ButtonCard from "../../../backend/bloc/components/button/class/ButtonCard";
import ButtonContainer from "./ButtonContainer";

interface CustomCarouselInfo {
  input_bloc: Button;
  toggle: boolean;
  refresh: boolean;
  full: boolean;
  isResponsive: boolean;
}
function Carousel({
  input_bloc,
  toggle,
  refresh,
  full,
  isResponsive,
}: CustomCarouselInfo) {
  const [dataValue, setData] = useState<ButtonCard>();
  const [type, setType] = useState<string>("");
  const [transitionFinished, setTransitionFinished] = useState(false);
  const [cardWidth, setCardWidth] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>();
  const [resize, setResize] = useState(window.innerWidth);
  const result = window.matchMedia("(max-width: 1000px)");
  function updateCardRef() {
    const cardWidth: number | undefined = cardRef.current?.clientWidth;
    if (cardWidth !== undefined) {
      setCardWidth(cardWidth + input_bloc.gap / 2);
    }
  }

  function updateTransitionState(state: boolean) {
    setTransitionFinished(state);
  }

  function updateDataValue(cards: ButtonCard) {
    setData(cards);
  }

  function updateSize() {
    window.location.reload();
  }
  useEffect(() => {
    if (!result.matches) {
      window.addEventListener("resize", updateSize);
      setResize(window.innerWidth);
    }
  }, [result]);
  useEffect(() => {
    setData(input_bloc.button_data);
  }, [toggle, refresh]);
  useEffect(() => {}, [isResponsive]);
  return (
    <div className={s.body_container}>
      {dataValue !== undefined && (
        <ButtonContainer
          bloc={input_bloc}
          toggle={toggle}
          full={full}
          isResponsive={isResponsive}
        />
      )}
    </div>
  );
}

export default Carousel;
