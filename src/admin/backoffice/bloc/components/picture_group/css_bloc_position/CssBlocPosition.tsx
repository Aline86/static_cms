import s from "./style.module.css";
import add_to_database from "./../../../../../../assets/add_to_database.png";
import { PictureGroup } from "../class/PictureGroup";

function CssPictureGroupPosition({
  props,
  updatePictureGroupData,
  bloc,
  draggable,
  saveBlocAll,
}: {
  props: any;
  updatePictureGroupData: any;
  bloc: PictureGroup;
  draggable: boolean;
  saveBlocAll: any;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <label
        className={s.addCard}
        onClick={(e) => {
          e.preventDefault();
          updatePictureGroupData(e, "ajout", bloc, undefined);
        }}
      >
        <span style={{ textTransform: "uppercase", width: "220px" }}>
          Ajouter un élément +
        </span>
      </label>
      <div className="bouton_container_bloc_css_carousel">
        <div className={s.encart_bloc_name_title}>
          <div className={s.encart_bloc_name_title}>
            <h2>Bloc numéro : {bloc.bloc_number}</h2>
          </div>
          <h3
            style={{
              textDecoration: "underline",
              marginTop: "30px",
            }}
          >
            Groupe d'images
          </h3>
        </div>
        <div draggable={draggable}>{props}</div>
        <div className={s.bouton_container_bloc}>
          <div style={{ display: "flex", gap: "30px" }}>
            <div className={s.bouton_container}>
              <h3>Largeur</h3>
              <input
                type="number"
                value={bloc.width}
                onChange={(e) =>
                  updatePictureGroupData(e, "width", bloc, undefined)
                }
              />
            </div>
            <div className={s.bouton_container}>
              <h3>Hauteur</h3>
              <input
                type="number"
                value={bloc.height}
                onChange={(e) =>
                  updatePictureGroupData(e, "height", bloc, undefined)
                }
              />
            </div>
          </div>
        </div>
      </div>

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
  );
}

export default CssPictureGroupPosition;
