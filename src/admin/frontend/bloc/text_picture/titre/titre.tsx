import { TextPicture } from "../../../../backoffice/bloc/components/text_picture/class/TextPicture";

interface TitreParams {
  bloc: TextPicture;
  full: boolean;
  isResponsive: boolean;
}

function Titre({ bloc, full, isResponsive }: TitreParams) {
  const result = window.matchMedia("(max-width:800px)");
  const style_full: any = {
    display: "flex",
    position: "absolute",
    marginTop: result.matches ? "35%" : "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9,
    color: "white",
    opacity: 0.6,
    fontSize: result.matches || !full ? "50px" : "100px",
  };
  const style_responsive: any = {
    display: "flex",
    position: "absolute",
    marginTop: "20%",

    zIndex: 9,
    color: "white",
    opacity: 0.6,
  };
  const style_admin: any = {
    display: "flex",
    position: "absolute",
    marginTop: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: 0.6,
    zIndex: 9,
    color: "white",
  };
  const relative_box_admin: any = {
    position: "relative",
    width: "100%",
  };
  const relative_box_responsive: any = {
    position: "relative",
    width: "100%",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <div
      style={
        !full ? relative_box_admin : isResponsive ? relative_box_responsive : {}
      }
    >
      <h2
        style={
          bloc.bloc_column && bloc.text === "" && full && !isResponsive
            ? style_full
            : isResponsive
            ? style_responsive
            : !full && bloc.bloc_column && bloc.text === ""
            ? style_admin
            : {}
        }
      >
        {bloc.title}
      </h2>
    </div>
  );
}

export default Titre;
