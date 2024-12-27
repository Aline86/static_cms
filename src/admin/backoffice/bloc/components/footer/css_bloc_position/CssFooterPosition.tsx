import s from "./style.module.css";

function CssFooterPosition({ props }: { props: any }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div className="bouton_container_bloc_css_carousel">
        <div className={s.bouton_container_bloc}>
          <div className={s.encart_bloc_name_title}>
            <h3
              style={{
                textDecoration: "underline",
              }}
            >
              En-tête
            </h3>
          </div>
        </div>
      </div>
      <div>{props}</div>
    </div>
  );
}

export default CssFooterPosition;
