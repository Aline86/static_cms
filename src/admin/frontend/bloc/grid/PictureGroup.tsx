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
function GridVizualisation({
  input_bloc,
  toggle,
  refresh,
  full,
  isResponsive,
}: CustomCarouselInfo) {
  const [dataValue, setData] = useState<PictureGroupCard[]>();

  useEffect(() => {
    setData((elRefs) =>
      Array(input_bloc.picture_group_data.length)
        .fill(elRefs)
        .map((_, i) => input_bloc.picture_group_data[i] || createRef())
    );
  }, [toggle, refresh, input_bloc]);
  useEffect(() => {}, [isResponsive, dataValue]);
  return (
    <div className={s.body_container}>
      {dataValue !== undefined && (
        <PictureGroupContainer data={dataValue} full={full} toggle={toggle} />
      )}
    </div>
  );
}

export default GridVizualisation;
