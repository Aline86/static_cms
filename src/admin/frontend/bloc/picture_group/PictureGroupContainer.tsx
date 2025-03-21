import s from "./styles/style.module.css";
import CardData from "./CardData";
import PictureGroupData from "../../../backoffice/page/page_template/bloc_components/components/picture_group/class/PictureGroupData";
import { PictureGroup } from "../../../backoffice/page/page_template/bloc_components/components/picture_group/class/PictureGroup";

interface CarouselData {
  bloc: PictureGroup;
  updateDataValue: any;
  data: PictureGroupData[] | undefined;
  toggle: boolean;
  full: boolean;
  isResponsive: boolean;
}

function PictureGroupContainer({
  bloc,
  data,
  toggle,
  full,
  isResponsive,
}: CarouselData) {
  const result = window.matchMedia("(max-width: 1200px)");

  return (
    <div
      className={s.body_image_group}
      style={{
        width: full ? "100%" : "fit-content",
        height: `fit-content`,
        marginTop: "30px",
      }}
    >
      <div
        className={s.container_class_image_group}
        style={{
          width: full ? `90vw` : "100%",
          margin: `30px auto`,
          height: `fit-content`,
        }}
      >
        <div
          className={s.card_container_image_group}
          style={{
            height: `100%`,
            margin: "0 auto",
            maxWidth: !full ? "calc(45vw)" : "calc(90vw)",
            textAlign: "center",
          }}
        >
          <div
            className={s.cards_image_group}
            style={
              !isResponsive && !result.matches
                ? {
                    display: "flex",
                    flexWrap: "wrap",
                    maxWidth: !full ? "calc(45vw)" : "calc(90vw)",
                    justifyContent: "space-between",
                    height: `fit-content`,
                    gap: `30px`,
                  }
                : {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }
            }
          >
            {data !== undefined &&
              data.map((value, index) => {
                return (
                  <CardData
                    key={index}
                    width={bloc.width}
                    height={bloc.height}
                    data={value}
                    toggle={toggle}
                    full={full}
                    isResponsive={isResponsive}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PictureGroupContainer;
