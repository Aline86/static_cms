import s from "./style.module.css";
import add_to_database from "./../../../../../../../../assets/add_to_database.png";
import { Screen } from "../class/Screen";

function CssScreenPosition({
  props,
  bloc,
  draggable,
  saveBlocAll,
}: {
  props: any;
  bloc: Screen;
  draggable: boolean;
  saveBlocAll: any;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div className="bouton_container_bloc_css">
        <div className={s.encart_bloc_name_title}>
          <h2>Bloc numéro : {bloc.bloc_number}</h2>
        </div>
        <div className={s.bouton_container_parent}>
          <h3
            style={{
              textDecoration: "underline",
            }}
          >
            Bloc Image de couverture
          </h3>
          <div draggable={draggable}>{props}</div>

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

export default CssScreenPosition;
