import { useEffect, useState, useRef, createRef } from "react";
import s from "./styles/style.module.css";
import { Button } from "../../../backoffice/bloc/components/button/class/Button";
import ButtonContainer from "./ButtonContainer";

interface CustomCarouselInfo {
  input_bloc: Button;
  toggle: boolean;
  refresh: boolean;
  full: boolean;
  isResponsive: boolean;
}
function ButtonVisualization({
  input_bloc,
  toggle,
  refresh,
  full,
  isResponsive,
}: CustomCarouselInfo) {
  const [resize, setResize] = useState(window.innerWidth);
  const result = window.matchMedia("(max-width: 1000px)");

  function updateSize() {
    window.location.reload();
  }
  useEffect(() => {
    if (!result.matches) {
      window.addEventListener("resize", updateSize);
      setResize(window.innerWidth);
    }
  }, [result]);

  useEffect(() => {}, [isResponsive]);
  return (
    <div className={s.body_container}>
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
