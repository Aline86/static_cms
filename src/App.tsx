import { useContext, useEffect, useState } from "react";
import ThemeContextProvider from "./RoutesElements";
import ColorContext from "./ColorContext";
import Prerequis from "./admin/backoffice/prerequis/prerequis";
import { AuthContextProvider } from "./auth/AuthContext";

function App() {
  const { common } = useContext(ColorContext);
  const [resize, setResize] = useState(window.innerWidth);
  const result = window.matchMedia("(max-width: 1200px)");
  const set_position_footer = () => {
    let footer = document.querySelector("footer");
    let container = document.getElementById("container");
    if (
      container !== undefined &&
      container !== null &&
      container.clientHeight < 800 &&
      footer !== undefined &&
      footer !== null
    ) {
      footer.classList.add("fixed");
    }
  };
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
  useEffect(() => {}, []);
  useEffect(() => {
    set_position_footer();
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
