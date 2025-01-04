import s from "./style/style.module.css";

import CardData from "./wrapper";
import { PictureGroup } from "../class/PictureGroup";
import PictureGroupData from "../class/PictureGroupData";

interface ImageGroupData {
  toggle: boolean;
  updatePictureGroupData: any;
  bloc: PictureGroup;
}

function ImageGroup({ toggle, updatePictureGroupData, bloc }: ImageGroupData) {
  const show_remove = bloc.picture_group_data.length > 2 ? true : false;
  return (
    <div className={s.body}>
      <div
        className={s.cards}
        style={{
          minHeight: `${bloc.height}px`,
          width: `100%`,
          height: `fit-content`,
          display: "grid",
          gridTemplateColumns: `repeat(2, 1fr)`,
          gap: `${bloc.gap}px`,
          justifyContent: "space-around",
        }}
      >
        {bloc.picture_group_data.map(
          (value: PictureGroupData, index: number) => {
            return (
              <div
                className={s.cards}
                style={{ height: `fit-content` }}
                key={index}
              >
                <CardData
                  gap={bloc.gap}
                  bloc={bloc}
                  data={value}
                  toggle={toggle}
                  index={index}
                  updatePictureGroupData={updatePictureGroupData}
                  show_remove={show_remove}
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
export default ImageGroup;
