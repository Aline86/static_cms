import { useContext, useEffect } from "react";
import ThemeContextProvider from "./RoutesElements";
import ColorContext from "./ColorContext";
import Prerequis from "./admin/backoffice/prerequis/prerequis";

import { AuthContextProvider } from "./auth/AuthContext";
import Page from "./admin/backoffice/page/class/Page";

function App() {
  const { common } = useContext(ColorContext);
  const styles: any = {
    "--titles": `${common?.titles}` ? `${common?.titles}` : "black",
    "--button-background-color": `${common?.background_color_buttons}`
      ? `${common?.background_color_buttons}`
      : "#2f6091",
  };

  useEffect(() => {}, [common]);

  return (
    common !== null && (
      <AuthContextProvider>
        <div className="app_container" style={styles}>
          <ThemeContextProvider>
            <Prerequis />
          </ThemeContextProvider>
        </div>
      </AuthContextProvider>
    )
  );
}

export default App;
