import s from "./style.module.css";
import add_to_database from "./../../../../../../../../assets/add_to_database.png";

function CssCarouselPosition({
  props,
  updateCarousel,

  bloc,
  draggable,

  saveBlocAll,
}: {
  props: any;
  updateCarousel: any;

  bloc: any;
  draggable: boolean;

  saveBlocAll: any;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div className="bouton_container_bloc_css_carousel">
        <div className={s.encart_bloc_name_title}>
          <h2>Bloc numéro : {bloc.bloc_number}</h2>
        </div>
        <div className={s.bouton_container_parent}>
          <div className={s.bouton_container}>
            {bloc.type === "carousel" && bloc.carousel_type === "carousel" ? (
              <div className={s.bouton_container_bloc}>
                <div className={s.encart_bloc_name_title}>
                  <h3
                    style={{
                      textDecoration: "underline",
                    }}
                  >
                    Carousel option 1
                  </h3>
                </div>
                <div style={{ display: "flex", gap: "30px" }}>
                  <div className={s.bouton_container}>
                    <h3>Largeur</h3>
                    <input
                      type="number"
                      value={bloc.width}
                      min={15}
                      max={100}
                      onChange={(e) => updateCarousel(e, "width", bloc)}
                    />
                  </div>
                  <div className={s.bouton_container}>
                    <h3>Hauteur</h3>
                    <input
                      type="number"
                      value={bloc.height}
                      min={15}
                      max={100}
                      onChange={(e) => updateCarousel(e, "height", bloc)}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className={s.bouton_container_bloc}>
                <div className={s.encart_bloc_name_title}>
                  <h3
                    style={{
                      textDecoration: "underline",
                    }}
                  >
                    {bloc.carousel_type === "miniatures"
                      ? "Défilé d'images Option 3 (miniatures)"
                      : "Carousel option 2 (Carousel classique)"}
                  </h3>
                </div>
              </div>
            )}
          </div>
          <div draggable={draggable}>{props}</div>
        </div>
        <div className="bouton_container_carousel"></div>
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
  );
}

export default CssCarouselPosition;
