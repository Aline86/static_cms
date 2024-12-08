import ShrinkParams from "./snippets/shrink_params";
import HeaderVizualization from "../../../../frontend/bloc/header/header";
import Header from "../../../bloc/components/header/Header";
import HeaderInput from "../../../bloc/components/header/header_template/header_input";
import CssHeaderPosition from "../../../bloc/components/header/css_bloc_position/CssHeaderPosition";

interface BlocData {
  bloc: Header;
  updateHeader: any;
  removeBloc: any;
  saveBloc: any;
  toggle: boolean;
}

function BlocHeader({
  bloc,
  removeBloc,
  updateHeader,
  saveBloc,
  toggle,
}: BlocData) {
  return (
    <div className="blocs" key={0}>
      <ShrinkParams
        key={0}
        setDragBegin={undefined}
        updateDragBloc={undefined}
        drag={false}
        index={1}
        bloc={bloc}
        handleDragOver={undefined}
        removeBloc={undefined}
        component_visualization={
          <HeaderVizualization
            input_bloc={bloc}
            toggle={toggle}
            isResponsive={false}
            full={false}
          />
        }
        css_position={
          <CssHeaderPosition
            props={
              <HeaderInput
                updateHeader={updateHeader}
                input_bloc={bloc}
                remove_bloc={removeBloc}
                saveBloc={saveBloc}
              />
            }
          />
        }
        isOpen={false}
      />
    </div>
  );
}
export default BlocHeader;
