import s from "./style.module.css";
import add_to_database from "./../../../../../../../../assets/add_to_database.png";
import { Parallaxe } from "../class/Parallaxe";

function CssParallaxePosition({
  props,
  bloc,
  draggable,
  saveBlocAll,
}: {
  props: any;
  bloc: any;
  draggable: boolean;
  saveBlocAll: any;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div
        className={`${
          bloc instanceof Parallaxe
            ? "bouton_container_bloc_css_carousel"
            : "bouton_container_bloc_css"
        }`}
      >
        <div className={s.encart_bloc_name_title}>
          <h2>Bloc numéro : {bloc.bloc_number}</h2>
        </div>
        <div className={s.bouton_container_parent}>
          <div>
            <h3 style={{ textDecoration: "underline" }}>Bloc Paralaxe : </h3>
            <div className={s.flex_row}></div>
            <div draggable={draggable}>{props}</div>

            <div className={s.bouton_container}></div>
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
    </div>
  );
}

export default CssParallaxePosition;
