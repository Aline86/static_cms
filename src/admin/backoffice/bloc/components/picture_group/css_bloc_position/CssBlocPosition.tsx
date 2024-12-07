import s from "./style.module.css";
import add_to_database from "./../../../../../../assets/add_to_database.png";

function CssPictureGroupPosition({
  props,
  updatePictureGroupData,
  bloc,
  draggable,
  saveBlocAll,
}: {
  props: any;
  updatePictureGroupData: any;
  bloc: any;
  draggable: boolean;
  saveBlocAll: any;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div className="bouton_container_bloc_css_carousel">
        <div draggable={draggable}>{props}</div>
        <div className={s.bouton_container_bloc}>
          <div className={s.encart_bloc_name_title}>
            <h3
              style={{
                textDecoration: "underline",
              }}
            >
              Groupe d'images
            </h3>
          </div>
          <div style={{ display: "flex", gap: "30px" }}>
            <div className={s.bouton_container}>
              <h3>Largeur</h3>
              <input
                type="number"
                value={bloc.width}
                onChange={(e) =>
                  updatePictureGroupData(e, "width", undefined, bloc)
                }
              />
            </div>
            <div className={s.bouton_container}>
              <h3>Hauteur</h3>
              <input
                type="number"
                value={bloc.height}
                onChange={(e) =>
                  updatePictureGroupData(e, "height", undefined, bloc)
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
