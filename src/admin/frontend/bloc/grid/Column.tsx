import { useEffect } from "react";
import s from "./styles/style.module.css";
import PictureGroupData from "../../../backoffice/bloc/components/picture_group/class/PictureGroupData";
import CardDataGrid from "./CardData";

interface ColumnData {
  props: any;
}
function Column({ props }: ColumnData) {
  useEffect(() => {}, []);
  return (
    <div className={s.column}>
      {props.map((value: PictureGroupData, index: number) => {
        return (
          <CardDataGrid key={index} data={value} index={value.card_number} />
        );
      })}
    </div>
  );
}

export default Column;
