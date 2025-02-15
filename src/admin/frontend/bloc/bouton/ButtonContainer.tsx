import { Button } from "../../../backoffice/page/page_template/bloc_components/components/button/class/Button";
import Bouton from "./bouton";

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
