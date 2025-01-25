import { useContext, useEffect, useState } from "react";
import ThemeContextProvider from "./RoutesElements";
import ColorContext from "./ColorContext";
import Prerequis from "./admin/backoffice/prerequis/prerequis";
import { AuthContextProvider } from "./auth/AuthContext";

function App() {
  const { common, initCommon } = useContext(ColorContext);
  const [resize, setResize] = useState(window.innerWidth);
  const result = window.matchMedia("(max-width: 1200px)");

  function updateSize() {
    setResize(window.innerWidth);
  }
  const styles: any = {
    "--titles": `${common?.titles}` ? `${common?.titles}` : "black",
    "--button-background-color": `${common?.background_color_buttons}`
      ? `${common?.background_color_buttons}`
      : "#2f6091",
  };
  useEffect(() => {
    if (!result.matches) {
      window.addEventListener("resize", updateSize);
    }
  }, [result.matches]);
  useEffect(() => {}, [common, resize]);
  useEffect(() => {
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
