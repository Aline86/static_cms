import s from "./styles/style.module.css";
import PictureGroupCard from "../../../backoffice/bloc/components/picture_group/class/PictureGroupData";
import Column from "./Column";
import { useEffect, useState } from "react";

interface CarouselData {
  data: PictureGroupCard[] | undefined;
  toggle: boolean;
  isResponsive: boolean;
}

function PictureGroupContainer({ data, toggle, isResponsive }: CarouselData) {
  const result = window.matchMedia("(max-width: 800px)");
  const [data_break, set_data_break] = useState<any[]>([]);
  const divider = data !== undefined ? Math.ceil(data.length / 2) : undefined;
  const breakpoints =
    data !== undefined && divider !== undefined
      ? Math.ceil(data.length / divider)
      : undefined;

  const add_data = () => {
    if (
      data !== undefined &&
      breakpoints !== undefined &&
      divider !== undefined
    ) {
      let d = [];
      let i = 0;
      while (i <= breakpoints) {
        d.push(i * divider);
        i++;
      }
      set_data_break(d);
    }
  };
  useEffect(() => {
    set_data_break([]);
    add_data();
  }, [toggle]);
  useEffect(() => {}, [data_break]);
  return (
    <div
      className={s.body_image_group}
      style={{
        height: `fit-content`,
        marginTop: "40px",
      }}
    >
      <div className={s.container_class_image_group}>
        <div
          className={s.card_container_image_group}
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <div
            className={s.cards_image_group}
            style={
              result.matches || isResponsive
                ? {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0 4px",
                    margin: "0 auto",
                    width: isResponsive ? "380px" : "90%",
                  }
                : {
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    padding: "0 4px",
                    margin: "0 auto",
                    width: "fit-content",
                  }
            }
          >
            {data_break !== undefined &&
              divider !== undefined &&
              data !== undefined && (
                <Column
                  key={0}
                  props={data.slice(0, divider)}
                  isResponsive={isResponsive}
                />
              )}

            {data !== undefined && divider !== undefined && (
              <Column
                key={1}
                props={data.slice(divider, 2 * divider)}
                isResponsive={isResponsive}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PictureGroupContainer;
