import { useEffect, useState, useRef, createRef } from "react";
import s from "./styles/style.module.css";
import { PictureGroup } from "../../../backoffice/bloc/components/picture_group/class/PictureGroup";
import PictureGroupCard from "../../../backoffice/bloc/components/picture_group/class/PictureGroupData";
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

  const [resize, setResize] = useState(window.innerWidth);
  const result = window.matchMedia("(max-width: 1000px)");

  function updateDataValue(cards: PictureGroupCard[]) {
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
          data={dataValue}
          toggle={toggle}
          full={full}
          isResponsive={isResponsive}
        />
      )}
    </div>
  );
}

export default PictureGroupVizualisation;
