import HeaderVizualization from "../../../../frontend/bloc/header/header";
import CssHeaderPosition from "./components/header/css_bloc_position/CssHeaderPosition";
import Header from "./components/header/Header";
import HeaderInput from "./components/header/header_template/header_input";

import BlockContainer from "./snippets/BlockContainer";

interface BlocData {
  bloc: Header;
  updateHeader: any;
  saveBloc: any;
  toggle: boolean;
}

function BlocHeader({ bloc, updateHeader, saveBloc, toggle }: BlocData) {
  return (
    <BlockContainer
      bloc={bloc}
      setDragBegin={undefined}
      updateDragBloc={undefined}
      handleDragOver={undefined}
      removeBloc={undefined}
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
              saveBloc={saveBloc}
            />
          }
        />
      }
      handleDragLeave={undefined}
    />
  );
}
export default BlocHeader;
