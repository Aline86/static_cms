import FooterVizualization from "../../../../frontend/bloc/footer/footer";
import CssFooterPosition from "./components/footer/css_bloc_position/CssFooterPosition";
import Footer from "./components/footer/Footer";
import FooterInput from "./components/footer/footer_template/footer";

import BlockContainer from "./snippets/BlockContainer";

interface BlocData {
  bloc: Footer;
  updateFooter: any;

  saveBloc: any;
  toggle: boolean;
}

function BlocFooter({
  bloc,

  updateFooter,
  saveBloc,
  toggle,
}: BlocData) {
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
        <FooterVizualization
          input_bloc={bloc}
          toggle={toggle}
          isResponsive={false}
          full={false}
        />
      }
      css_position={
        <CssFooterPosition
          props={
            <FooterInput
              updateFooter={updateFooter}
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
export default BlocFooter;
