import { useContext, useEffect } from "react";
import ThemeContextProvider from "./RoutesElements";
import ColorContext from "./ColorContext";
import Prerequis from "./admin/backoffice/prerequis/prerequis";
import { AuthContextProvider } from "./auth/AuthContext";

function App() {
  const { common, initCommon } = useContext(ColorContext);
  const styles: any = {
    "--titles": `${common?.titles}` ? `${common?.titles}` : "black",
    "--button-background-color": `${common?.background_color_buttons}`
      ? `${common?.background_color_buttons}`
      : "#2f6091",
  };

  useEffect(() => {}, [common]);
  useEffect(() => {
    /*if (window.location.protocol !== "https:") {
      window.location.replace(
        "https://" + window.location.href.split("://")[1]
      );
    }*/
    initCommon();
  }, []);
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
