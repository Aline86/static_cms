import { useEffect, useState, useRef, createRef } from "react";
import s from "./styles/style.module.css";
import { PictureGroup } from "../../../backend/bloc/components/picture_group/class/PictureGroup";
import PictureGroupCard from "../../../backend/bloc/components/picture_group/class/PictureGroupData";
import PictureGroupContainer from "./PictureGroupContainer";

interface CustomCarouselInfo {
  input_bloc: PictureGroup;
  toggle: boolean;
  refresh: boolean;
  full: boolean;
  isResponsive: boolean;
}
function PictureGroupVizualisation({
  input_bloc,
  toggle,
  refresh,
  full,
  isResponsive,
}: CustomCarouselInfo) {
  const [dataValue, setData] = useState<PictureGroupCard[]>();
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

  function updateDataValue(cards: PictureGroupCard[]) {
    setData(cards);
  }
  function updateType(input_bloc: PictureGroup) {
    const type = input_bloc.isAutomatique
      ? "auto"
      : input_bloc.isCarousel
      ? "carousel"
      : input_bloc.card_number > 1
      ? "images_group"
      : "bouton";
    setType(type);
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
    updateType(input_bloc);
    setData((elRefs) =>
      Array(input_bloc.picture_group_data.length)
        .fill(elRefs)
        .map((_, i) => input_bloc.picture_group_data[i] || createRef())
    );
  }, [toggle, refresh]);
  useEffect(() => {}, [isResponsive]);
  return (
    <div className={s.body_container}>
      {dataValue !== undefined && (
        <PictureGroupContainer
          bloc={input_bloc}
          updateDataValue={updateDataValue}
          transitionFinished={transitionFinished}
          updateTransitionState={updateTransitionState}
          cardWidth={cardWidth}
          updateCardRef={updateCardRef}
          cardRef={cardRef}
          cardNumber={input_bloc.card_number}
          data={dataValue}
          resize={resize}
          type={type}
          toggle={toggle}
          full={full}
          isResponsive={isResponsive}
        />
      )}
    </div>
  );
}

export default PictureGroupVizualisation;
