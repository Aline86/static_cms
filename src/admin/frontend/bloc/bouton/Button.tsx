import { useEffect } from "react";
import s from "./styles/style.module.css";
import ButtonContainer from "./ButtonContainer";
import { Button } from "../../../backoffice/page/page_template/bloc_components/components/button/class/Button";

interface CustomCarouselInfo {
  input_bloc: Button;
  toggle: boolean;
  full: boolean;
  isResponsive: boolean;
}
function ButtonVisualization({
  input_bloc,
  toggle,
  full,
  isResponsive,
}: CustomCarouselInfo) {
  const result = window.matchMedia("(max-width: 1000px)");

  useEffect(() => {}, [result]);

  useEffect(() => {}, [isResponsive]);
  return (
    <div
      className={s.body_container}
      style={{
        marginTop: `${input_bloc.bloc_number === 1 ? "150px" : "60px"}`,
        marginBottom: `30px`,
      }}
    >
      <ButtonContainer
        bloc={input_bloc}
        toggle={toggle}
        full={full}
        isResponsive={isResponsive}
      />
    </div>
  );
}

export default ButtonVisualization;
