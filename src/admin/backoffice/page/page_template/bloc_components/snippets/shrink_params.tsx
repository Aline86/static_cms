import s from "./../../style.module.css";
import remove from "./../../../../../../assets/remove.png";
import Shrink from "./shrink/shrink";

interface BlocData {
  bloc: any;
  setDragBegin: any;
  updateDragBloc: any;
  handleDragOver: any;
  removeBloc: any;
  drag: boolean;
  index: number;
  css_position: any;
  component_visualization: any;
}

function ShrinkParams({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  removeBloc,
  drag,
  index,
  css_position,
  component_visualization,
}: BlocData) {
  return (
    <div
      className="blocs"
      draggable={drag}
      onDragStart={() => setDragBegin(index)}
      onDragOver={handleDragOver}
      onDrop={() => updateDragBloc(index)}
      key={index}
    >
      <Shrink
        key={index}
        index={index + 1}
        bloc={bloc}
        props={
          <div key={index} className={s.drag_bloc}>
            <div className={s.carousel_input}>
              <div
                className="button_remove_container"
                onClick={(e) => {
                  removeBloc(bloc);
                }}
                style={{ top: "30px", right: "30px" }}
              >
                <img src={remove} alt="suppression box" />
                Supprimer le bloc
              </div>

              {css_position}
            </div>
            <div className={s.carousel}>{component_visualization}</div>
          </div>
        }
      />
    </div>
  );
}
export default ShrinkParams;
