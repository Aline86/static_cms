import FooterVizualization from "../../../../frontend/bloc/footer/footer";
import FooterInput from "../../../bloc/components/footer/footer_template/footer";
import CssFooterPosition from "../../../bloc/components/footer/css_bloc_position/CssFooterPosition";
import BlockContainer from "./snippets/BlockContainer";
import Footer from "../../../bloc/components/footer/Footer";

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
    />
  );
}
export default BlocFooter;
