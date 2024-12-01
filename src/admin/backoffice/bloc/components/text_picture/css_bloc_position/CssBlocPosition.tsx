import s from "./style.module.css";
import middle from "./../../../../../../assets/middle.png";
import centre from "./../../../../../../assets/centre.png";
import gauche from "./../../../../../../assets/gauche.png";
import droit from "./../../../../../../assets/droit.png";
import add_to_database from "./../../../../../../assets/add_to_database.png";
import { TextPicture } from "../class/TextPicture";

function CssTextPicturePosition({
  props,
  updateBloc,
  context,
  bloc,
  draggable,
  saveBloc,
  page_id,
  saveBlocAll,
}: {
  props: any;
  updateBloc: any;
  context: string;
  bloc: any;
  draggable: boolean;
  saveBloc: any;
  page_id: number;
  saveBlocAll: any;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div
        className={`${
          bloc instanceof TextPicture
            ? "bouton_container_bloc_css_carousel"
            : "bouton_container_bloc_css"
        }`}
      >
        <div className={s.encart_bloc_name_title}>
          <h2>Bloc numéro : {bloc.bloc_number}</h2>
        </div>
        <div className={s.bouton_container_parent}>
          <div>
            <h3>Type de bloc : </h3>
            <div className={s.checkbox_bloc}>
              <div className={s.flex_bloc_type_1}>
                <div
                  className={s.see_text_image}
                  onClick={(e) => {
                    updateBloc(e, "image_right", undefined, bloc);
                  }}
                >
                  <div className={s.inside_title}>titre</div>
                  <div className={s.inside_flex}>
                    <div className={s.inside_first}>
                      {bloc.image_right ? "image" : "texte"}
                    </div>
                    <div className={s.inside_second}>
                      {bloc.image_right ? "texte" : "image"}
                    </div>
                  </div>
                </div>
              </div>
              <div className={s.flex_bloc_type_2}>
                <div
                  className={s.see_text}
                  onClick={(e) => {
                    updateBloc(e, "bloc_column", undefined, bloc);
                  }}
                >
                  <div className={s.inside_title}>titre</div>
                  <div className={s.inside_col}>image</div>
                  <div className={s.inside_col_last}>texte</div>
                </div>
              </div>
              <div className={s.flex_column}>
                <div className={s.flex_row}>
                  <h3>Bouton voir plus</h3>
                  <input
                    defaultChecked={Boolean(Number(bloc.text_button_more))}
                    type="checkbox"
                    onClick={(e) => {
                      updateBloc(e, "text_button_more", undefined, bloc);
                    }}
                  />
                </div>
                <div className={s.flex_row}>
                  <h3>Couleur du bloc:</h3>
                  <input
                    type="color"
                    value={bloc.background_color}
                    onChange={(e) => {
                      updateBloc(e, "color", undefined, bloc);
                    }}
                  />
                </div>
                <div className={s.flex_row}>
                  <h3>Parallaxe</h3>
                  <input
                    defaultChecked={Boolean(Number(bloc.is_parallaxe))}
                    type="checkbox"
                    onClick={(e) => {
                      updateBloc(e, "parallaxe", undefined, bloc);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div draggable={draggable}>{props}</div>

          <div className={s.bouton_container}>
            <div className={s.encart_bloc_name}>
              <h3>Position de l'image :</h3>
              <div className={s.bouton_container_bloc}>
                <div className={s.bouton_position}>
                  <img
                    src={gauche}
                    alt="Haut gauche"
                    onClick={(e) => {
                      e.preventDefault(),
                        updateBloc(e, "css", "position", bloc);
                    }}
                  />
                  <img
                    src={centre}
                    alt="Haut centre"
                    onClick={(e) => {
                      e.preventDefault(),
                        updateBloc(e, "css", "position", bloc);
                    }}
                  />
                  <img
                    src={droit}
                    alt="Haut droit"
                    onClick={(e) => {
                      e.preventDefault(),
                        updateBloc(e, "css", "position", bloc);
                    }}
                  />

                  <img
                    src={middle}
                    alt="Centre centre"
                    onClick={(e) => {
                      e.preventDefault(),
                        updateBloc(e, "css", "position", bloc);
                    }}
                  />
                </div>
                <div className={s.bouton_position_2}>
                  <div>
                    <h3>Largeur de l'image</h3>
                    <input
                      type="number"
                      value={bloc.css.width}
                      onChange={(e) => updateBloc(e, "css", "width", bloc)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <img src={add_to_database} alt="ajouter en base de données" />
        </div>
      </div>
    </div>
  );
}

export default CssTextPicturePosition;
