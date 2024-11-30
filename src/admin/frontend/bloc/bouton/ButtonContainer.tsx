import { useEffect, useState } from "react";

import s from "./styles/style.module.css";

import Bouton from "./bouton";

import ButtonCard from "../../../backend/bloc/components/button/class/ButtonCard";
import { Button } from "../../../backend/bloc/components/button/class/Button";
import InsideButton from "./InsideButton";

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
      data={bloc.button_data}
    />
  );
}

export default CarouselContainer;
