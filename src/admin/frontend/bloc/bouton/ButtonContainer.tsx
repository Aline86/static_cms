import Bouton from "./bouton";

import { Button } from "../../../backoffice/bloc/components/button/class/Button";

interface ButtonData {
  bloc: Button;

  toggle: boolean;
  full: boolean;
  isResponsive: boolean;
}

function CarouselContainer({
  bloc,

  toggle,
  full,
  isResponsive,
}: ButtonData) {
  return (
    <Bouton
      width={bloc.width}
      height={bloc.height}
      toggle={toggle}
      bloc={bloc}
      full={full}
      isResponsive={isResponsive}
    />
  );
}

export default CarouselContainer;
