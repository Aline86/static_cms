import s from "./style/style.module.css";
import remove from "./../../../../../../../../assets/remove.png";
import CarouselData from "../class/CarouselData";
import { Carousel } from "../class/Carousel";
import DropdownData from "../dropdown/Dropdown";
import Picture from "../../../../../../services/picture";
import FileUploadWithProgress from "../../../../../../services/FileUploadWithProgress";

interface CardDatas {
  gap: number;
  bloc: Carousel;
  data: CarouselData;
  index: number;
  updateCarousel: any;
  show_remove: boolean;
}

function CardData({
  gap,
  data,
  bloc,
  index,
  updateCarousel,
  show_remove,
}: CardDatas) {
  return (
    <div
      className={s.card_app}
      style={{
        width: "300px",
        minWidth: "300px",
        height: `fit-content`,
        marginRight: `${gap}px`,
      }}
    >
      <div className="button_remove_container">
        {show_remove ? (
          <img
            src={remove}
            alt="suppression box"
            onClick={(e) => {
              updateCarousel(e, "remove", bloc, index);
            }}
          />
        ) : (
          <div
            style={{
              color: "transparent",
              border: "none",
              height: "15px",
              width: "15px",
            }}
          ></div>
        )}
      </div>
      <DropdownData
        bloc={bloc}
        data={data}
        index={index}
        updateCarousel={updateCarousel}
      />
      <div
        style={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          width: "100%",
        }}
      ></div>

      <div
        style={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          width: "100%",
        }}
      >
        <FileUploadWithProgress
          sub_field_name={undefined}
          update={updateCarousel}
          text_bouton_telechargement={"Choisir une image"}
          field_name={"image_url"}
          component={bloc}
          index={index}
        />
        <Picture
          update={updateCarousel}
          bloc={bloc}
          index={index}
          sub_bloc={data}
          image_spec={undefined}
        />
      </div>

      <textarea
        className={s.card_text}
        value={data.text}
        placeholder="texte de la carte"
        onChange={(e) => {
          updateCarousel(e, "text", bloc, index);
        }}
      />
    </div>
  );
}

export default CardData;
