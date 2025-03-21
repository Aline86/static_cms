import s from "./style.module.css";

import add_to_database from "./../../../../../../../../assets/add_to_database.png";
import { Button } from "../class/Button";

function CssButtonPosition({
  props,
  updateBloc,

  bloc,
  draggable,

  saveBlocAll,
}: {
  props: any;
  updateBloc: any;

  bloc: any;
  draggable: boolean;

  saveBlocAll: any;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div
        className={`${
          bloc instanceof Button
            ? "bouton_container_bloc_css_carousel"
            : "bouton_container_bloc_css"
        }`}
      >
        <div className={s.bouton_container_bloc}>
          <div className={s.encart_bloc_name_title}>
            <h3
              style={{
                textDecoration: "underline",
              }}
            >
              Bloc Bouton Image
            </h3>
          </div>
          <div draggable={draggable}>{props}</div>
          <div style={{ display: "flex", gap: "30px" }}>
            <div className={s.bouton_container}>
              <h3>Largeur</h3>
              <input
                type="number"
                value={bloc.width}
                onChange={(e) => updateBloc(e, "width", bloc)}
              />
            </div>
            <div className={s.bouton_container}>
              <h3>Hauteur</h3>
              <input
                type="number"
                value={bloc.height}
                onChange={(e) => updateBloc(e, "height", bloc)}
              />
            </div>
          </div>

          <div
            className={`${
              bloc.type !== "button"
                ? "bouton_container_carousel"
                : "bouton_container"
            }`}
          ></div>

          <div
            className={s.button_save_page}
            onClick={(e) => {
              e.preventDefault();
              saveBlocAll();
            }}
            style={{ top: "30px", right: "30px" }}
          >
            <img src={add_to_database} alt="ajouter en base de données" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CssButtonPosition;
