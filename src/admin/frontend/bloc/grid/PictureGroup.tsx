import { useEffect, useState, createRef } from "react";
import s from "./styles/style.module.css";
import PictureGroupContainer from "./PictureGroupContainer";
import PictureGroupData from "../../../backoffice/page/page_template/bloc_components/components/picture_group/class/PictureGroupData";
import { PictureGroup } from "../../../backoffice/page/page_template/bloc_components/components/picture_group/class/PictureGroup";

interface CustomCarouselInfo {
  input_bloc: PictureGroup;
  toggle: boolean;
  refresh: boolean;
  isResponsive: boolean;
}
function GridVizualisation({
  input_bloc,
  toggle,
  refresh,
  isResponsive,
}: CustomCarouselInfo) {
  const [dataValue, setData] = useState<PictureGroupData[]>();

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
        <PictureGroupContainer
          data={dataValue}
          toggle={toggle}
          isResponsive={isResponsive}
        />
      )}
    </div>
  );
}

export default GridVizualisation;
