import ShrinkParams from "./snippets/shrink_params";
import HeaderVizualization from "../../../../frontend/bloc/header/header";
import Header from "../../../bloc/components/header/Header";
import HeaderInput from "../../../bloc/components/header/header_template/header_input";
import CssHeaderPosition from "../../../bloc/components/header/css_bloc_position/CssHeaderPosition";
import BlockContainer from "./snippets/BlockContainer";

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
    <BlockContainer
      bloc={bloc}
      setDragBegin={undefined}
      updateDragBloc={undefined}
      handleDragOver={undefined}
      removeBloc={removeBloc}
      index={-1}
      drag={false}
      isOpen={false}
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
    />
  );
}
export default BlocHeader;
