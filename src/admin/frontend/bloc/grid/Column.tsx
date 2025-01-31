import { useEffect } from "react";
import s from "./styles/style.module.css";
import PictureGroupData from "../../../backoffice/bloc/components/picture_group/class/PictureGroupData";
import CardDataGrid from "./CardData";

interface ColumnData {
  props: any;
  isResponsive: boolean;
}
function Column({ props, isResponsive }: ColumnData) {
  useEffect(() => {}, []);
  return (
    <div
      className={s.column}
      style={
        isResponsive
          ? {
              flex: "90%",
              maxWidth: "90%",
              padding: "0 4px",
              margin: "0 auto",
            }
          : {}
      }
    >
      {props.map((value: PictureGroupData, index: number) => {
        return (
          <CardDataGrid
            key={index}
            data={value}
            index={value.card_number}
            isResponsive={isResponsive}
          />
        );
      })}
    </div>
  );
}

export default Column;
