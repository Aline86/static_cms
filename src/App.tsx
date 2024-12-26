import { useContext, useEffect } from "react";
import ThemeContextProvider from "./RoutesElements";
import ColorContext from "./ColorContext";
import Page from "./admin/backoffice/page/class/Page";
import Prerequis from "./admin/backoffice/prerequis/prerequis";

function App() {
  const { common } = useContext(ColorContext);
  const styles = {
    "--titles": `${common?.titles}` ? `${common?.titles}` : "black",
    "--button-background-color": `${common?.background_color_buttons}`
      ? `${common?.background_color_buttons}`
      : "#2f6091",
    height: "fit-content",
  };
  // initilization of the first page, it should always exist prior to any action
  const create_first_page = async () => {
    let page_type = new Page();
    let async_result = await page_type.get_pages();
    if (Array.isArray(async_result) && async_result.length >= 1) {
    } else if (async_result !== undefined) {
      let page = new Page(-1, "Accueil");
      page.save_bloc();
    }
  };
  useEffect(() => {
    create_first_page();
  }, [common]);
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
