import "./App.css";
import { useEffect, useState } from "react";
import ColorContext from "./ColorContext";
import ThemeContextProvider from "./RoutesElements";
import Page from "./admin/backend/page/page_template/page";
import Common from "./admin/backend/bloc/components/common/class/Common";
import Prerequis from "./admin/backend/prerequis/prerequis";

function App() {
  const [common, setCommon] = useState<any>(
    new Common("#ffffff", "black", "#2f6091")
  );
  const getBloc = async () => {
    const new_bloc = await common.get_bloc();
    if (new_bloc !== undefined && new_bloc.id === 1) {
      setCommon(new_bloc);
    }
  };

  const styles = {
    backgroundColor: common !== null ? `${common?.fond}` : "transparent",
    "--titles": `${common?.titles}` ? `${common?.titles}` : "black",
    "--button-background-color": `${common?.background_color_buttons}`
      ? `${common?.background_color_buttons}`
      : "#2f6091",
  };

  useEffect(() => {
    //    getBloc();
  }, []);

  return (
    common !== null && (
      <div className="app_container" style={styles}>
        <div className="inside_app_container">
          <ThemeContextProvider>
            <Prerequis />
          </ThemeContextProvider>
        </div>
      </div>
    )
  );
}

export default App;
